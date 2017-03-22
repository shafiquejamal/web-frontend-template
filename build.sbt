name := """webfrontendtemplate"""

version := "0.0.1"

lazy val root = (project in file(".")).enablePlugins(PlayScala, SbtWeb)

scalaVersion := "2.11.8"

libraryDependencies ++= Seq(
  jdbc,
  cache,
  ws,
  filters,
  "net.codingwell" %% "scala-guice" % "4.0.1",
  "org.webjars" %% "webjars-play" % "2.5.0",
  "org.webjars" % "bootstrap" % "4.0.0-alpha.2",
  "org.webjars" % "font-awesome" % "4.6.3",
  "org.webjars" % "react" % "15.1.0",
  "com.typesafe" % "config" % "1.3.0"
)

resolvers += "scalaz-bintray" at "http://dl.bintray.com/scalaz/releases"

coverageEnabled in Test:= true

val testSettings = Seq(
  fork in Test := false
)
