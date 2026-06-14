const express = require('express')
const bodyParser = require('body-parser')

//PERMITINDO A UTILIZAÇÃO DO JSON NO BODY DAS REQUISIÇÕES
const bodyParserJSON = bodyParser.json()

const router = express.Router()

const controllerUsuario = require('../controller/usuario/controller_usuario.js')
const authUser          = require('../middleware/auth.js')

router.post('/', bodyParserJSON, async function (request, response) {
    let dados = request.body
    let contentType = request.headers['content-type']

    let result = await controllerUsuario.inserirNovoUsuario(dados, contentType)
    response.status(result.status_code)
    response.json(result)
})

router.get('/', authUser.verifyToken, async function (request, response) {
    let result = await controllerUsuario.listarUsuario()

    response.status(result.status_code)
    response.json(result)
})

router.get('/:id', authUser.verifyToken, async function (request, response) {
    let id = request.params.id

    let result = await controllerUsuario.buscarUsuario(id)

    response.status(result.status_code)
    response.json(result)
})

router.put('/:id', authUser.verifyToken, bodyParserJSON, async function (request, response) {
    let id = request.params.id
    let dados = request.body
    let contentType = request.headers['content-type']

    let result = await controllerUsuario.atualizarUsuario(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
})

router.delete('/:id', authUser.verifyToken, async function (request, response) {
    let id = request.params.id

    let result = await controllerUsuario.excluirUsuario(id)

    response.status(result.status_code)
    response.json(result)
})

router.post('/login', bodyParserJSON, async function (request, response) {
    let dados = request.body
    let contentType = request.headers['content-type']

    let result = await controllerUsuario.loginUsuario(dados, contentType)
    response.status(result.status_code)
    response.json(result)
})

module.exports = router