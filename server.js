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