//Require des modules à utiliser
var express = require('express');
var app=express();
var bodyparser= require('body-parser');
var sqlite3 = require('sqlite3').verbose();
//Utilisation du dossier public pour le css sur les templates ejs
app.use(express.static('public'));
//Utilisation de body-parser pour acceder aux entrées clients
app.use(bodyparser.urlencoded({
	extended:false
}));
//Choix du moteur de template
app.set('view engine','ejs');
//Page d'accueil du site 
app.get('/',function(req,res){
	res.render('index');
});
//Page de connexion du site
app.get('/signin',function(req,res){
	res.render('signin');
});
//Page d'inscription du site
app.get('/signup',function(req,res){
	res.render('signup');
});
//Au moment de l'envoi d'un formulaire d'inscription
app.post('/signup',function(req,res){
	res.render('index');
});

//Ouverture du serveur sur le port choisi
app.listen(2598,function(){
	console.log('Server On')
});