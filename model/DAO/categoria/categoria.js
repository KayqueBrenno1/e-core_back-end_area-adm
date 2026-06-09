/*************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados da CATEGORIA no banco de dados
 *          MySQL
 * Data: 09/06/2026
 * Autor: Kayque Brenno Ferreira Almeida
 * Versão: 1.0
**************************************************************************************/

//IMPORT DA BIBLIOTECA PARA MANIPULAR DADOS NO BD MYSQL
const knex = require('knex')

//IMPORT DO ARQUIVO DE CONFIGURAÇÃO PARA ACESSO AO BD
const knexDataBaseConfig = require('../../database/database_config/knexConfig.js')

//CRIAR A CONEXÃO COM O BANCO DE DADOS CONFORME A CONFIGURAÇÃO
const knexConection = knex(knexDataBaseConfig.development)

//FUNÇÃO PARA INSERIR UMA NOVA CATEGORIA NO BANCO DE DADOS
const insertCategoria = async function (categoria) {

}

//FUNÇÃO PARA ATUALIZAR UMA CATEGORIA EXISTENTE NO BANCO DE DADOS
const updateCategoria = async function (categoria) {

}

//FUNÇÃO PARA LISTAR TODAS AS CATEGORIA REGISTRADAS NO SISTEMA
const selectAllCategoria = async function () {

}

//FUNÇÃO PARA RETORNAR UMA CATEGORIA FILTRANDO PELO ID
const selectByIdCategoria = async function (id) {

}

//FUNÇÃO PARA EXCLUIR UMA CATEGORIA REGISTRADA NO SISTEMA FILTRANDO PELO ID
const deleteCategoria = async function (id) {

}

module.exports = {
    insertCategoria,
    updateCategoria,
    selectAllCategoria,
    selectByIdCategoria,
    deleteCategoria
}