let colorSection = document.querySelector ('.colorsecbox');
let colorCodeSection = document.querySelector ('.codesecbox');
let paletteForm = document.getElementById ('paletteForm');
let palettes = [];
fetch ('./js/colors.json')
    .then (res => res.json ())
    .then (data => {
        palettes = data;
        renderRadios (palettes.length);
        initEvents ();
    })
    .catch (err => console.error ("Error cargando colors.json", err));
function renderRadios (count) {
    for (let i = 0; i < count; i++) {
        let id = `item${i + 1}`;
        let input = document.createElement ('input');
        input.type = 'radio';
        input.className = 'radiob';
        input.id = id;
        input.name = 'radiobox';
        let label = document.createElement ('label');
        label.setAttribute ('for', id);
        label.textContent = `Paleta ${i + 1}`;
        paletteForm.insertBefore (input, paletteForm.querySelector ('.formbutton'));
        paletteForm.insertBefore (label, paletteForm.querySelector ('.formbutton'));
        paletteForm.insertBefore (document.createElement ('br'), paletteForm.querySelector ('.formbutton'));
    }
}
function initEvents () {
    let radios = document.querySelectorAll ('input[type="radio"]');
    colorSection.style.display = "none";
    radios.forEach ((radio, i) => {
        radio.addEventListener ('click', () => {
            if (radio.checked) {
                colorCodeSection.classList.remove ('codesecboxoff');
                applyPalette (palettes [i]);
                colorSection.style.display = "flex";
            }
        });
    });
}
function applyPalette (colors) {
    // Pintar los 5 divs fijos en .colorsecbox
    let boxes = colorSection.querySelectorAll ('div');
    boxes.forEach ((box, idx) => {
        if  (colors [idx]) {
            box.style.backgroundColor = colors [idx];
        }
    });
    // Mostrar códigos HEX en la parte de abajo
    colorCodeSection.innerHTML = '';
    colors.forEach ((hex, idx) => {
        let codeDiv = document.createElement ('div');
        codeDiv.textContent = `Color ${idx + 1}: ${hex.toUpperCase ()}`;
        colorCodeSection.appendChild (codeDiv);
    });
}
