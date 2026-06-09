/*************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados da MARCA no banco de dados
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

//FUNÇÃO PARA INSERIR UMA NOVA MARCA NO BANCO DE DADOS
const insertMarca = async function (marca) {

}

//FUNÇÃO PARA ATUALIZAR UMA MARCA EXISTENTE NO BANCO DE DADOS
const updateMarca = async function (marca) {

}

//FUNÇÃO PARA LISTAR TODAS AS MARCAS REGISTRADAS NO SISTEMA
const selectAllMarca = async function () {

}

//FUNÇÃO PARA RETORNAR UMA MARCA FILTRANDO PELO ID
const selectByIdMarca = async function (id) {

}

//FUNÇÃO PARA EXCLUIR UMA MARCA REGISTRADA NO SISTEMA FILTRANDO PELO ID
const deleteMarca = async function (id) {

}

module.exports = {
    insertMarca,
    updateMarca,
    selectAllMarca,
    selectByIdMarca,
    deleteMarca
}