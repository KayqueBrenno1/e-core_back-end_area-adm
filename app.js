//IMPORT DAS DEPENDENDIAS
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

//PERMITINDO A UTILIZAÇÃO DO JSON NO BODY DAS REQUISIÇÕES
const bodyParserJSON = bodyParser.json()

//CRIANDO UM OBJETO DO EXPRESS PARA CRIAR A API
const app = express()

//CONFIGURAÇÕES DO CORS
const corsOptions = {
    origin: ['*'], //Configuração de origem da requisição (IP ou Dominio)
    methods: 'GET, POST, PUT, DELETE, OPTIONS', //Configuração dos verbos que serão utilizados na API
    allowedHeaders: ['Content-type', 'Authorization'] //Configurações de permissões
                    //Tipo de dados  //Autorização de acesso
}

//APLICAR AS CONFIGURAÇÕES DO CORS NO APP (EXPRESS)
app.use(cors(corsOptions))