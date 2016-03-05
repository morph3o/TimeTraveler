var apicalls   = require('./apicalls.js');
apicalls.initApis(function () {
  apicalls.performLufthansaRequest('mockup/profiles/customers', { filter: 'id', callerid: 'team1' }, function(response) {
    //console.log(response);
  });
  apicalls.performFraportRequest('flights', '/flight/FRA/arrival', null, function(response){
    //console.log(response);
  });
  apicalls.performRmvRequest('/trip', {originExtId: 3006907, destExtId: 3004199}, function(response){
    console.log(response);
  })
});
