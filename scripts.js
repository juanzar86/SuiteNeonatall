// ARCHIVO: script.js
// Objetivo: Soporte en la toma de decisiones y alertas de seguridad neonatal

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Escuchar cambios en todos los campos numéricos
    const inputs = document.querySelectorAll('input[type="number"]');
    
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            validarAlertas(input);
            ejecutarCalculos();
        });
    });

    // 2. Función para semaforizar campos (Guía visual para enfermería)
    function validarAlertas(campo) {
        const valor = parseFloat(campo.value);
        if (isNaN(valor)) return;

        let critico = false;

        // Lógica de alertas basada en rangos de seguridad
        switch(campo.id) {
            case 'glucosa':
                if (valor < 45 || valor > 125) critico = true;
                break;
            case 'lactato':
                if (valor > 2.0) critico = true;
                break;
            case 'pH':
                if (valor < 7.35 || valor > 7.45) critico = true;
                break;
            case 'it-indice': // Índice I/T
                if (valor > 0.20) critico = true;
                break;
            case 'plaquetas':
                if (valor < 150000) critico = true;
                break;
        }

        // Aplicar estilo visual de advertencia
        if (critico) {
            campo.style.borderColor = '#e74c3c';
            campo.style.backgroundColor = '#fdf2f2';
        } else {
            campo.style.borderColor = '';
            campo.style.backgroundColor = '';
        }
    }

    // 3. Cálculos automáticos para reducir error humano
    function ejecutarCalculos() {
        // Cálculo de Pérdida de Peso Porcentual
        const pNacer = parseFloat(document.getElementById('pesoNacer')?.value);
        const pActual = parseFloat(document.getElementById('pesoActual')?.value);
        
        if (pNacer && pActual) {
            const perdida = ((pNacer - pActual) / pNacer) * 100;
            const alertaPeso = document.getElementById('alerta-peso');
            
            if (perdida > 10) {
                if (alertaPeso) alertaPeso.innerHTML = `⚠️ Pérdida del ${perdida.toFixed(1)}% - Notificar`;
            } else if (alertaPeso) {
                alertaPeso.innerHTML = '';
            }
        }
    }
});
