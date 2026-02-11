document.addEventListener('change', function() {
    // 1. LÓGICA PARA APGAR Y SILVERMAN (Suma simple)
    const contenedor = document.getElementById('modulo-calculo');
    const displayResultado = document.getElementById('resultado');

    if (contenedor && displayResultado) {
        let total = 0;
        const seleccionados = contenedor.querySelectorAll('input[type="radio"]:checked');
        
        seleccionados.forEach(radio => {
            total += parseInt(radio.value);
        });

        displayResultado.innerText = total;

        // Cambiar color según el puntaje (Opcional)
        if (total >= 7) displayResultado.style.color = "#2ed573"; // Verde
        else if (total >= 4) displayResultado.style.color = "#ffa502"; // Naranja
        else displayResultado.style.color = "#ff4757"; // Rojo
    }

    // 2. LÓGICA ESPECÍFICA PARA CAPURRO
    const displaySemanas = document.getElementById('resultado-semanas');
    const displayDiasText = document.getElementById('resultado-dias');

    if (displaySemanas) {
        let puntajeCapurro = 0;
        const radiosCapurro = document.querySelectorAll('input[type="radio"]:checked');
        
        radiosCapurro.forEach(radio => {
            puntajeCapurro += parseInt(radio.value);
        });

        // CONSTANTE DE CAPURRO: 204
        let diasTotales = 204 + puntajeCapurro;
        let semanas = Math.floor(diasTotales / 7);
        let diasRestantes = diasTotales % 7;

        displaySemanas.innerText = semanas;
        displayDiasText.innerText = `(+ ${diasRestantes} días) | Total: ${diasTotales} días`;
    }
});

// 3. BUSCADOR UNIVERSAL (Para el Index y Recursos)
const buscador = document.getElementById('search-extra') || document.getElementById('busqueda-lab');
if (buscador) {
    buscador.addEventListener('keyup', function() {
        let filtro = this.value.toLowerCase();
        let bloques = document.querySelectorAll('.bloque-recurso, .card');
        
        bloques.forEach(bloque => {
            let texto = bloque.innerText.toLowerCase();
            bloque.style.display = texto.includes(filtro) ? '' : 'none';
        });
    });
}
