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
    const container = document.querySelector(containerSelector);
    const propertiesContainer = document.querySelector(propertiesSelector);
    
    const flexboxConfig = {
        "flex-direction": ["row", "row-reverse", "column", "column-reverse"],
        "justify-content": ["flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly"],
        "align-items": ["flex-start", "flex-end", "center", "baseline", "stretch"],
        "gap" : ["0px", "10px", "50px","100px"]
    };
    const visibility = document.querySelector("#container-example");
    for (let [property, values] of Object.entries(flexboxConfig)) {
        const propertyDiv = createPropertyControl(property, values, container,visibility);
        propertiesContainer.append(propertyDiv);
    }
}

function createPropertyControl(property, values, container,codeDisplay) {
    const div = document.createElement("div");
    div.style.margin = "5px";
    
    const span = document.createElement("span");
    span.textContent = property;
    div.append(span);
    
    values.forEach(value => {
        const button = createButton(value, () => {
            container.style[property] = value;
            updateCodeDisplay(codeDisplay, property, value);
        });
        div.append(button);
    });
    
    return div;
}

function createButton(text, onClick) {
    const button = document.createElement("button");
    button.textContent = text;
    button.addEventListener("click", onClick);
    return button;
}
/**
 * Updates the CSS code display with the new property value
 * @param {HTMLElement} codeElement - The <code> element to update
 * @param {string} property - The CSS property to update
 * @param {string} value - The new value for the property
 */
function updateCodeDisplay(codeElement, property, value) {
    // Convert camelCase to kebab-case (e.g., flexDirection -> flex-direction)
    const cssProperty = property.replace(/([A-Z])/g, '-$1').toLowerCase();
    
    // Escape special characters in the property name for use in regex
    const escapedProperty = cssProperty.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    
    // Remove existing highlights from previous updates
    codeElement.innerHTML = codeElement.innerHTML.replace(
        /<span class="highlight">([^<]*)<\/span>/g,
        '$1'
    );
    
    // Create regex pattern to find the property and its value
    const regex = new RegExp(
        `(<span class="hljs-attribute">${escapedProperty}</span>\\s*:\\s*)` +
        `([^;\\n<]*(?:<span[^>]*>[^<]*<\\/span>[^;\\n<]*)*)` +
        `(;?)`,
        'gi'
    );
    
    // Replace the matched pattern with the new value and add highlight
    codeElement.innerHTML = codeElement.innerHTML.replace(
        regex,
        `$1<span class="highlight">${value}</span>$3`
    );
}

flexboxProperties(".container-example", ".properties");

// Agregar event listeners
document.querySelectorAll('[class$="-box"]').forEach(box => {
    box.addEventListener("click", changeByClick);
});