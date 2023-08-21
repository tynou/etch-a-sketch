const grid = document.querySelector(".grid");
const colorPicker = document.querySelector(".color-picker");
const clearBtn = document.querySelector(".clear-btn");
const modeBtns = document.querySelectorAll("#mode");
const sizeSlider = document.querySelector(".size-slider");
const colorLabel = document.querySelector(".color-label");
const sizeLabel = document.querySelector(".size-label");

let cells = 16;
let down = false;
let color = "#000000";
let mode = "color";

sizeSlider.value = cells;

document.body.onmouseup = (e) => {
    down = false;
};

modeBtns.forEach((btn) => {
    btn.onmousedown = (e) => {
        setMode(btn.className);
    };
});

colorPicker.oninput = (e) => {
    color = e.target.value;
    setColor(e.target.value);
};
clearBtn.onmousedown = (e) => {
    updateGrid();
}
sizeSlider.onmousemove = (e) => {
    setCells(e.target.value);
}
sizeSlider.onchange = (e) => {
    setCells(e.target.value);
    updateGrid();
}

const randomColor = () => {
    const choices = "0123456789abcdef";
    let result = "#";
    for (let i = 0; i < 6; i++) {
        result += choices[Math.floor(Math.random() * choices.length)]
    };
    return result;
}

const setColor = (newColor) => {
    color = newColor;
    colorLabel.innerHTML = color;
}

const setMode = (newMode) => {
    modeBtns.forEach((btn) => {
        if (btn.className === newMode) btn.classList.add("active"); else btn.classList.remove("active");
    })

    mode = newMode;
}

const setCells = (newCells) => {
    cells = newCells;
    sizeLabel.innerHTML = `${cells}x${cells}`;
}

const updateGrid = () => {
    grid.style["grid-template-columns"] = `repeat(${cells}, 1fr)`;
    grid.style["grid-template-rows"] = `repeat(${cells}, 1fr)`;

    grid.innerHTML = ""

    for (let i = 0; i < cells**2; i++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        grid.appendChild(cell);

        cell.onmousedown = (e) => {
            down = true;
            colorCell(e.target);
        };
        cell.onmouseover = (e) => {
            if (!down) return;
            colorCell(e.target);
        };
    }
}

const colorCell = (cell) => {
    if (mode === "eraser") {
        cell.removeAttribute("style");
        return;
    }
    cell.style["background-color"] = mode === "color" ? color : randomColor();
}

updateGrid();
setMode("color");
setColor(color);