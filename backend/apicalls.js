var request = require('request');
var querystring = require('querystring');
var https = require('https');

var lh_api = {
  url: 'https://api-test.lufthansa.com/v1',
  tokenurl: 'https://api-test.lufthansa.com/v1/oauth/token',
  clientId: 'cx7bzwe8keuw264utrmhrayf',
  clientSecret: 'QvwRcfxnQB',
  token: null
};

function initApis(callback) {
  request.post({
    url: lh_api.tokenurl,
    form: {
      'client_id':	lh_api.clientId,
      'client_secret':	lh_api.clientSecret,
      'grant_type':	"client_credentials"
    }
  }, function(err, httpResponse, body){
    if(httpResponse.statusCode !== 200){
      return console.log('1: Invalid Status Code Returned:', httpResponse.statusCode);
    }
    if (err) console.log(err);
    var data = JSON.parse(body);
    //console.log(data.access_token);
    lh_api.token = data.access_token;
    //console.log(lh_api);
    callback();
  });
}

var performLufthansaRequest = function(endpoint, data, callback) {
  request.get({
    url: lh_api.url + '/' + endpoint + '?' + querystring.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + lh_api.token
    }
  }, function(err, httpResponse, body){
    if(httpResponse.statusCode !== 200){
      return console.log('2: Invalid Status Code Returned:', httpResponse.statusCode);
    }
    if (err) console.log(err);
    //console.log(body);
    // data = JSON.parse(body);
    //console.log(data);
    if (callback) {
      callback(JSON.parse(body));
    }
  });
}

exports.initApis = initApis;
exports.performLufthansaRequest = performLufthansaRequest;
