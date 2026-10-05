app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada' });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log('Servidor rodando em http://localhost:' + PORT);
});