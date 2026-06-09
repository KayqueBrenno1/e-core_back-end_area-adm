/***************************************************************************************************
 * Objetivo: Arquivo responsável pela padronização das mensagens e status code do projeto de bebidas
 * Data: 09/06/2026
 * Autor: Kayque Brenno Ferreira Almeida
 * Versão: 1.0
****************************************************************************************************/

//Padronização dos retornos da API (Cabeçalho)
const DEFAULT_MESSAGE = {
    api_description: 'API para controlar o projeto de BEBIDAS',
    development: 'Kayque Brenno Ferreira Almeida',
    version: '1.0.6.26',
    status: Boolean,
    status_code: Number,
    response: {}
}

//MENSAGENS DE ERRO
const ERROR_BAD_REQUEST = {
    status: false,
    status_code: 400,
    message: 'Não foi possível processar a requisição devido a erros de entrada de dados.'
}

const ERROR_UNAUTHORIZED = {
    status: false,
    status_code: 401,
    message: 'Não foi possível processar a requisição, usuário não autenticado.'
}

const ERROR_NOT_FOUND = {
    status: false,
    status_code: 404,
    message: 'Não foram encontrados dados para retorno'
}

const ERROR_CONTENT_TYPE = {
    status: false,
    status_code: 415,
    message: 'Não foi possível processar a requisição, pois o formato de dados encaminhado não é suportado pelo servidor, apenas deve ser utilizado JSON.'
}

const ERROR_INTERNAL_SERVER_MODEL = {
    status: false,
    status_code: 500,
    message: 'Não foi possível processar a requisição devido a um erro interno no servidor [MODEL]'
}

const ERROR_INTERNAL_SERVER_CONTROLLER = {
    status: false,
    status_code: 500,
    message: 'Não foi possível processar a requisição devido a um erro interno no servidor [CONTROLLER]'
}

//MENSAGENS DE SUCESSO
const SUCCESS_RESPONSE = {
    status: true,
    status_code: 200
}

const SUCCESS_UPDATE_ITEM = {
    status: true,
    status_code: 200,
    message: 'Item atualizado com sucesso!'
}

const SUCCESS_CREATED_ITEM = {
    status: true,
    status_code: 201,
    message: 'Item inserido com sucesso!'
}

const SUCCESS_CREATED_ITEM_WARNING = {
    status: true,
    status_code: 201,
    message: 'Item inserido com sucesso, porém alguns dados tiveram problemas no cadastro [DADOS DE RELACIONAMENTO]'
}

const SUCCESS_DELETE_ITEM = {
    status: true,
    status_code: 204
}

module.exports = {
    DEFAULT_MESSAGE,
    ERROR_BAD_REQUEST,
    ERROR_UNAUTHORIZED,
    ERROR_NOT_FOUND,
    ERROR_CONTENT_TYPE,
    ERROR_INTERNAL_SERVER_MODEL,
    ERROR_INTERNAL_SERVER_CONTROLLER,
    SUCCESS_RESPONSE,
    SUCCESS_UPDATE_ITEM,
    SUCCESS_CREATED_ITEM,
    SUCCESS_CREATED_ITEM_WARNING,
    SUCCESS_DELETE_ITEM
}