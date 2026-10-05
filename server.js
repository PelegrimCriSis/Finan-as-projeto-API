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