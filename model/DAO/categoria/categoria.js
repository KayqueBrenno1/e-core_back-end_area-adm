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
const knexDataBaseConfig = require('../../database_config/knexConfig.js')

//CRIAR A CONEXÃO COM O BANCO DE DADOS CONFORME A CONFIGURAÇÃO
const knexConection = knex(knexDataBaseConfig.development)

//FUNÇÃO PARA INSERIR UMA NOVA CATEGORIA NO BANCO DE DADOS
const insertCategoria = async function (categoria) {
    try {
        let sql = `insert into tbl_categoria (
            nome_categoria            
        ) values (
            '${categoria.nome_categoria}' 
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

//FUNÇÃO PARA ATUALIZAR UMA CATEGORIA EXISTENTE NO BANCO DE DADOS
const updateCategoria = async function (categoria) {
    try {
        let sql = ` update tbl_categoria set
                        nome_categoria = '${categoria.nome_categoria}'
                    where id = ${categoria.id};`

        let result = await knexConection.raw(sql)

        if (result)
            return true
        else 
            return false
    } catch (error) {
        return false
    }
}

//FUNÇÃO PARA LISTAR TODAS AS CATEGORIA REGISTRADAS NO SISTEMA
const selectAllCategoria = async function () {
    try {
        let sql = `select * from tbl_categoria order by id desc;`

        let result = await knexConection.raw(sql)

        if (Array.isArray(result))
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

//FUNÇÃO PARA RETORNAR UMA CATEGORIA FILTRANDO PELO ID
const selectByIdCategoria = async function (id) {
    try {
        let sql = `select * from tbl_categoria where id = ${id};`

        let result = await knexConection.raw(sql)

        if (Array.isArray(result))
            return result[0]
        else 
            return false
    } catch (error) {
        return false
    }
}

//FUNÇÃO PARA EXCLUIR UMA CATEGORIA REGISTRADA NO SISTEMA FILTRANDO PELO ID
const deleteCategoria = async function (id) {
    try {
        let sql = `delete from tbl_categoria where id = ${id};`

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
    insertCategoria,
    updateCategoria,
    selectAllCategoria,
    selectByIdCategoria,
    deleteCategoria
}