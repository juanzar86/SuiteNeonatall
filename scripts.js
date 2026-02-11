document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selección de todos los campos numéricos para vigilancia
    const inputs = document.querySelectorAll('input[type="number"]');
    
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            validarAlertas(input);
            ejecutarCalculos();
        });
    });

    // 2. Lógica de Semaforización (Alertas visuales para enfermería)
    function validarAlertas(campo) {
        const valor = parseFloat(campo.value);
        if (isNaN(valor)) return;

        let critico = false;

        // Rangos de seguridad neonatal (Notificar si sale de estos parámetros)
        switch(campo.id) {
            case 'glucosa':
                // Hipoglucemia o Hiperglucemia neonatal
                if (valor < 45 || valor > 125) critico = true;
                break;
            case 'lactato':
                // Signo de mala perfusión tisular
                if (valor > 2.0) critico = true;
                break;
            case 'ph':
                // Acidosis o Alcalosis
                if (valor < 7.35 || valor > 7.45) critico = true;
                break;
            case 'pco2':
                // Hipercapnia (Riesgo ventilatorio)
                if (valor > 50) critico = true;
                break;
            case 'indice-it':
                // Sospecha de sepsis neonatal
                if (valor > 0.20) critico = true;
                break;
            case 'plaquetas':
                // Trombocitopenia
                if (valor < 150000) critico = true;
                break;
        }

        // Aplicación de alerta visual
        if (critico) {
            campo.style.border = '2px solid #e74c3c';
            campo.style.backgroundColor = '#fdf2f2';
        } else {
            campo.style.border = '';
            campo.style.backgroundColor = '';
        }
    }

    // 3. Cálculos Clínicos Automáticos
    function ejecutarCalculos() {
        // Cálculo de Pérdida de Peso Porcentual
        const pNacer = parseFloat(document.getElementById('pesoNacer')?.value);
        const pActual = parseFloat(document.getElementById('pesoActual')?.value);
        const displayPeso = document.getElementById('resultado-peso');
        
        if (pNacer && pActual && displayPeso) {
            const perdida = ((pNacer - pActual) / pNacer) * 100;
            displayPeso.innerText = `Pérdida: ${perdida.toFixed(1)}%`;
            
            // Alerta si la pérdida es desproporcionada (>10%)
            displayPeso.style.color = perdida > 10 ? '#e74c3c' : '#27ae60';
            displayPeso.style.fontWeight = 'bold';
        }
    }
});
