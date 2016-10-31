package chat

import akka.actor.{Actor, ActorLogging, ActorRef, Props}

class ChatActor(out: ActorRef) extends Actor with ActorLogging {

  import play.api.libs.json.JsValue

  override def receive = {
    case msg: JsValue =>
      log.info(s"JSon message received: $msg")
      out ! msg
    case msg: String =>
      log.info(s"String message received: $msg")
      out ! s"${out.toString}: $msg"
  }

}


object ChatActor {

  def props(client: ActorRef) = Props(new ChatActor(client))

}
