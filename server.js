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
app.listen(port, () => {})



//Página Números primos (POST)
app.post('/primo', (req, res) => {
    
    let valor = req.body.inputPrimo;
	var resposta = "";
    
	const mysql = require('mysql');

	var config =
	{
		host: 'unpt.mysql.database.azure.com',
		user: 'elielton@unpt',
		password: 'Li3345ag',
		database: 'unipoint',
		port: 3306
	};

	const conn = new mysql.createConnection(config);

	conn.connect(
		function (err) { 
		if (err) { 
			resposta = "!!! Cannot connect !!! Error:";
			throw err;
		}
		else
		{
			queryDatabase();
		}
	});

	function queryDatabase(){
		conn.query('SELECT * FROM ALUNOS WHERE MATRICULA = ?;', [valor], 
				function (err, results, fields) {
					if (err) throw res.end(err);
			else{
				var qry = '';
				for (i = 0; i < results.length; i++) {
					qry += JSON.stringify(results[i]);
				}
				res.end(qry);
			} 
		})
		/*conn.query('INSERT INTO ALUNOS(MATRICULA, NOME, EMAIL) VALUES (?, ?, ?);', [2026438, 'Usuário Teste', 'email@teste.com'], 
				function (err, results, fields) {
					if (err) throw res.end(err);
			else res.end("Inserted " + results.affectedRows + " row(s).");
		})*/
	};
	
	
	
    
})