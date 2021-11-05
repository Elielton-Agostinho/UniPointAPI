const express = require('express')
const faker = require('faker')
const bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const port = process.env.PORT || 5000
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
var $ = require("jquery")(window);

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

  
app.set('view engine', 'ejs')     // Setamos que nossa engine será o ejs
app.use(expressLayouts)           // Definimos que vamos utilizar o express-ejs-layouts na nossa aplicação
app.use(bodyParser.urlencoded())  // Com essa configuração, vamos conseguir parsear o corpo das requisições

app.use(express.static(__dirname + '/public'))
app.listen(port, () => {
	console.log(`A mágica acontece em http://localhost:${port}`);
})

config = 
	{
		host: 'us-cdbr-east-04.cleardb.com',
		user: 'b716da7f56001b',
		password: '9e5f384d',
		database: 'heroku_b402f720b46aaff',
		port: '3306'
	};

app.post('/login', (req, res) => {
    
    let matricula = req.body.matricula;
	let senha = req.body.senha;
	console.log(matricula+"\n"+senha)
	
	var resposta = "";
    
	const mysql = require('mysql');

	const conn = new mysql.createConnection(config);

	conn.connect(
		function (err) { 
		if (err) { 
			resposta = "!!! Cannot connect !!! Error:"+err;
			console.log({"result":resposta});
		}
		else
		{
			queryDatabase();
			conn.end();

		}
	});
	
	function queryDatabase(){
		conn.query('SELECT COUNT(*) AS quant FROM ALUNOS WHERE MATRICULA = ? AND SENHA LIKE ? ;', [matricula,senha], 
			function (err, results, fields) {
				let qry = '';
				if (err){ qry = JSON.stringify({"result":err});}
				else{
					console.log(results[0].quant);
					if(parseInt(results[0].quant) === 0){
						qry = JSON.stringify({"result":false});
					}else{
						qry = JSON.stringify({"result":true});
					}
					
				} 
				res.end(qry);
			}
		)
		/*conn.query('INSERT INTO ALUNOS(MATRICULA, NOME, EMAIL) VALUES (?, ?, ?);', [2026438, 'Usuário Teste', 'email@teste.com'], 
				function (err, results, fields) {
					if (err) throw res.end(err);
			else res.end("Inserted " + results.affectedRows + " row(s).");
		})*/
	};
	
	
	
    
})//Fim

app.post('/getAluno', (req, res) => {
    
    let matricula = req.body.matricula;
	
	var resposta = "";
    
	const mysql = require('mysql');

	const conn = new mysql.createConnection(config);

	conn.connect(
		function (err) { 
		if (err) { 
			resposta = "!!! Cannot connect !!! Error:"+err;
			console.log({"result":resposta});
		}
		else
		{
			queryDatabase();
			conn.end();

		}
	});
	
	function queryDatabase(){
		conn.query('SELECT * FROM ALUNOS WHERE MATRICULA = ?;', [matricula], 
			function (err, results, fields) {
				let qry = '';
				if (err){ qry = JSON.stringify(err);}
				else{ qry = JSON.stringify(results); } 
				res.end(qry);
			}
		)
		/*conn.query('INSERT INTO ALUNOS(MATRICULA, NOME, EMAIL) VALUES (?, ?, ?);', [2026438, 'Usuário Teste', 'email@teste.com'], 
				function (err, results, fields) {
					if (err) throw res.end(err);
			else res.end("Inserted " + results.affectedRows + " row(s).");
		})*/
	};
	
	
	
    
})//Fim

app.post('/getDisciplina', (req, res) => {
    
    let matricula = req.body.matricula;
    let cd_disciplina = req.body.cd_disciplina
	
	var resposta = "";
    
	const mysql = require('mysql');

	/*var config = 
	{
		host: 'us-cdbr-east-04.cleardb.com',
		user: 'b716da7f56001b',
		password: '9e5f384d',
		database: 'heroku_b402f720b46aaff',
		port: '3306'
	};*/

	const conn = new mysql.createConnection(config);

	conn.connect(
		function (err) { 
		if (err) { 
			resposta = "!!! Cannot connect !!! Error:"+err;
			console.log({"result":resposta});
		}
		else
		{
			queryDatabase();
			conn.end();

		}
	});
	
	function queryDatabase(){
		conn.query('SELECT * FROM ALUNO_DISCIPLINA AD INNER JOIN DISCIPLINAS D ON AD.ID_DISCIPLINA = D.ID WHERE ID_ALUNO = ? AND COD_DISC = ?;', [matricula,cd_disciplina], 
			function (err, results, fields) {
				let qry = '';
				if (err){ qry = JSON.stringify(err);}
				else{ 
					if (results[0] != undefined) {
						qry = JSON.stringify(results);
					} else {qry = JSON.stringify([{"vazio":0}]);}
					 } 
				res.end(qry);
			}
		)
		/*conn.query('INSERT INTO ALUNOS(MATRICULA, NOME, EMAIL) VALUES (?, ?, ?);', [2026438, 'Usuário Teste', 'email@teste.com'], 
				function (err, results, fields) {
					if (err) throw res.end(err);
			else res.end("Inserted " + results.affectedRows + " row(s).");
		})*/
	};
	
    
})//Fim

app.post('/aptoAoPonto', (req, res) => {
    
    let disciplina = req.body.disciplina;
	
	var resposta = "";
    
	const mysql = require('mysql');

	/*var config = 
	{
		host: 'us-cdbr-east-04.cleardb.com',
		user: 'b716da7f56001b',
		password: '9e5f384d',
		database: 'heroku_b402f720b46aaff',
		port: '3306'
	};*/

	const conn = new mysql.createConnection(config);

	conn.connect(
		function (err) { 
		if (err) { 
			resposta = "!!! Cannot connect !!! Error:"+err;
			console.log({"result":resposta});
		}
		else
		{
			queryDatabase();
			conn.end();

		}
	});
	
	function queryDatabase(){
		conn.query('SELECT * FROM CHAMADA WHERE ID_DISCIPLINA = ? AND CHAMADA_ABERTA = "S";', [disciplina], 
			function (err, results, fields) {
				let qry = '';
				if (err){ qry = JSON.stringify(err);}
				else{ if (results[0] != undefined) {
						qry = JSON.stringify(results);
					} else {qry = JSON.stringify([{"vazio":0}]);} } 
				res.end(qry);
			}
		)
	};
    
})//Fim

app.post('/pontoBatido', (req, res) => {
    
    let matricula = req.body.matricula;
    let disciplina = req.body.disciplina;
	
	var resposta = "";
    
	const mysql = require('mysql');

	/*var config = 
	{
		host: 'us-cdbr-east-04.cleardb.com',
		user: 'b716da7f56001b',
		password: '9e5f384d',
		database: 'heroku_b402f720b46aaff',
		port: '3306'
	};*/

	const conn = new mysql.createConnection(config);

	conn.connect(
		function (err) { 
		if (err) { 
			resposta = "!!! Cannot connect !!! Error:"+err;
			console.log({"result":resposta});
		}
		else
		{
			queryDatabase();
			conn.end();

		}
	});
	
		
	function queryDatabase(){
		conn.query('select (case when (SELECT COUNT(*) FROM PONTO AS P INNER JOIN CHAMADA AS C ON P.ID_CHAMADA = C.ID WHERE P.ID_ALUNO = ? AND C.ID_DISCIPLINA = ? AND P.TIPO = "E" ) = 0 then "E" else "S" end) AS RETORNO', [matricula,disciplina], 
			function (err, results, fields) {
				let qry = '';
				if (err){ qry = JSON.stringify(err);}
				else{ qry = JSON.stringify(results); } 
				res.end(qry);
			}
		)
	};
    
})//Fim

app.post('/setPonto', (req, res) => {
    
    let matricula = req.body.matricula;
    let disciplina = req.body.disciplina;
    let tipo = req.body.tipo;
	
	var resposta = "";
    
	const mysql = require('mysql');

	const conn = new mysql.createConnection(config);

	conn.connect(
		function (err) { 
		if (err) { 
			resposta = "!!! Cannot connect !!! Error:"+err;
			console.log({"result":resposta});
		}
		else
		{
			queryDatabase();
			conn.end();

		}
	});
	
	function queryDatabase(){
		
		conn.query('INSERT INTO PONTO(ID_ALUNO, ID_CHAMADA, TIPO) VALUES (?, ?, ?) ;', [matricula,disciplina,tipo], 
			function (err, results, fields) {
				let qry = '';
				if (err){ qry = JSON.stringify({"error":err});}
				else{
					if (tipo == "E") {
						qry = "Entrada Registrada Com Sucesso!";
					} else {
						qry = "Saída Registrada Com Sucesso!";
					}
					
					
				} 
				res.end(qry);
			}
		)
	};
	/*function queryDatabase(){
		

		conn.query('SELECT COUNT(*) PONTO FROM PONTO WHERE ID_ALUNO = ? AND ID_CHAMADA = ? AND TIPO = "E";', [matricula],[disciplina], 
			function (err, results, fields) {
				let qry = '';
				if (err){ qry = JSON.stringify(err);}
				else{ 
					conn.query('INSERT INTO ALUNOS(MATRICULA, NOME, EMAIL) VALUES (?, ?, ?);', [2026438, 'Usuário Teste', 'email@teste.com'], 
						function (err, results, fields) {
							if (err){ qry = JSON.stringify(err);}
							else res.end(JSON.stringify(results));
						}
					)
					qry = JSON.stringify(results)
					//res.end(qry);
				} 
				res.end(qry);
			})
		
	};*/
	
    
})//Fim


function queryDatabaseSELECT(matricula,disciplina){

	var resposta = "";
    
	const mysql = require('mysql');

	const conn = new mysql.createConnection(config);

	conn.connect(
		function (err) { 
		if (err) { 
			resposta = "!!! Cannot connect !!! Error:"+err;
			//console.log({"result":resposta});
		}
		else
		{
			var qry = '';
			conn.query('select (case when (SELECT COUNT(*) FROM PONTO WHERE ID_ALUNO = 1234567 AND ID_CHAMADA = 15 AND TIPO = "E" ) = 0 then "E" else "S" end) AS RETORNO;', [matricula,disciplina], 
				function (err, results, fields) {
					
					if (err){ qry = err;}
					else{
						qry = JSON.parse(results);
						console.log(qry.RETORNO);
						//res.end(results);
						
					} 
					
				}
			)

			console.log(qry);
			conn.end();
			return qry;

		}
	});


		
	};