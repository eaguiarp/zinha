const express = require('express');
const path    = require('path');
const cors    = require('cors');
const fs      = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// 1. Rotas da API (Backend)
const horasRoute = require('./routes/calculadoraHoras');
app.use('/api', horasRoute);

// 2. Servir a pasta PUBLIC como raiz estática
//    Já resolve /js/astronomy.js, /img/, /favicon.png, etc.
app.use(express.static(path.join(__dirname, '../public')));

// 3. Fallback inteligente para SPA com subpastas
app.use((req, res, next) => {
    if (req.method !== 'GET') return next();
    const urlPath = req.path.slice(1);
    
    if (/\.[a-zA-Z0-9]+$/.test(urlPath)) {
        return res.status(404).send('Arquivo não encontrado.');
    }

    const subIndex = path.join(__dirname, '../public', urlPath, 'index.html');

    if (fs.existsSync(subIndex)) {
        return res.sendFile(subIndex);
    }

    res.sendFile(path.join(__dirname, '../public/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));