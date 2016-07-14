name := """crauth"""

version := "0.1-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala, SbtWeb)

scalaVersion := "2.11.8"

libraryDependencies ++= Seq(
  jdbc,
  cache,
  ws,
  filters,
  "org.scalikejdbc" %% "scalikejdbc"             % "2.4.2",
  "org.scalikejdbc" %% "scalikejdbc-config"      % "2.4.2",
  "org.scalikejdbc" %% "scalikejdbc-test"   % "2.4.2"   % "test",
  "org.flywaydb" %% "flyway-play" % "3.0.0",
  "com.h2database"  %  "h2"                % "1.4.191",
  "ch.qos.logback"  %  "logback-classic"   % "1.1.3",
  "org.scalamock" %% "scalamock-scalatest-support" % "3.2.2" % "test",
  "org.scalatestplus.play" %% "scalatestplus-play" % "1.5.1" % Test,
  "net.codingwell" %% "scala-guice" % "4.0.1",
  "org.mindrot" % "jbcrypt" % "0.3m",
  "org.webjars" %% "webjars-play" % "2.5.0",
  "org.webjars" % "bootstrap" % "4.0.0-alpha.2",
  "org.webjars" % "react" % "15.1.0",
  "com.pauldijou" % "jwt-play-json_2.11" % "0.8.0",
  "commons-validator" % "commons-validator" % "1.5.1"
)

resolvers += "scalaz-bintray" at "http://dl.bintray.com/scalaz/releases"

coverageEnabled in Test:= true