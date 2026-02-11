// script.js - El Observador de la Adaptación (Nightingale/Roy)

document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('input[type="number"]');
    const reflexionTexto = document.getElementById('evaluacion-clinica');

    // Escuchamos los cambios en los datos
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            evaluarAdaptacion(input);
        });
    });

    function evaluarAdaptacion(campo) {
        const valor = parseFloat(campo.value);
        if (isNaN(valor)) return;

        let disonancia = false;

        // Umbrales de Seguridad (Sintonía)
        const umbrales = {
            ph: { min: 7.35, max: 7.45 },
            glucosa: { min: 45, max: 125 },
            lactato: { max: 2.0 },
            pco2: { max: 50 }
        };

        // Verificación de Rangos
        if (umbrales[campo.id]) {
            const regla = umbrales[campo.id];
            if ((regla.min && valor < regla.min) || (regla.max && valor > regla.max)) {
                disonancia = true;
            }
        }

        // Respuesta visual y reflexiva
        if (disonancia) {
            campo.classList.add('alerta-activa');
            actualizarReflexion("Disonancia detectada: El modo adaptativo requiere sintonía clínica.");
        } else {
            campo.classList.remove('alerta-activa');
            actualizarReflexion("Sintonía recuperada. El sistema fluye en equilibrio.");
        }
    }

    function actualizarReflexion(mensaje) {
        if (reflexionTexto) {
            reflexionTexto.innerText = mensaje;
            reflexionTexto.style.color = mensaje.includes("Disonancia") ? "#e74c3c" : "#27ae60";
        }
    }
});
