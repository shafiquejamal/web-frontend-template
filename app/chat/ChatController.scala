package chat

import java.util.UUID

import access.authentication.AuthenticationAPI
import access.{AllowedTokens, AuthenticatedActionCreator, JWTParamsProvider, SingleUse}
import akka.actor.ActorSystem
import akka.stream.{Materializer, OverflowStrategy}
import com.google.inject.Inject
import pdi.jwt.JwtJson
import play.Configuration
import play.api.libs.json.Json
import play.api.mvc._
import util.{TimeProvider, UUIDProvider}

class ChatController @Inject() (
    override val authenticationAPI: AuthenticationAPI,
    override val jWTParamsProvider: JWTParamsProvider,
    uUIDProvider: UUIDProvider,
    override val configuration: Configuration,
    override val timeProvider: TimeProvider,
    system: ActorSystem,
    materializer: Materializer)
  extends Controller
  with AuthenticatedActionCreator {

  def singleUseToken = AuthenticatedAction(parse.json) { request =>
    val claim =
      Json.obj(
        "userId" -> request.userId.toString,
        "iat" -> timeProvider.now(),
        "tokenUse" -> "single"
      )
    val jWT = JwtJson.encode(claim, jWTParamsProvider.secretKey, jWTParamsProvider.algorithm)
    Ok(Json.obj("singleUseToken" -> jWT))
  }

  def chat(token: String) = WebSocket.accept[String, String] { request =>

    implicit val mat = materializer
    implicit val actorRefFactory = system

    new ChatAuthenticator(authenticationAPI, jWTParamsProvider, configuration, timeProvider)
    .decodeAndValidateToken(
      token,
      (uUID: UUID) => BetterActorFlow.namedActorRef( client =>
        ChatActor.props(client), 16, OverflowStrategy.dropNew, uUID.toString + "_" + uUIDProvider.randomUUID().toString),
      null,
      AllowedTokens(SingleUse)
    )

  }

}