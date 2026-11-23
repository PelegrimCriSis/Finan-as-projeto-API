
const { ObjectId } = require('mongodb');
const { getDB } = require('../config/database');

async function inserir(categoria) {
    return await getDB().collection('categorias').insertOne(categoria);
}
async function buscarTodos() {
    return await getDB().collection('categorias').find().toArray();
}
async function buscarPorId(id) {
    return await getDB().collection('categorias').findOne({
        _id: new ObjectId(id)
    });
}
async function atualizar(id, dados) {
    return await getDB().collection('categorias').updateOne(
        { _id: new ObjectId(id) },
        { $set: dados }
    );
}
async function remover(id) {
    return await getDB().collection('categorias').deleteOne({
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
