const express = require('express');
const app = express();
const PORT = 3000;

let categorias = [
  { id: 1, nome: 'Alimentação' },
  { id: 2, nome: 'Salário' }
];

let contas = [
  { id: 1, nome: 'Conta Corrente', saldoInicial: 500 }
];

let lancamentos = [];
