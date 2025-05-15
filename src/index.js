const express = require('express');
const _ = require('lodash');
const clientes = require('./data/clientes.json');
const validarDireccion  = require('./reglas/reglas-direcciones');
const app = express();
const PORT = process.env.PORT || 3001;



app.use(express.json());


app.get('/direcciones', (req, res) => {
  const resultado = clientes
  res.status(200).json(resultado);
});


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


app.post('/direccion-nueva', (req, res) => {
    const datosDireccion = req.body;
    

    const ids = clientes.map((c) => c.id);
    const idMax = _.max(ids) + 1;

    // Combina id con los campos recibidos, sin anidar
    const cliente = { id:idMax, ...datosDireccion };

    clientes.push(cliente);

    res.status(201).json({
        message: `El cliente ${cliente.id} se creó con éxito.`
    });
});

app.delete('/direcciones/:clienteId', (req, res) => {

      const idCliente = req.params.clienteId;
      const clienteIdx = clientes.findIndex((c)=>c.id == idCliente);
    if(clienteIdx >= 0){
        clientes.splice(clienteIdx, 1);
        res.status(200).json({
            message:`El curso ${idCliente} se borro correctamente.`,
        });
    } else
    res.status(404).json({
        message:`El curso ${idCliente} no se encuentra.`,
    });
});



    

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
