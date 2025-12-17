function changeStyle(event) {
    event.preventDefault();
    let element = document.querySelector(".changable");
    let form = event.target;
    
    if(form.padding.value) element.style.padding = form.padding.value;
    if(form.margin.value) element.style.margin = form.margin.value;
    if(form.border.value) element.style.border = form.border.value;
}
document.querySelector("form").addEventListener("submit", changeStyle);
function getRandomHexColor() {
    // Generar número aleatorio entre 0 y 16777215 (0xFFFFFF)
    const randomColor = Math.floor(Math.random() * 16777216);
    
    // Convertir a hexadecimal y agregar ceros a la izquierda si es necesario
    const hexColor = randomColor.toString(16).padStart(6, '0');
    
    return `#${hexColor}`;
}
function changeByClick(event) {
    event.preventDefault();
    event.stopPropagation();
    let element = event.target;
    let change = document.querySelector(".changable");
    // Verificar si ya está animando para evitar conflictos
    if(element.classList.contains('animating')) {
        return;
    }
    
    const className = element.classList[0];
    
    if(className === "margin-box") {
        animateProperty(change, 'margin');
    }
    if(className === "padding-box") {
        animateProperty(change, 'padding');
    }
    if(className === "border-box") {
        animateProperty(change, 'border');
    }
    if(className === "content-box") {
        let save = change.style.color;
        animateProperty(change, 'color',save);
    }
}

/**
 * Anima una propiedad CSS aumentándola y luego reduciéndola
 * @param {HTMLElement} element - Elemento a animar
 * @param {string} property - Propiedad a animar ('margin', 'padding', 'border')
 */
function animateProperty(element, property,original=undefined) {
    element.style = "border: 1px solid black; margin-left: 1em;";
    
    if(property === 'border') {
        original = element.style.borderWidth;
        element.style.borderWidth = '10px';

    }
    else if (property === 'color') {
        original = element.style.color;
        element.style.color = getRandomHexColor();
    }
    else {
        if(!original) original = element.style[property];
        element.style[property] = '50px';
    }
}
function flexboxProperties(containerSelector, propertiesSelector) {
    let flexboxProperties = ["flex-direction", "justify-content", "align-items", "flex-wrap", "order", "flex-grow", "flex-shrink", "flex-basis"];
    let container = document.querySelector(containerSelector);
    for(let property of flexboxProperties) {
        let div = document.createElement("div");
        div.style.margin="10px"
        let span = document.createElement("span");
        span.textContent = property;
        div.append(span);
        if(property == "flex-direction") {
            for(let direction of ["row", "row-reverse", "column", "column-reverse"]) {
                let button = document.createElement("button");
                button.textContent = direction;
                button.addEventListener("click", () => {
                    container.style[property] = direction;
                });
                div.append(button);
            }
        }
        if(property == "justify-content") {
            for(let direction of ["flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly"]) {
                let button = document.createElement("button");
                button.textContent = direction;
                button.addEventListener("click", () => {
                    container.style[property] = direction;
                });
                div.append(button);
            }
        }
        if(property == "align-items") {
            for(let direction of ["flex-start", "flex-end", "center", "baseline", "stretch"]) {
                let button = document.createElement("button");
                button.textContent = direction;
                button.addEventListener("click", () => {
                    container.style[property] = direction;
                });
                div.append(button);
            }
        }
        if(property == "flex-wrap") {
            for(let direction of ["nowrap", "wrap", "wrap-reverse"]) {
                let button = document.createElement("button");
                button.textContent = direction;
                button.addEventListener("click", () => {
                    container.style[property] = direction;
                });
                div.append(button);
            }
        }
        document.querySelector(propertiesSelector).append(div);

        
        
    }
}
flexboxProperties(".container-example", ".properties");
// Agregar event listeners
document.querySelectorAll('[class$="-box"]').forEach(box => {
    box.addEventListener("click", changeByClick);
});