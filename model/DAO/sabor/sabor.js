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
    try {
        let sql = `insert into tbl_sabor (
            nome_sabor
        ) values (
            '${sabor.nome_sabor}' 
        );`

        let result = await knexConection.raw(sql)

        if (result)
            return result[0].insertId
        else
            return false
    } catch (error) {
        return false
    }
}

//FUNÇÃO PARA ATUALIZAR UM SABOR EXISTENTE NO BANCO DE DADOS
const updateSabor = async function (sabor) {
    try {
        let sql = `update tbl_sabor set
                        nome_sabor = '${sabor.nome_sabor}'
                    where id = ${sabor.id};`

        let result = await knexConection.raw(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

//FUNÇÃO PARA LISTAR TODOS OS SABORES REGISTRADOS NO SISTEMA
const selectAllSabor = async function () {
    try {
        let sql = `select * from tbl_sabor order by id desc;`

        let result = await knexConection.raw(sql)

        if (Array.isArray(result))
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

//FUNÇÃO PARA RETORNAR UM SABOR FILTRANDO PELO ID
const selectByIdSabor = async function (id) {
    try {
        let sql = `select * from tbl_sabor where id = ${id}`

        let result = await knexConection.raw(sql)

        if (Array.isArray(result))
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

//FUNÇÃO PARA EXCLUIR UM SABOR REGISTRADO NO SISTEMA FILTRANDO PELO ID
const deleteSabor = async function (id) {
    try {
        let sql = `delete from tbl_sabor where id = ${id}`

        let result = await knexConection.raw(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

module.exports = {
    insertSabor,
    updateSabor,
    selectAllSabor,
    selectByIdSabor,
    deleteSabor
}