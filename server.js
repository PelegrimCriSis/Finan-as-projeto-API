
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

function logger(req, res, next) {
  console.log(req.method + ' ' + req.url);
  next();
}

app.use(logger);
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API de Controle Financeiro no ar');
});

app.get('/categorias', (req, res) => {
  res.json(categorias);
});

app.post('/categorias', (req, res) => {
  const nome = req.body.nome;

  if (!nome) {
    return res.status(400).json({ erro: 'Campo "nome" é obrigatório' });
  }

  const novaCategoria = {
    id: categorias.length + 1,
    nome: nome
  };

  categorias.push(novaCategoria);

  res.status(201).json(novaCategoria);
});

app.get('/contas', (req, res) => {
  res.json(contas);
});

app.get('/contas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  let conta;

  for (let i = 0; i < contas.length; i++) {
    if (contas[i].id === id) {
      conta = contas[i];
    }
  }

  if (conta == undefined) {
    return res.status(404).json({ erro: 'Conta não encontrada' });
  }

  res.json(conta);
});

app.post('/contas', (req, res) => {
  const nome = req.body.nome;
  const saldoInicial = req.body.saldoInicial;

  if (!nome) {
    return res.status(400).json({ erro: 'Campo "nome" é obrigatório' });
  }

  let id = 1;

  if (contas.length > 0) {
    id = contas[contas.length - 1].id + 1;
  }

  const novaConta = {
    id: id,
    nome: nome,
    saldoInicial: saldoInicial || 0
  };

  contas.push(novaConta);

  res.status(201).json(novaConta);
});

app.put('/contas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  let conta;

  for (let i = 0; i < contas.length; i++) {
    if (contas[i].id === id) {
      conta = contas[i];
    }
  }

  if (conta == undefined) {
    return res.status(404).json({ erro: 'Conta não encontrada' });
  }

  if (!req.body.nome) {
    return res.status(400).json({ erro: 'Campo "nome" é obrigatório' });
  }

  conta.nome = req.body.nome;

  if (req.body.saldoInicial != undefined) {
    conta.saldoInicial = req.body.saldoInicial;
  }

  res.json(conta);
});

app.delete('/contas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  let conta;

  for (let i = 0; i < contas.length; i++) {
    if (contas[i].id === id) {
      conta = contas[i];
    }
  }

  if (conta == undefined) {
    return res.status(404).json({ erro: 'Conta não encontrada' });
  }

  contas = contas.filter(function(c) {
    return c.id !== id;
  });

  res.json({ mensagem: 'Conta excluída' });
});

app.get('/contas/:id/saldo', (req, res) => {
  const id = parseInt(req.params.id);
  let conta;

  for (let i = 0; i < contas.length; i++) {
    if (contas[i].id === id) {
      conta = contas[i];
    }
  }

  if (conta == undefined) {
    return res.status(404).json({ erro: 'Conta não encontrada' });
  }

  let saldo = conta.saldoInicial;

  lancamentos.forEach(function(lancamento) {
    if (lancamento.contaId === conta.id) {
      if (lancamento.tipo === 'receita') {
        saldo = saldo + lancamento.valor;
      } else {
        saldo = saldo - lancamento.valor;
      }
    }
  });

  res.json({
    contaId: conta.id,
    nome: conta.nome,
    saldo: saldo
  });
});

app.get('/lancamentos', (req, res) => {
  const categoriaId = req.query.categoriaId;
  const inicio = req.query.inicio;
  const fim = req.query.fim;

  let resultado = lancamentos;

  if (categoriaId) {
    resultado = resultado.filter(function(lancamento) {
      return lancamento.categoriaId === parseInt(categoriaId);
    });
  }

  if (inicio) {
    resultado = resultado.filter(function(lancamento) {
      return lancamento.data >= inicio;
    });
  }

  if (fim) {
    resultado = resultado.filter(function(lancamento) {
      return lancamento.data <= fim;
    });
  }

  res.json(resultado);
});


function validarLancamento(req, res, next) {
  const descricao = req.body.descricao;
  const valor = req.body.valor;
  const tipo = req.body.tipo;
  const contaId = req.body.contaId;
  const categoriaId = req.body.categoriaId;

  if (!descricao || typeof valor !== 'number' || valor <= 0) {
    return res.status(400).json({
      erro: 'Informe "descricao" e "valor" (número maior que 0)'
    });
  }

  if (tipo !== 'receita' && tipo !== 'despesa') {
    return res.status(400).json({
      erro: '"tipo" deve ser "receita" ou "despesa"'
    });
  }

  let conta;

  for (let i = 0; i < contas.length; i++) {
    if (contas[i].id === contaId) {
      conta = contas[i];
    }
  }

  if (conta == undefined) {
    return res.status(404).json({ erro: 'Conta não encontrada' });
  }

  let categoria;

  for (let i = 0; i < categorias.length; i++) {
    if (categorias[i].id === categoriaId) {
      categoria = categorias[i];
    }
  }

  if (categoria == undefined) {
    return res.status(404).json({ erro: 'Categoria não encontrada' });
  }

  next();
}

app.post('/lancamentos', validarLancamento, (req, res) => {
  const novoLancamento = {
    id: lancamentos.length + 1,
    descricao: req.body.descricao,
    valor: req.body.valor,
    tipo: req.body.tipo,
    data: req.body.data,
    contaId: req.body.contaId,
    categoriaId: req.body.categoriaId
  };

  if (!novoLancamento.data) {
    novoLancamento.data = new Date().toISOString().slice(0, 10);
  }

  lancamentos.push(novoLancamento);

  res.status(201).json(novoLancamento);
});


app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada' });
});

app.listen(PORT, () => {
  console.log('Servidor rodando em http://localhost:' + PORT);
});
