# test-javascript
This project contains a group of files for testing the logon-sdk-javascript implementation. [API Libraries](https://docs.google.com/spreadsheets/d/1lLbFLQ0ww4SBUtdS5ZL0szJg_RKzAVD6rnAmyYr6xIE/edit#gid=0) doc tracks testing results for the individual libraries. 

- `../test-server.js`
- `./StartLogin.html`
- `./ValidateLogin.html`
- `./CreateEvent.html`

Other files exist that represent testing completed by Howie. They have been left unchanged.

- `../server.js`
- `./api.html`
- `./sample.html`
- ...

## Pre-requisites

Install [node.js](https://nodejs.org/en/download/). It includes the npm package manager.  

- npm is used for building the javascript api library at `../dist/logonlabs.min.js`
- node.js is used for running an http server for testing the api library. 

## Usage
1. Build the solution 
>- in a command prompt, go to the root of the project (one level up from the test folder)
>- optional: run `npm install` to install all the project dependencies (I think only webpack is needed for the purposes described in this document but it may be a good idea to run this step to avoid unforseen problems)
>- run `npm run build` (it will use `webpack.config.js` and `package.json` to update the javascript api library at `../dist/logonlabs.min.js`)

2. Run the server
>- run `node test-server.js`

## Configuration

All tests require the following input parameters: 

- app_id
- app_secret
- api_path, defaults to [https://api.logon-dev.com/](https://api.logon-dev.com/)

Any input parameter can be supplied through the html file of the test or as a query string to it. **Please review before testing.**

The server runs at  `http://*:8080` configured in `../test-server.js`.

**The `cors_whitelist` for the logonlabs app used for testing should include `"http://localhost:8080"`.**  

## StartLogin Test

**The `callback_url` for the logonlab app used for testing StartLogin should be set to [http://localhost:8080/callback](http://localhost:8080/callback)**. This will allow the test application to receive the callback from the IDP and invoke ValidateLogin to complete the test. 

### Input
- identity_provider
- identity_provider_id
- email_address
- client_data
- tags
- destination_url
- callback_url
- force_reauthentication

### Example

```
http://localhost:8080/test/StartLogin.html
```

```
http://localhost:8080/test/StartLogin.html?identity_provider=google&client_data=sometext
```

### Output

```
callback received: app_id = 029e592fc2144dd0b88203cf387f5485 token = 4bd3282b39bf45df98a1fbe0c08f2c35
{"app_id":"029e592fc2144dd0b88203cf387f5485","email_address":"iguigova@softwarecreated.com","ip_address":"24.85.189.80","location":{"continent_code":"NA","continent_name":"North America","country_code":"CA","country_name":"Canada"},"event_success":true,"validation_details":{"domain_validation":"pass","ip_validation":"notapplicable","geo_validation":"notapplicable","time_validation":"notapplicable","email_required_validation":"notapplicable"},"identity_provider_data":{"identity_provider_type":"google","protocol":"oauth","uid":"115106675426464537501","first_name":"Ilka","last_name":"Guigova","user_data":{"iss":"https://accounts.google.com","azp":"962094068249-9300dp82v5hlnmq7tvuulqsrql2qgsi5.apps.googleusercontent.com","aud":"962094068249-9300dp82v5hlnmq7tvuulqsrql2qgsi5.apps.googleusercontent.com","sub":"115106675426464537501","hd":"softwarecreated.com","email":"iguigova@softwarecreated.com","email_verified":"true","at_hash":"TjRu9w4zkdK_sZyhsBbuhQ","name":"Ilka Guigova","picture":"https://lh6.googleusercontent.com/-usNAR47QNFc/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucm76OYeqtuV79uKehpmOplDKmJthA/s96-c/photo.jpg","given_name":"Ilka","family_name":"Guigova","locale":"en","iat":"1591729867","exp":"1591733467"}},"client_data":"sometext","event_id":"dae083b39b714a8fb7ec1452c13a9555"}
```

