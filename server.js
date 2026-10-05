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
