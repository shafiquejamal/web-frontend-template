# Twitter Search application - web frontend

To be used with https://github.com/shafiquejamal/paytmlsesjapigateway as the api gateway/backend. Install that first before executing the following steps.

## Requirements

- Java 1.8+
- SBT
- Node 6.3.0+

## How to run locally (Mac or Linux)

1. In a terminal tab, clone the repository into a directory and cd into that directory:
```
git clone https://github.com/shafiquejamal/paytmlsesjwebfrontend.git /path/to/project
cd /path/to/project
```

3. Run SBT:
```
sbt
```
and wait for the dependencies to be downloaded

4. In another terminal tab, cd into the project directory and run 'npm install':
```
cd /path/to/project
npm install
```
After npm is done installing, set any environment variables as indicated in `ConfigurationPaths.jsx` and `application.conf`, for example:

```
export FRONTENDTEMPLATE_WS_PROTOCOL=ws
export FRONTENDTEMPLATE_API_SERVER=localhost:9001
export FRONTENDTEMPLATE_PLAY_CRYPTO_SECRET=some_secret_characters 
``` 
Then run webpack:
```
webpack -w
```
5. After webpack is running with no errors, go back to the SBT terminal tab. In SBT run the following commands:
```
; clean; ~run 9000
```
6. In a browswer, go to http://localhost:9000, and voila!

## References:

React and Play Framework:
http://ticofab.io/react-js-tutorial-with-play_scala_webjars/

Twitter Bootstrap:
http://bootsnipp.com/snippets/featured/register-page

React JS:
Udemy.com courses by Adrew Mead and Stephen Grider
