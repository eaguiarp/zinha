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
//    Regra: se a URL não tem extensão (não é .js, .css, .png...)
//    tenta servir o index.html da subpasta correspondente.
//    Ex: /esoterismo/mapa/ → public/esoterismo/mapa/index.html
//        /financas/        → public/financas/index.html
//        /qualquer-rota/   → public/index.html (raiz, fallback final)
app.get('*', (req, res) => {
    const urlPath = req.path;

    // Se tem extensão de arquivo (ex: .js, .css, .png), retorna 404 direto
    // para não esconder erros de asset não encontrado
    if (/\.[a-zA-Z0-9]+$/.test(urlPath)) {
        return res.status(404).send('Arquivo não encontrado.');
    }

    // Monta o caminho esperado: tenta public/<rota>/index.html
    const subIndex = path.join(__dirname, '../public', urlPath, 'index.html');

    if (fs.existsSync(subIndex)) {
        // Existe um index.html nessa subpasta → serve ele
        return res.sendFile(subIndex);
    }

    // Fallback final: serve o index.html raiz
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));