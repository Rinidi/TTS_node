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
const sequelize = db.sequelize;
const Sequelize = db.Sequelize;

const Post = db.bd.define('comentarios',{
    comentario:{
        type: db.Sequelize.TEXT
    }
})

let app = express();
app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/', function(req, res){
    Post.all().then(function(comentarios){
        res.render(index);
        //res.sendFile(path.join(__dirname+'/index.html'), {});
    })
    
});

/*db.connect((err)=> {
    if(err){
        console.log('Erro connecting to database...', err);
        return
    }
    console.log('Connection established!')
});

db.end((err) => {
    if(err) {
        console.log('Erro to finish connection...', err)
        return 
    }
    console.log('The connection was finish...')
});*/

db.connect(function(err) {
    if (err) throw err;
    db.query("SELECT comentario FROM comentarios", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
});

db.connect(function(err,connection){
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
    })
})
})

let port = 3000 || process.env.PORT;
app.listen(port);