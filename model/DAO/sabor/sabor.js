/*************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados da SABOR no banco de dados
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

//FUNÇÃO PARA INSERIR UM NOVO SABOR NO BANCO DE DADOS
const insertSabor = async function (sabor) {

}

//FUNÇÃO PARA ATUALIZAR UM SABOR EXISTENTE NO BANCO DE DADOS
const updateSabor = async function (sabor) {

}

//FUNÇÃO PARA LISTAR TODOS OS SABORES REGISTRADOS NO SISTEMA
const selectAllSabor = async function () {

}

//FUNÇÃO PARA RETORNAR UM SABOR FILTRANDO PELO ID
const selectByIdSabor = async function (id) {

}

//FUNÇÃO PARA EXCLUIR UM SABOR REGISTRADO NO SISTEMA FILTRANDO PELO ID
const deleteSabor = async function (id) {

}

module.exports = {
    insertSabor,
    updateSabor,
    selectAllSabor,
    selectByIdSabor,
    deleteSabor
}