how to build the project from scratch

```bash
npm install -g grunt-cli cordova ionic jshint
ionic start --appname festinare_mobile --id com.festinare.discount --sass festinare_mobile tabs
ionic setup sass
ionic platform add android ios
ionic upload
ionic push --google-api-key="AIzaSyB39lKD0T3t2qDHhaSxifZaId4F-vquAtE"
```
