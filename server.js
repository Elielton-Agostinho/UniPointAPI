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


app.post('/loginProf', (req, res) => {
    
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
		conn.query('SELECT COUNT(*) AS quant FROM PROFESSORES WHERE MATRICULA = ? AND SENHA LIKE ? ;', [matricula,senha], 
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

app.post('/getProfessor', (req, res) => {
    
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
		conn.query('SELECT * FROM PROFESSORES WHERE MATRICULA = ?;', [matricula], 
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
    let cd_disciplina = req.body.cd_disciplina + '%'
	
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
		conn.query('SELECT D.COD_DISC,D.ID,D.NOME,C.ID AS CHAMADA FROM ALUNO_DISCIPLINA AD INNER JOIN DISCIPLINAS D ON AD.ID_DISCIPLINA = D.ID INNER JOIN CHAMADA C ON D.ID = C.ID_DISCIPLINA WHERE ID_ALUNO = ? AND COD_DISC LIKE ?;', [matricula,cd_disciplina], 
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
	};
	
    
})//Fim

app.post('/getDisciplinaProf', (req, res) => {
    
    let matricula = req.body.matricula;
    let cd_disciplina = req.body.cd_disciplina + '%'
	
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
		conn.query('SELECT D.COD_DISC,D.ID,D.NOME FROM PROFESSOR_DISCIPLINA AD INNER JOIN DISCIPLINAS D ON AD.ID_DISCIPLINA = D.ID WHERE ID_PROFESSOR = ? AND COD_DISC LIKE ? LIMIT 2;', [matricula,cd_disciplina], 
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
	};
	
    
})//Fim

app.post('/verificaDisciplianAberta', (req, res) => {
    
    let matricula = req.body.matricula;
    let cd_disciplina = req.body.cd_disciplina
    let cod_disc_comp = req.body.cod_disc_comp
	
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
		conn.query('Select (case when (SELECT COUNT(*) FROM CHAMADA AS C INNER JOIN PROFESSORES AS P ON C.ID_PROFESSOR = P.MATRICULA INNER JOIN DISCIPLINAS AS D ON D.ID = C.ID_DISCIPLINA WHERE P.MATRICULA = ? AND C.ID_DISCIPLINA = ? AND C.CHAMADA_ABERTA = "S" AND D.COD_DISC = ? ) = 1 then (SELECT C.ID FROM CHAMADA AS C INNER JOIN PROFESSORES AS P ON C.ID_PROFESSOR = P.MATRICULA WHERE P.MATRICULA = ? AND C.ID_DISCIPLINA = ? AND C.CHAMADA_ABERTA = "S" ) else "N" end) AS RETORNO;', [matricula,cd_disciplina,cod_disc_comp,matricula,cd_disciplina], 
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
	};
	
    
})//Fim


app.post('/abrirChamada', (req, res) => {
    
    let disciplina = req.body.disciplina;
	let professor = req.body.professor;

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
		
		conn.query('INSERT INTO CHAMADA(ID_DISCIPLINA,DATA,CHAMADA_ABERTA,ID_PROFESSOR) VALUES(?,SYSDATE(),"S",?) ;', [disciplina,professor], 
			function (err, results, fields) {
				let qry = '';
				if (err){ qry = JSON.stringify({"error":err});}
				else{
					qry = "Chamada Encerrada Com Sucesso!";
				} 
				res.end(qry);
			}
		)
	};
	
    
})//Fim

app.post('/fecharChamada', (req, res) => {
    
    let id_chamada = req.body.id_chamada;
	
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
		
		conn.query('UPDATE CHAMADA SET CHAMADA_ABERTA = "N" WHERE ID = ? ;', [id_chamada], 
			function (err, results, fields) {
				let qry = '';
				if (err){ qry = JSON.stringify({"error":err});}
				else{
					qry = "Chamada Encerrada Com Sucesso!";
				} 
				res.end(qry);
			}
		)
	};
	
    
})//Fim

app.post('/getPonto', (req, res) => {
    
    let matricula = req.body.matricula;
    let cd_disciplina = req.body.cd_disciplina + '%'
	
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
		conn.query('SELECT C.ID_DISCIPLINA,P.DATA,D.COD_DISC FROM PONTO AS P INNER JOIN CHAMADA AS C  ON P.ID_CHAMADA = C.ID INNER JOIN DISCIPLINAS AS D ON D.ID = C.ID_DISCIPLINA WHERE P.ID_ALUNO = ? AND C.`DATA` <= (DATE_ADD(NOW(), INTERVAL 1 DAY));', [matricula], 
			function (err, results, fields) {
				let qry = '';
				if (err){ qry = JSON.stringify(err);}
				else{ 
					if (results[0] != undefined) {
						qry = JSON.stringify(results);
					} else {qry = JSON.stringify([{"vazio":0,"retorno":"Não Houve Registro De Presença!"}]);}
					 } 
				res.end(qry);
			}
		)
	};
	
    
})//Fim

app.post('/getPontoProfessor', (req, res) => {
    
    let matricula = req.body.matricula;
    let data = req.body.data
	
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
		conn.query('SELECT * FROM PONTO_PROFESSOR AS PF WHERE PF.ID_PROFESSOR = ? AND PF.DATA = ? ORDER BY PF.ID DESC;', [matricula,data], 
			function (err, results, fields) {
				let qry = '';
				if (err){ qry = JSON.stringify(err);}
				else{ 
					if (results[0] != undefined) {
						qry = JSON.stringify(results);
					} else {qry = JSON.stringify([{"vazio":0,"retorno":"Não Houve Registro De Ponto!"}]);}
					 } 
				res.end(qry);
			}
		)
	};
	
    
})//Fim

app.post('/getHorariosPontoProfessor', (req, res) => {
    
    let id_ponto = req.body.id_ponto;
	
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
		conn.query('SELECT * FROM PONTO_PROFESSOR_AUX AS PFA WHERE PFA.ID_PONTO_PROFESSOR = ?;', [id_ponto], 
			function (err, results, fields) {
				let qry = '';
				if (err){ qry = JSON.stringify(err);}
				else{ 
					if (results[0] != undefined) {
						qry = JSON.stringify(results);
					} else {qry = JSON.stringify([{"vazio":0,"retorno":"Não Houve Registro De Ponto!"}]);}
					 } 
				res.end(qry);
			}
		)
	};
	
    
})//Fim

app.post('/getTipoPontoProfessor', (req, res) => {
    
    let matricula = req.body.matricula;
    let data = req.body.data
	
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
		conn.query('select (case when (SELECT COUNT(*) FROM PONTO_PROFESSOR AS P INNER JOIN ponto_professor_aux AS PA ON P.ID = PA.ID_PONTO_PROFESSOR WHERE P.ID_PROFESSOR = ? AND P.`DATA` = ? AND PA.TIPO = "E" ) = 0 then "E1" else (select (case when (SELECT PA2.TIPO FROM PONTO_PROFESSOR AS P2 INNER JOIN ponto_professor_aux AS PA2 ON P2.ID = PA2.ID_PONTO_PROFESSOR WHERE P2.ID_PROFESSOR = ? AND P2.`DATA` = ? ORDER BY PA2.ID DESC LIMIT 1 ) = "S" then "E" else "S" end)) end) AS RETORNO;', [matricula,data,matricula,data], 
			function (err, results, fields) {
				let qry = '';
				if (err){ qry = JSON.stringify(err);}
				else{ 
					if (results[0] != undefined) {
						qry = JSON.stringify(results);
					} else {qry = JSON.stringify([{"vazio":0,"retorno":"Não Houve Registro De Presença!"}]);}
					 } 
				res.end(qry);
			}
		)
	};
	
    
})//Fim

app.post('/setTipoPontoProfessorAux', (req, res) => {
    
    let matricula = req.body.matricula;
    let data = req.body.data;
    let hora = req.body.hora;
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
		
		conn.query('INSERT INTO PONTO_PROFESSOR_AUX(ID_PONTO_PROFESSOR,TIPO,HORA) VALUES((select p.id from ponto_professor as p where p.id_professor = ? and data = ?),?,?);', [matricula,data,tipo,hora], 
			function (err, results, fields) {
				let qry = '';
				if (err){ qry = JSON.stringify({"error":err});}
				else{
					qry = "Ponto Registrado Com Sucesso!";
				} 
				res.end(qry);
			}
		)
	};
	
    
})//Fim

app.post('/setTipoPontoProfessor', (req, res) => {
    
    let matricula = req.body.matricula;
    let data = req.body.data;
    let hora = req.body.hora;
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
		
		conn.query('INSERT INTO PONTO_PROFESSOR(ID_PROFESSOR,DATA) VALUES(?,?);', [matricula,data], 
			function (err, results, fields) {
				let qry = '';
				if (err){ qry = JSON.stringify({"error":err});}
				else{
					qry = "Ponto Registrado Com Sucesso!";
				} 
				res.end(qry);
			}
		)
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
		conn.query('select (case when (SELECT COUNT(*) FROM PONTO AS P INNER JOIN CHAMADA AS C ON P.ID_CHAMADA = C.ID WHERE P.ID_ALUNO = ? AND C.ID_DISCIPLINA = ? AND P.TIPO = "E" ) = 0 then "E" else "S" end) AS RETORNO;', [matricula,disciplina], 
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
    let horario = req.body.horario;
	
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
		
		conn.query('INSERT INTO PONTO(ID_ALUNO, ID_CHAMADA, TIPO,DATA) VALUES (?, ?, ?,?) ;', [matricula,disciplina,tipo,horario], 
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
