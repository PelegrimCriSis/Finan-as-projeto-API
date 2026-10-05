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