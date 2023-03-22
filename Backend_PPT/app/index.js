

import express from 'express';

const app = express();


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Permite solicitudes CORS desde cualquier dominio
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS'); // Métodos HTTP permitidos
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With'); // Encabezados permitidos
  res.header('Access-Control-Max-Age', '86400'); // Tiempo máximo de almacenamiento en caché de la respuesta preflight
  next();
});

// Configuración de middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Definición de rutas
app.get('/', (req, res) => {
  res.send('Ok');
});

const partidas = [];

app.post('/partidas', (req, res) => {
  const { nombreJugador, eleccionJugador, eleccionOponente, resultado } = req.body;

  // Agregar la partida al principio del array
  partidas.unshift({
    nombreJugador,
    eleccionJugador,
    eleccionOponente,
    resultado,
  });
  
  // Eliminar la última partida si hay más de 10 en el array
  if (partidas.length > 10) {
    partidas.pop();
  }
  console.log(partidas);
  res.json({ mensaje: 'Partida guardada con éxito' });
});

app.get('/historico', (req, res) => {
  res.json(partidas);
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal :(');
});

export default app;

