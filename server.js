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
//Ouverture de la base de données
var db= new sqlite3.Database('./mediatheque',sqlite3.OPEN_READWRITE, (err)=> {
	if (err){
		console.log(err.message);
	}
	console.log('Access database success')
});
//Page d'accueil du site 
app.get('/',function(req,res){
	var affich= "SELECT Nom,auteur,Annee,Genre FROM Livre ORDER BY Annee DESC LIMIT 10";
	db.serialize(()=>{
		db.all(affich,(err,row)=>{
			if (err){
				console.log(err.message)
			};
			if(row.length>0){
				res.render('index',{llivres: row})
			}else {
				console.log('Pas de livres')
				res.render('index')
			};
		})
	})
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