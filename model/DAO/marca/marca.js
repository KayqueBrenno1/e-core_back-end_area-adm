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
const e = require('cors')

//CRIAR A CONEXÃO COM O BANCO DE DADOS CONFORME A CONFIGURAÇÃO
const knexConection = knex(knexDataBaseConfig.development)

//FUNÇÃO PARA INSERIR UMA NOVA MARCA NO BANCO DE DADOS
const insertMarca = async function (marca) {
    try {
        let sql = `insert into tbl_marca (
            nome_marca
        ) values (
            '${marca.nome_marca}' 
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

//FUNÇÃO PARA ATUALIZAR UMA MARCA EXISTENTE NO BANCO DE DADOS
const updateMarca = async function (marca) {
    try {
        let sql = `update tbl_marca set
                        nome_marca = '${marca.nome_marca}'
                    where id = ${marca.id};`

        let result = await knexConection.raw(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

//FUNÇÃO PARA LISTAR TODAS AS MARCAS REGISTRADAS NO SISTEMA
const selectAllMarca = async function () {
    try {
        let sql = `select * from tbl_marca order by id desc;`

        let result = await knexConection.raw(sql)

        if (Array.isArray(result))
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

//FUNÇÃO PARA RETORNAR UMA MARCA FILTRANDO PELO ID
const selectByIdMarca = async function (id) {
    try {
        let sql = `select * from tbl_marca where id = ${id};`

        let result = await knexConection.raw(sql)

        if (Array.isArray(result))
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

//FUNÇÃO PARA EXCLUIR UMA MARCA REGISTRADA NO SISTEMA FILTRANDO PELO ID
const deleteMarca = async function (id) {
    try {
        let sql = `delete from tbl_marca where id = ${id};`

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
    insertMarca,
    updateMarca,
    selectAllMarca,
    selectByIdMarca,
    deleteMarca
}