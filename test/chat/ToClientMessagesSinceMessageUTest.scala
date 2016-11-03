package chat

import chat.SocketMessageType.ToClientMessagesSince
import org.scalatest._
import play.api.libs.json.Json
import user.UserFixture

class ToClientMessagesSinceMessageUTest
  extends FlatSpecLike
  with ShouldMatchers
  with UserFixture {

  "Converting a ToClientMessagesSinceMessage to JSON" should "work" in {

    val toClientChatMessage1 = ToClientChatMessage(idMsgAliceBob1, "alice", "bob", "alice to bob one", now.getMillis)
    val toClientChatMessage2 = ToClientChatMessage(idMsgBobAlice3, "bob", "alice", "bob to alice three", now.getMillis)
    val toClientMessagesSinceMessage = ToClientMessagesSinceMessage(Seq(toClientChatMessage1, toClientChatMessage2))

    toClientMessagesSinceMessage.socketMessageType shouldBe ToClientMessagesSince
    Json.toJson(toClientMessagesSinceMessage) shouldEqual Json.obj( "toClientChatMessages" -> Json.arr(
      Json.obj(
        "id" -> "00000000-0000-0000-0000-100000000013",
        "socketMessageType" -> "RECEIVE_MESSAGE",
        "from" -> "alice",
        "to" -> "bob",
        "text" -> "alice to bob one",
        "time" -> now.getMillis
      ),
      Json.obj(
        "id" -> "00000000-0000-0000-0000-300000000031",
        "socketMessageType" -> "RECEIVE_MESSAGE",
        "from" -> "bob",
        "to" -> "alice",
        "text" -> "bob to alice three",
        "time" -> now.getMillis
      )
    ), "socketMessageType" -> "UPDATE_MESSAGES")
  }
}
