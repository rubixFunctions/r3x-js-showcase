var express = require('express');
var app = express();
var request = require('request-promise')

app.post('/list', function (req, res) {
   console.log("Got a POST request for the homepage");
   var resp = list();
   resp.then(function(result){
       res.send(result)
   })
})

function list(){
    var options = { method: 'POST',
      url: 'http://35.246.0.172',
      headers: 
      {
        'Content-Type': 'application/json',
        'Host': 'r3x-rubix-list.default.example.com'
         },
      };
    return new Promise(function(resolve, reject) {
        request(options, function(err, resp, body) {
            if (err) {
                reject(err);
            } else {
              resolve(body)
            }
        }).catch(function(err){
          console.log(err)
        })
    })
}

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("RubiX listening at http://%s:%s", host, port)
})