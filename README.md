how to build the project from scratch

```bash
gem install sass
npm install -g bower grunt-cli cordova ionic jshint
bower install --save ngCordova
ionic start --appname festinare_mobile --id com.festinare.discount --sass festinare_mobile tabs
ionic setup sass
ionic platform add android ios
npm install
ionic upload
ionic push --google-api-key="AIzaSyB39lKD0T3t2qDHhaSxifZaId4F-vquAtE"
ionic plugin add https://github.com/phonegap-build/PushPlugin.git \
                    https://github.com/katzer/cordova-plugin-local-notifications
```
