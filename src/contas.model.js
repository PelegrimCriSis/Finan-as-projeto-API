const { ObjectId } = require('mongodb');
const { getDB } = require('../config/database');

async function inserir(conta) {
    return await getDB().collection('contas').insertOne(conta);
}

async function buscarTodos() {
    return await getDB().collection('contas').find().toArray();
}

async function buscarPorId(id) {
    return await getDB().collection('contas').findOne({
        _id: new ObjectId(id)
    });
}

async function atualizar(id, dados) {
    return await getDB().collection('contas').updateOne(
        { _id: new ObjectId(id) },
        { $set: dados }
    );
}

async function remover(id) {
    return await getDB().collection('contas').deleteOne({
        _id: new ObjectId(id)
    });
}

module.exports = {
    inserir,
    buscarTodos,
    buscarPorId,
    atualizar,
    remover
};
