/*****************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados da CARACTERÍSTICA no banco de dados
 *          MySQL
 * Data: 09/06/2026
 * Autor: Kayque Brenno Ferreira Almeida
 * Versão: 1.0
******************************************************************************************/

//IMPORT DA BIBLIOTECA PARA MANIPULAR DADOS NO BD MYSQL
const knex = require('knex')

//IMPORT DO ARQUIVO DE CONFIGURAÇÃO PARA ACESSO AO BD
const knexDataBaseConfig = require('../../database/database_config/knexConfig.js')

//CRIAR A CONEXÃO COM O BANCO DE DADOS CONFORME A CONFIGURAÇÃO
const knexConection = knex(knexDataBaseConfig.development)

//FUNÇÃO PARA INSERIR UMA NOVA CARACTERÍSTICA NO BANCO DE DADOS
const insertCaracteristica = async function (caracteristica) {

}

//FUNÇÃO PARA ATUALIZAR UMA CARACTERÍSTICA EXISTENTE NO BANCO DE DADOS
const updateCaracteristica = async function (caracteristica) {

}

//FUNÇÃO PARA LISTAR TODAS AS CARACTERÍSTICA REGISTRADAS NO SISTEMA
const selectAllCaracteristica = async function () {

}

//FUNÇÃO PARA RETORNAR UMA CARACTERÍSTICA FILTRANDO PELO ID
const selectByIdCaracteristica = async function (id) {

}

//FUNÇÃO PARA EXCLUIR UMA CARACTERÍSTICA REGISTRADA NO SISTEMA FILTRANDO PELO ID
const deleteCaracteristica = async function (id) {

}

module.exports = {
    insertCaracteristica,
    updateCaracteristica,
    selectAllCaracteristica,
    selectByIdCaracteristica,
    deleteCaracteristica
}