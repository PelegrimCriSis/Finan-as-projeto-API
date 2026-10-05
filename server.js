function logger(req, res, next) {
  console.log(req.method + ' ' + req.url);
  next();
}

app.use(logger);
app.use(express.json());
