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