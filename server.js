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


app.post('/login', (req, res) => {
    
    let matricula = req.body.matricula;
	let senha = req.body.senha;
	console.log(matricula+"\n"+senha)
	
	var resposta = "";
    
	const mysql = require('mysql');

	var config = 
	{
		host: 'us-cdbr-east-04.cleardb.com',
		user: 'b716da7f56001b',
		password: '9e5f384d',
		database: 'heroku_b402f720b46aaff',
		port: '3306'
	};

	const conn = new mysql.createConnection(config);

	conn.connect(
		function (err) { 
		if (err) { 
			resposta = "!!! Cannot connect !!! Error:"+err;
			res.end(JSON.stringify({"result":resposta}));
		}
		else
		{
			queryDatabase();
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
	
	
	
    
})