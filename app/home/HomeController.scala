package home

import javax.inject._

import controllers.WebJarAssets
import org.webjars.play.RequireJS
import play.api.mvc._

class HomeController @Inject() (
    webJarAssets: WebJarAssets,
    requireJS: RequireJS,
    components: ControllerComponents)
  extends AbstractController(components) {

  def index = Action {
    Ok(views.html.index(webJarAssets, requireJS))
  }

}
