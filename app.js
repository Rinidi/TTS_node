// Variables
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const mysql = require('mysql2');
const db = mysql.createConnection({
    
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tts_node',
    port:3306
});

let app = express();
app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname+'/index.html'));
});

db.connect(function(err, connection){
    app.post('/send', function(req, res){
        console.log(req.body);
        var comment = {comentario:req.body.commentText};

        db.query('INSERT INTO comentarios SET ?', comment,function(err,res){
        if(err){
            throw err;
        }
        else{
            console.log(res);
        }
        });
        comentario:req.body.commentText = "";
    });
});




let port = 3000 || process.env.PORT;
app.listen(port);

