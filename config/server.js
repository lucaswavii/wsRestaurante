/* importar o módulo do framework express */
var express = require('express');

var fileUpload = require('express-fileupload');

var multer  = require('multer');

/* importar o módulo cep */
var Correios = require('node-correios')

/* importar o módulo do nodemailer */

var nodemailer = require('nodemailer');

var engine = require('ejs-locals');

/* importar o módulo do consign */
var consign = require('consign');

/* importar o módulo do body-parser */
var bodyParser = require('body-parser');

/* importar o módulo do express-validator */
var expressValidator = require('express-validator');

/* importar o módulo do express-session */
var expressSession = require('express-session');

/* Object Id */
var ObjectId = require('objectid');

/* iniciar o objeto do express */
var app = express();

app.use(fileUpload({limits: { fileSize: 50 * 1024 * 1024 },}));

/* setar as variáveis 'view engine' e 'views' do express */
app.engine('ejs', engine);
app.set('view engine', 'ejs');

app.set('views', './app/views');

/* configurar o middleware express.static */
app.use(express.static('./app/public'));

/* configurar o middleware body-parser */
app.use(bodyParser.urlencoded({extended: true}));

/* configurar o middleware express-validator */
app.use(expressValidator());

//app.use();
//app.use(nodemailer.createTransport({ service: 'gmail', auth: { user: "comercial@wavii.com.br", pass: "Wavii13851424" } }));
var expiryDate = new Date( Date.now() + 60 * 60 * 1000 ); // 1 hour

/* configurar o middleware express-session */
app.use(expressSession({
	name: 'session',
	secret:'6677eedaiiiieeanlllkmcslkdnclsdncklsdnclksçlmsci899',
	resave: false,
	saveUninitialized:false,
	maxAge: expiryDate // 24 hours
}));

//app.use(function (req, res, next) {
//	req.session.nowInMinutes = Math.floor(Date.now() / 60e3)
//	next()
//})

/* efetua o autoload das rotas, dos models e dos controllers para o objeto app */
consign()
	.include('app/routes')
	.then('config/dbConnection.js')
	.then('app/models')
	.then('app/controllers')
	.into(app);

/* exportar o objeto app */
module.exports = app;
