// script.js - El Observador de la Adaptación

document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('input[type="number"]');
    const reflexionTexto = document.getElementById('evaluacion-clinica');

    // Escuchamos la danza de los datos
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            evaluarAdaptacion(input);
            calcularEquilibrio();
        });
    });

    function evaluarAdaptacion(campo) {
        const valor = parseFloat(campo.value);
        if (isNaN(valor)) return;

        let disonancia = false;

        // Umbrales de Adaptación (El objetivo oculto de seguridad)
        const umbrales = {
            ph: { min: 7.35, max: 7.45 },
            glucosa: { min: 45, max: 125 },
            lactato: { max: 2.0 },
            pco2: { max: 50 }
        };

        // Verificamos si el estímulo supera la respuesta del neonato
        if (umbrales[campo.id]) {
            const regla = umbrales[campo.id];
            if ((regla.min && valor < regla.min) || (regla.max && valor > regla.max)) {
                disonancia = true;
            }
        }

        // Refacción visual situacional
        if (disonancia) {
            campo.classList.add('alerta-activa');
            actualizarReflexion("Disonancia detectada: El modo adaptativo requiere sintonía clínica.");
        } else {
            campo.classList.remove('alerta-activa');
            actualizarReflexion("Sintonía recuperada. El sistema fluye en equilibrio.");
        }
    }

    function calcularEquilibrio() {
        const pNacer = parseFloat(document.getElementById('pesoNacer')?.value);
        const pActual = parseFloat(document.getElementById('pesoActual')?.value);
        const statusPeso = document.getElementById('status-peso');

        if (pNacer && pActual) {
            const perdida = ((pNacer - pActual) / pNacer) * 100;
            if (perdida > 10) {
                actualizarReflexion("Alerta de Roy: La arquitectura del sistema pierde su centro hídrico.");
                if(statusPeso) statusPeso.style.color = "#e74c3c";
            }
        }
    }

    function actualizarReflexion(mensaje) {
        if (reflexionTexto) {
            reflexionTexto.innerText = mensaje;
            reflexionTexto.style.color = mensaje.includes("Disonancia") || mensaje.includes("Alerta") ? "#e74c3c" : "#27ae60";
        }
    }
});
