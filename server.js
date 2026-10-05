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
