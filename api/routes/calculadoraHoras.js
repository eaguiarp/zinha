const express = require('express');
const router = express.Router();

router.post('/calcular-hora-extra', (req, res) => {
    const { salarioBruto, horasMensais, horasExtras, porcentagem } = req.body;

    const salario = parseFloat(salarioBruto);
    const mensal = parseInt(horasMensais);
    const extras = parseFloat(horasExtras);
    const pct = parseFloat(porcentagem);

    // Cálculo da hora comum
    const valorHoraComum = salario / mensal;
    
    // Cálculo da hora extra (Valor comum + adicional %)
    const valorHoraExtra = valorHoraComum * (1 + pct / 100);
    
    // Total
    const totalReceber = valorHoraExtra * extras;

    res.json({
        valorHoraComum: valorHoraComum.toFixed(2),
        valorHoraExtra: valorHoraExtra.toFixed(2),
        totalReceber: totalReceber.toFixed(2)
    });
});

module.exports = router;