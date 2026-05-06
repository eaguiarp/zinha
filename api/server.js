const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 1. Rota da API (Backend)
const horasRoute = require('./routes/calculadoraHoras');
app.use('/api', horasRoute);

// 2. A CHAVE MESTRA: Servir a pasta PUBLIC como raiz de tudo
// Isso já resolve automaticamente /js/, /esoterismo/, /financas/, etc.
app.use(express.static(path.join(__dirname, '../public')));

// 3. Rota Raiz para carregar o index principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// 4. Fallback (Opcional): Se o usuário digitar uma rota que não existe, 
// ele tenta procurar dentro de public (ajuda em subpastas)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));