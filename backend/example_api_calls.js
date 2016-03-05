var apicalls   = require('./apicalls.js');

/**
 * @param {object} data object to be logged in console
 * @param {boolean} show indicates if the output should be logged to console
 */
var log = function(data, show){
  if (show) {
    console.log(data);
  }
}

apicalls.initApis(function () {
  apicalls.performLufthansaRequest('mockup/profiles/customers', { filter: 'id', callerid: 'team1' }, function(response) {
    log(response, false);
  });
  apicalls.performFraportRequest('flights', '/flight/FRA/arrival', null, function(response) {
    log(response, false);
  });
  apicalls.performRmvRequest('/trip', {originExtId: 3006907, destExtId: 3004199}, function(response) {
    log(response, false);
  });
  apicalls.performDbRequest('/location.name', {input: 'Frankfurt'}, function(response) {
    log(response, false);
  });
});
