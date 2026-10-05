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