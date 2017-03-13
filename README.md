# Web Frontend Template

To be used with https://github.com/shafiquejamal/api-gateway-template as the backend

## Requirements

- Java 1.8+
- SBT
- Node 6.3.0+

## How to run locally (Mac or Linux)

1. In a terminal tab, clone the repository into a directory and cd into that directory:
```
git clone https://github.com/shafiquejamal/play-authentication.git /path/to/project
cd /path/to/project
```
Set any environment variables as indicated in `ConfigurationPaths.jsx`.

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
When npm is done installing run
```
npm test
```
then run
```
webpack -w
```
5. After webpack is running with no errors, go back to the SBT terminal tab. In SBT run the following commands:
```
~run 9000
```
6. In a browswer, go to http://localhost:9000, and voila!

Changes to the .jsx files, these will automatically be reflected in the running app after reloading the webpage (assuming no errors - check the terminal tab running webpack and the browser javascript console to check for errors).

## References:

React and Play Framework:
http://ticofab.io/react-js-tutorial-with-play_scala_webjars/

Twitter Bootstrap:
http://bootsnipp.com/snippets/featured/register-page

React JS:
Udemy.com courses by Adrew Mead and Stephen Grider
