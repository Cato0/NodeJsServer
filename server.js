var express = require('/home/pi/Desktop/testProject/node_modules/express');

var bodyParser = require('body-parser');
var cors = require ('cors');
var http = require('http');
var app = express();
var mysql = require('mysql');

var modArray = [];

var con = mysql.createConnection({
  host: "localhost",
  database: 'test'
});

// con.connect(function(err) {
  // if (err) throw err;
  // console.log("Connected!");
  // var sql = "INSERT INTO testtable (a, b) VALUES (9, 9)";
  // con.query(sql, function (err, result) {
    // if (err) throw err;
    // console.log(result);
  // });
// });


app.use(cors());
app.use(express.static('public'));
app.use (bodyParser.json());

app.use(function(req,res,next){
    console.log("request");
    next();
});

app.get('/createPerson/', function(req, res) {

    con.connect(function(err) {
	if(err) throw err;
	var sql = "CREATE TABLE Person2 (ID int NOT NULL, LastName varchar(255), FirstName varchar(255), Age int, PRIMARY KEY (ID) );";
		
		con.query(sql, function(err, result, fields) {	
			if(err) throw err;
			console.log(result);
		});
	});	
});

app.get('/select/', function(req, res) {
    console.log("select");
	
    con.connect(function(err) {
	if(err) throw err;
	var sql = "INSERT x FROM  ";
		
		
		
		con.query(sql, function(err, result, fields) {
		
			if(err) throw err;
			console.log(result);
			
			res.send(result);
		});
	});
});

app.get('/test/', function(req, res) {
   console.log("hurray");
   res.send("3");
});

app.get('/getNumber', function(req, res) {

  var j = {
    num: 5,
    st: "asd"
  }

  var jJSON = JSON.stringify(j);

  res.send(jJSON);
});

app.get('/getMod', function(req, res) {
   res.send(modArray);
});

app.post('/setMod', function(req, res) {

   var mod = {
            name: req.body.name,
            credit: req.body.credit,
            note: req.body.note
    };
   console.log("HIER");
   modArray.push(mod);
   res.send();

});

app.delete('/del/:index', function (req, res) {
   console.log("TEST");

    //modArray.splice(modArray[req.params.index+1], 1);

    for(i=0; i<modArray.length; i++) {
        console.log(modArray[i]);
    }

    modArray.splice(req.params.index, 1);
    console.log("index: "+req.params.index);
    for(i=0; i<modArray.length; i++) {
        console.log(modArray[i]);
    }
});

app.listen(8080);
