const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/usuarios', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

const User = mongoose.model('User', userSchema);

app.use(bodyParser.json());

// Ruta para crear un nuevo usuario
app.post('/new-user', async (req, res) => {
  const { username, password } = req.body;
  const newUser = new User({ username, password });
  await newUser.save();
  res.send('Nuevo usuario guardado');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
