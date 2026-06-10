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
const e = require('cors')

//CRIAR A CONEXÃO COM O BANCO DE DADOS CONFORME A CONFIGURAÇÃO
const knexConection = knex(knexDataBaseConfig.development)

//FUNÇÃO PARA INSERIR UMA NOVA CARACTERÍSTICA NO BANCO DE DADOS
const insertCaracteristica = async function (caracteristica) {
    try {
        let sql = `insert into tbl_caracteristica (
            nome
        ) values (
            '${caracteristica.nome}' 
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

//FUNÇÃO PARA ATUALIZAR UMA CARACTERÍSTICA EXISTENTE NO BANCO DE DADOS
const updateCaracteristica = async function (caracteristica) {
    try {
        let sql = `update tbl_caracteristica set
                        nome = '${caracteristica.nome}'
                    where id = ${caracteristica.id};`

        let result = await knexConection.raw(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

//FUNÇÃO PARA LISTAR TODAS AS CARACTERÍSTICA REGISTRADAS NO SISTEMA
const selectAllCaracteristica = async function () {
    try {
        let sql = `select * from tbl_caracteristica order by id desc;`

        let result = await knexConection.raw(sql)

        if (Array.isArray(result))
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

//FUNÇÃO PARA RETORNAR UMA CARACTERÍSTICA FILTRANDO PELO ID
const selectByIdCaracteristica = async function (id) {
    try {
        let sql = `select * from tbl_caracteristica where id = ${id};`

        let result = await knexConection.raw(sql)

        if (Array.isArray(result))
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

//FUNÇÃO PARA EXCLUIR UMA CARACTERÍSTICA REGISTRADA NO SISTEMA FILTRANDO PELO ID
const deleteCaracteristica = async function (id) {
    try {
        let sql = `delete from tbl_caracteristica where id = ${id}`

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
    insertCaracteristica,
    updateCaracteristica,
    selectAllCaracteristica,
    selectByIdCaracteristica,
    deleteCaracteristica
}