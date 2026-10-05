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