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