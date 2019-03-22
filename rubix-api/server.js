var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var request = require('request-promise')

app.use(bodyParser.json())

var ingress = 'http://35.246.0.172'

app.post('/list', function (req, res) {
    var resp = list();
    resp.then(function (result) {
        res.send(result)
    })
})

app.post('/create', function (req, res) {
    var resp = create(req.body.value);
    resp.then(function (result) {
        res.send(result)
    })
})

app.post('/delete', function (req, res) {
    var resp = deleteCLip(req.body.clipId);
    resp.then(function (result) {
        res.send(result)
    })
})

app.post('/dictate', function (req, res) {
    var resp = dictate(req.body);
    resp.then(function (result) {
        res.send(result)
    })
})

function list() {
    var options = {
        method: 'POST',
        url: ingress,
        headers:
        {
            'Content-Type': 'application/json',
            'Host': 'r3x-rubix-list.default.example.com'
        },
    };
    return new Promise(function (resolve, reject) {
        request(options, function (err, resp, body) {
            if (err) {
                reject(err);
            } else {
                resolve(body)
            }
        }).catch(function (err) {
            console.log(err)
        })
    })
}

function create(clipName) {
    var options = {
        method: 'POST',
        url: ingress,
        headers:
        {
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            'Host': 'r3x-rubix-create.default.example.com'
        },
        body: {
            title: "clip1",
            value: clipName
        },
        json: true
    };
    let _ = this;
    return new Promise(function (resolve, reject) {
        request(options, function (err, resp, body) {
            if (err) {
                reject(err);
            } else {
                resolve(body)
            }
        });
    })
}

function deleteCLip(id) {
    var options = {
        method: 'POST',
        url: ingress,
        headers:
        {
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            'Host': 'r3x-rubix-delete.default.example.com'
        },
        body: {
            clipId: id
        },
        json: true
    };
    let _ = this;
    return new Promise(function (resolve, reject) {
        request(options, function (error, response, body) {
            if (error) {
                reject(error)
            } else {
                console.log(body)
                resolve(body)
            }
        });
    })
}

function dictate(data) {
    var options = {
        method: 'POST',
        url: ingress,
        headers:
        {
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            'Host': 'r3x-rubix-dictate.default.example.com'
        },
        body: {
            title: data.title,
            value: data.value
        },
        json: true
    };
    let _ = this;
    return new Promise(function (resolve, reject) {
        request(options, function (error, response, body) {
            if (error) {
                reject(error)
            } else {
                resolve(body)
            }
        });
    })
}
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("RubiX listening at http://%s:%s", host, port)
})