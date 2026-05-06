const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 1. Rota da API (Mantenha como está)
const horasRoute = require('./routes/calculadoraHoras');
app.use('/api', horasRoute);


// 2. O AJUSTE: Servir a pasta PUBLIC em vez de frontend
// Isso libera o acesso para /js/astronomy.js e todas as outras ferramentas
app.use(express.static(path.join(__dirname, '../public')));

// Se você tiver pastas específicas como esoterismo, o static acima já resolve,
// mas para garantir rotas limpas, você pode manter a lógica:
app.use('/esoterismo', express.static(path.join(__dirname, '../public/esoterismo')));

// 3. Rota Raiz (Ajustada para public)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// 2. O SEGREDO: Servir a pasta frontend de forma absoluta
// Isso garante que /calculadora-horas/calculadora.html seja encontrado
app.use('/calculadora-horas', express.static(path.join(__dirname, '../public/calculadora-horas')));
app.use(express.static(path.join(__dirname, '../public')));

// 3. Rota Raiz para o Menu
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));