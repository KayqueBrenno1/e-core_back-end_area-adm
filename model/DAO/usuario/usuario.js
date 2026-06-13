/**********************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados do USUÁRIO no banco de dados MySQL.
 * Autor: Kayque Brenno Ferreira Almeida
 * Data: 13/06/2026
 * Versão: 1.0
**********************************************************************************************/

//IMPORT DA BIBLIOTECA PARA MANIPULAR DADOS NO BD MYSQL
const knex = require('knex')

//IMPORT DO ARQUIVO DE CONFIGURAÇÃO PARA ACESSO AO BD
const knexDataBaseConfig = require('../../database_config/knexConfig.js')

//CRIAR A CONEXÃO COM O BANCO DE DADOS CONFORME A CONFIGURAÇÃO
const knexConection = knex(knexDataBaseConfig.development)

const insertUsuario = async function (usuario) {
    try {
        let sql = `insert into tbl_usuario (
            nome,
            email,
            senha,
            jwt
        ) values (
            '${usuario.nome}',
            '${usuario.email}',
            '${usuario.senha}',
            '${usuario.jwt}'
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

const updateUsuario = async function (usuario) {
    try {
        let sql = `update tbl_usuario set
                        nome    = '${usuario.nome}',
                        email   = '${usuario.email}',
                        senha   = '${usuario.senha}'
                    where id = ${usuario.id};`

        let result = await knexConection.raw(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const selectAllUsuario = async function() {
    try {
        let sql = `select id, nome, email, jwt from tbl_usuario order by id desc;`

        let result = await knexConection.raw(sql)

        if (Array.isArray(result))
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

const selectByIdUsuario = async function (id) {
    try {
        let sql = `select id, nome, email jwt from tbl_usuario where id = ${id};`

        let result = await knexConection.raw(sql)
        
        if (Array.isArray(result))
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

const deleteUsuario = async function (id) {
    try {
        let sql = `delete from tbl_usuario where id = ${id}`

        let result = await knexConection.raw(sql)

        if (result)
            return true 
        else
            return false
    } catch (error) {
        return false
    }
}

const selectByLoginUsuario = async function (login) {
    try {
        let sql = `select * from tbl_usuario where email = '${login}';`

        let result = await knexConection.raw(sql)

        if (Array.isArray(result))
            return result[0]
        else
            return false
    } catch (error) {
        console.log(error)
        return false
    }
}

const saveTokenUsuario = async function (id, jwt) {
    try {
        let sql = `
            update tbl_usuario set
                jwt = '${jwt}'
            where id = ${id};
        `
        let result = await knexConnection.raw(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

module.exports = {
    insertUsuario,
    updateUsuario,
    selectAllUsuario,
    selectByIdUsuario,
    deleteUsuario,
    selectByLoginUsuario,
    saveTokenUsuario
}