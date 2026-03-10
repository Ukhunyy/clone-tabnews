function status(req, res) {
  res.status(200).json({ chave: "são acima da média" });
}

module.exports = status;
