const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

const clientes = require('./data/clientes.json');
const validarDireccion  = require('./reglas/reglas-direcciones');

// Clientes válidos
app.get('/direcciones-validas', (req, res) => {
  const resultado = clientes
    .filter(c => validarDireccion(c.direccion).length === 0)
    .map(({ id, direccion, ...rest }) => rest);

  res.status(200).json(resultado);
});

// Clientes inválidos con errores
app.get('/direcciones-invalidas', (req, res) => {
  const resultado = clientes
    .map(c => {
      const errores = validarDireccion(c.direccion);
      return errores.length > 0
        ? {
            nombre: c.nombre,
            email: c.email,
            errores
          }
        : null;
    })
    .filter(Boolean); // elimina los null

  res.status(200).json(resultado);
});

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
