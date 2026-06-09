/*************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados da BEBIDA no banco de dados
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

//FUNÇÃO PARA INSERIR UMA NOVA BEBIDA NO BANCO DE DADOS
const insertBebida = async function (bebida) {

}

//FUNÇÃO PARA ATUALIZAR UMA BEBIDA EXISTENTE NO BANCO DE DADOS
const updateBebida = async function (bebida) {

}

//FUNÇÃO PARA LISTAR TODAS AS BEBIDAS REGISTRADAS NO SISTEMA
const selectAllBebida = async function () {

}

//FUNÇÃO PARA RETORNAR UMA BEBIDA FILTRANDO PELO ID
const selectByIdBebida = async function (id) {

}

//FUNÇÃO PARA EXCLUIR UMA BEBIDA REGISTRADA NO SISTEMA FILTRANDO PELO ID
const deleteBebida = async function (id) {

}

module.exports = {
    insertBebida,
    updateBebida,
    selectAllBebida,
    selectByIdBebida,
    deleteBebida
}