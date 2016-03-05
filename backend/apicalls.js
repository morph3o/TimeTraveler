var request = require('request');
var querystring = require('querystring');
var https = require('https');

var lh_api = {
  url: 'https://api-test.lufthansa.com/v1',
  tokenurl: '/oauth/token',
  clientId: 'cx7bzwe8keuw264utrmhrayf',
  clientSecret: 'QvwRcfxnQB',
  token: null
};

var fraport_api = {
  url: 'https://developer.fraport.de/api',
//  tokenurl: '/v1/oauth/token',
//  clientId: 'cfnGPUL92NfJigE8NasBowbB_U8a',
//  clientSecret: 'n3HV6K3iR7aV5y9B0B7Cpn9AD5ga',
  token: '9ddaee45bbf8d1bc26082b4116a7b484'
};

function initApis(callback) {
  initLufthansaAPI(function () {
    initFraportAPI(function () {
      callback();
    });
  });

}

// Lufthansa stuff  ############################################################

var initLufthansaAPI = function(callback) {
  request.post({
    url: lh_api.url + lh_api.tokenurl,
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
    console.log('Lufthansa Token: ' + data.access_token);
    lh_api.token = data.access_token;
    callback();
  });
}

/**
* @param {string} endpoint the route in the api
* @param {string} data the filter data for the query
* @param {string} callback callback(err, response)
*/
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
    if (err) {
      console.log(err);
    }
    if (callback) {
      callback(JSON.parse(body));
    }
  });
}

// Fraport Stuff ###############################################################

var initFraportAPI = function(callback) {
  // Not necessary, FRAPORT-Token lasts for 40 hours
  console.log('Fraport Token: ' + fraport_api.token);
  callback();
  /*
  request.post({
    url: fraport_api.url + fraport_api.tokenurl,
    form: {
      'client_id':	fraport_api.clientId,
      'client_secret':	fraport_api.clientSecret,
      'grant_type':	"client_credentials"
    }
  }, function(err, httpResponse, body){
    if(httpResponse.statusCode !== 200){
      return console.log('3: Invalid Status Code Returned:', httpResponse.statusCode);
    }
    if (err) console.log(err);
    var data = JSON.parse(body);
    console.log('Fraport Token: ' + data.access_token);
    fraport_api.token = data.access_token;
    callback();
  }); */
}

/**
* @param {string} api the actual api to query (ex. flights)
* @param {string} endpoint the route in the api (ex. /flight/FRA/arrival)
* @param {string} (optional) data the filter data for the query
* @param {string} callback callback(err, response)
*/
var performFraportRequest = function(api, endpoint, data, callback) {
  var url = fraport_api.url + '/' + api + '/1.0' + endpoint;
  if (data){
    url += '?' + querystring.stringify(data);
  }
  //console.log(url);
  request.get({
    url:  url ,
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + fraport_api.token
    }
  }, function(err, httpResponse, body){
    if(httpResponse.statusCode !== 200){
      return console.log('4: Invalid Status Code Returned:', httpResponse.statusCode);
    }
    if (err) {
      console.log(err);
    }
    if (callback) {
      callback(JSON.parse(body));
    }
  });
}

exports.initApis = initApis;
exports.performLufthansaRequest = performLufthansaRequest;
exports.performFraportRequest = performFraportRequest;
