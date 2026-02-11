document.addEventListener('input', () => {
    const ph = parseFloat(document.getElementById('ph').value);
    const res = document.getElementById('resultado');

    if (isNaN(ph)) {
        res.innerText = "---";
        res.className = "";
    } else if (ph < 7.35 || ph > 7.45) {
        res.innerText = "PH FUERA DE RANGO";
        res.className = "alerta";
    } else {
        res.innerText = "PH NORMAL";
        res.className = "normal";
    }
});
