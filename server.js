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
	var insc='INSERT INTO Utilisateur (Pseudo,Nom,Prenom,Pass,Mail,Adresse,CP,Ville) VALUES("'+req.body.Pseudo +
	'","'+req.body.Nom +
	'","'+req.body.Prenom+
	'","'+req.body.Pass+
	'","'+req.body.Mail+
	'","'+req.body.Adresse+
	'","'+req.body.CP+
	'","\'+req.body.Ville+");';
	db.serialize(()=>{
		db.all(insc,(err,row)=>{
			if(err){
				console.log('Pseudo deja pris');
			}else{
				console.log('inscription success')
				res.redirect('/')
			};
		})
	})
});
//formulaire de connexion
app.post('/signin',function(req,res){
	var check="SELECT Pass FROM Utilisateur WHERE Pseudo='"+req.body.pseudo+"'";
	db.serialize(()=>{
		db.all(check,(err,row)=>{
			if(err){
				console.log(err.message)
			}
			if(row[0].Pass==req.body.password){
				res.redirect('/')
			}else{
				console.log('Mauvais mot de passe ou compte inexistant');
			}
		})
	})
})
//Quand l'utilisateur clique sur un type, affiche seulement les oeuvres avec ce type
app.get('/aventure',function(req,res){
	var av="SELECT Nom,auteur,Annee,Genre FROM Livre WHERE Genre='Aventure' ORDER BY Annee DESC"
	db.serialize(()=>{
		db.all(av,(err,row)=>{
			if(err){
				console.log(err.message)
			}
			res.render('index',{llivres:row})
		})
	})
});
app.get('/amour',function(req,res){
	var av="SELECT Nom,auteur,Annee,Genre FROM Livre WHERE Genre='Amour' ORDER BY Annee DESC"
	db.serialize(()=>{
		db.all(av,(err,row)=>{
			if(err){
				console.log(err.message)
			}
			res.render('index',{llivres:row})
		})
	})
});
app.get('/policier',function(req,res){
	var av="SELECT Nom,auteur,Annee,Genre FROM Livre WHERE Genre='Policier' ORDER BY Annee DESC"
	db.serialize(()=>{
		db.all(av,(err,row)=>{
			if(err){
				console.log(err.message)
			}
			res.render('index',{llivres:row})
		})
	})
});
app.get('/historique',function(req,res){
	var av="SELECT Nom,auteur,Annee,Genre FROM Livre WHERE Genre='Historique' ORDER BY Annee DESC"
	db.serialize(()=>{
		db.all(av,(err,row)=>{
			if(err){
				console.log(err.message)
			}
			res.render('index',{llivres:row})
		})
	})
});
app.get('/science',function(req,res){
	var av="SELECT Nom,auteur,Annee,Genre FROM Livre WHERE Genre='Science-Fiction' ORDER BY Annee DESC"
	db.serialize(()=>{
		db.all(av,(err,row)=>{
			if(err){
				console.log(err.message)
			}
			res.render('index',{llivres:row})
		})
	})
});
app.get('/fantaisie',function(req,res){
	var av="SELECT Nom,auteur,Annee,Genre FROM Livre WHERE Genre='Fantaisie' ORDER BY Annee DESC"
	db.serialize(()=>{
		db.all(av,(err,row)=>{
			if(err){
				console.log(err.message)
			}
			res.render('index',{llivres:row})
		})
	})
});
app.get('/horreur',function(req,res){
	var av="SELECT Nom,auteur,Annee,Genre FROM Livre WHERE Genre='Horreur' ORDER BY Annee DESC"
	db.serialize(()=>{
		db.all(av,(err,row)=>{
			if(err){
				console.log(err.message)
			}
			res.render('index',{llivres:row})
		})
	})
});
app.get('/bd',function(req,res){
	var av="SELECT Nom,auteur,Annee,Genre FROM Livre WHERE Genre='BD' ORDER BY Annee DESC"
	db.serialize(()=>{
		db.all(av,(err,row)=>{
			if(err){
				console.log(err.message)
			}
			res.render('index',{llivres:row})
		})
	})
});
app.get('/contes',function(req,res){
	var av="SELECT Nom,auteur,Annee,Genre FROM Livre WHERE Genre='Conte' ORDER BY Annee DESC"
	db.serialize(()=>{
		db.all(av,(err,row)=>{
			if(err){
				console.log(err.message)
			}
			res.render('index',{llivres:row})
		})
	})
});
app.get('/theatre',function(req,res){
	var av="SELECT Nom,auteur,Annee,Genre FROM Livre WHERE Genre='Theatre' ORDER BY Annee DESC"
	db.serialize(()=>{
		db.all(av,(err,row)=>{
			if(err){
				console.log(err.message)
			}
			res.render('index',{llivres:row})
		})
	})
});
//retour à l'index lors de l'appui sur type
app.get('/index',function(req,res){
	res.redirect('/');
});
//Ouverture du serveur sur le port choisi
app.listen(2598,function(){
	console.log('Server On')
});