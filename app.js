//IMPORT DAS DEPENDENDIAS
const express = require('express')
const cors = require('cors')

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

const saborRouter = require('./routes/sabor.router.js')
app.use('/v1/delicia-gelada/admin/sabor', cors(), saborRouter)

//Fazer o start da API
app.listen(8080, function () {
    console.log('API aguardando novas requisições...')
})