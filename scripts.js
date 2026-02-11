// Suite Neonatal - Lógica de Seguridad Clínica
document.addEventListener('DOMContentLoaded', () => {
    
    // Seleccionamos todos los inputs para monitoreo constante
    const inputs = document.querySelectorAll('input[type="number"]');
    
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            validarLimites(input);
            realizarCalculosClinicos();
        });
    });

    function validarLimites(campo) {
        const valor = parseFloat(campo.value);
        if (isNaN(valor)) return;

        // Definición de umbrales críticos para alertas de enfermería
        const criticos = {
            'glucosa': { min: 45, max: 125 },
            'lactato': { max: 2.0 },
            'pH': { min: 7.35, max: 7.45 },
            'pCO2': { max: 50 },
            'plaquetas': { min: 150000 }
        };

        let esAlarma = false;

        // Validación lógica
        if (campo.id === 'glucosa' && (valor < criticos.glucosa.min || valor > criticos.glucosa.max)) esAlarma = true;
        if (campo.id === 'lactato' && valor > criticos.lactato.max) esAlarma = true;
        if (campo.id === 'ph' && (valor < criticos.pH.min || valor > criticos.pH.max)) esAlarma = true;
        if (campo.id === 'plaquetas' && valor < criticos.plaquetas.min) esAlarma = true;

        // Respuesta visual inmediata
        if (esAlarma) {
            campo.classList.add('input-error'); // Esta clase está en tu CSS
        } else {
            campo.classList.remove('input-error');
        }
    }

    function realizarCalculosClinicos() {
        // 1. Cálculo de Índice I/T para Sepsis
        const inmaduros = parseFloat(document.getElementById('neutrosInmaduros')?.value);
        const totales = parseFloat(document.getElementById('neutrosTotales')?.value);
        const itDisplay = document.getElementById('resultadoIT');

        if (inmaduros && totales && totales > 0) {
            const it = inmaduros / totales;
            if (itDisplay) {
                itDisplay.innerText = it.toFixed(2);
                itDisplay.style.color = it > 0.22 ? '#e74c3c' : '#27ae60';
            }
        }

        // 2. Cálculo de Pérdida de Peso (Vigilancia de Hidratación)
        const pNacer = parseFloat(document.getElementById('pesoNacer')?.value);
        const pActual = parseFloat(document.getElementById('pesoActual')?.value);
        
        if (pNacer && pActual) {
            const diff = ((pNacer - pActual) / pNacer) * 100;
            if (diff > 10) {
                // Alerta visual de deshidratación
                document.getElementById('pesoActual').style.border = '2px solid #e74c3c';
            }
        }
    }
});
