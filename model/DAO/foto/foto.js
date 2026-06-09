/*************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados da FOTO no banco de dados
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

//FUNÇÃO PARA INSERIR UMA NOVA FOTO NO BANCO DE DADOS
const insertFoto = async function (foto) {

}

//FUNÇÃO PARA ATUALIZAR UMA FOTO EXISTENTE NO BANCO DE DADOS
const updateFoto = async function (foto) {

}

//FUNÇÃO PARA LISTAR TODAS AS FOTOS REGISTRADAS NO SISTEMA
const selectAllFoto = async function () {

}

//FUNÇÃO PARA RETORNAR UMA FOTO FILTRANDO PELO ID
const selectByIdFoto = async function (id) {

}

//FUNÇÃO PARA EXCLUIR UMA FOTO REGISTRADA NO SISTEMA FILTRANDO PELO ID
const deleteFoto = async function (id) {

}

module.exports = {
    insertFoto,
    updateFoto,
    selectAllFoto,
    selectByIdFoto,
    deleteFoto
}