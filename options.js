
const activeCellElement = document.getElementById("active-cell");
const textAlignElements = document.getElementsByClassName("text-align");
const boldButton = document.getElementById("bold");
const italicButton = document.getElementById("italic");
const underlineButton = document.getElementById("underline");
let activeCell = null;

let defaultFontStyle = "Times New Roman";
let defaultFontSize = "14px";

let activeOptionsState;
function toggleButtonStyle(button, isSelected) {
    if (isSelected) {
        button.classList.add("active-option");
    } else {
        button.classList.remove("active-option");
    }
}
function highlightOptionButtonOnFocus() {
    // if (activeOptionsState.isBoldSelected && !boldButton.classList.contains("active-option")) {
    //     boldButton.classList.add("active-option");
    // } else {
    //     boldButton.classList.remove("active-option");
    // }
    toggleButtonStyle(boldButton, activeOptionsState.isBoldSelected);
    // if (activeOptionsState.isItalicSelected) {
    //     italicButton.classList.add("active-option");
    // } else {
    //     italicButton.classList.remove("active-option");
    // }

    toggleButtonStyle(italicButton, activeOptionsState.isItalicSelected);

    // if (activeOptionsState.isUnderLineSelected) {
    //     underlineButton.classList.add("active-option");
    // } else {
    //     underlineButton.classList.remove("active-option");
    // }
    toggleButtonStyle(underlineButton, activeOptionsState.isUnderLineSelected);

    highlightTextAlignButtons(activeOptionsState.textAlign);
}

function onCellFocus(e) {
    if (activeCell && activeCell.id === e.target.id) {
        return;
    }
    activeCell = e.target;
    activeCellElement.innerHTML = e.target.id;

    const computedStyle = getComputedStyle(activeCell);

    activeOptionsState = {
        fontFamily: computedStyle.fontFamily,
        isBoldSelected: computedStyle.fontWeight === "600",
        isItalicSelected: computedStyle.fontStyle === "italic",
        isUnderLineSelected: computedStyle.textDecoration.includes("underline"),
        textAlign: computedStyle.textAlign,
        textColor: computedStyle.color,
        backgroundColor: computedStyle.backgroundColor,
        fontSize: computedStyle.fontSize,
    };
    highlightOptionButtonOnFocus();
}

function onClickBold(boldButton) {
    //toggle is used if this class name is not there its add it
    // or it is there it will remove it
    boldButton.classList.toggle("active-option");
    if (activeCell) {
        if (activeOptionsState.isBoldSelected === false) {
            activeCell.style.fontWeight = "600";
            // activeOptionsState.isBoldSelected = true;
        } else {
            activeCell.style.fontWeight = "400";
            // activeOptionsState.isBoldSelected = false;
        }
        activeOptionsState.isBoldSelected = !activeOptionsState.isBoldSelected;
    }
}

function onClickItalic(italicButton) {
    italicButton.classList.toggle("active-option");
    if (activeCell) {
        if (activeOptionsState.isItalicSelected === false) {
            activeCell.style.fontStyle = "italic";
            // activeOptionsState.isItalicSelected = true;
        }
        else {
            activeCell.style.fontStyle = "normal";
            // activeOptionsState.isItalicSelected = false;
        }
        activeOptionsState.isItalicSelected = !activeOptionsState.isItalicSelected;
    }

}

function onClickUnderlined(underlinedButton) {
    underlinedButton.classList.toggle("active-option");
    if (activeCell) {
        if (activeOptionsState.isUnderLineSelected) {
            activeCell.style.textDecoration = "none";
        } else {
            activeCell.style.textDecoration = "underline";
        }
        activeOptionsState.isUnderLineSelected = !activeOptionsState.isUnderLineSelected;
    }
}

function highlightTextAlignButtons(textAlignValue) {
    for (let i = 0; i < textAlignElements.length; i++) {
        if (textAlignElements[i].getAttribute("data-value") === textAlignValue) {
            textAlignElements[i].classList.add("active-option");
        } else {
            textAlignElements[i].classList.remove("active-option");

        }
    }

}


function onClickTextAlign(textAlingButton) {
    let selectedValue = textAlingButton.getAttribute("data-value");
    highlightTextAlignButtons(selectedValue);

    if (activeCell) {
        activeCell.style.textAlign = selectedValue;
        activeOptionsState.textAlign = selectedValue;
    }
}

function onChangeTextColor(textColorInput) {
    let selectedColor = textColorInput.value;
    if (activeCell) {
        activeCell.style.color = selectedColor;
        activeOptionsState.color = selectedColor;
    }
}

function onChangeBackgroundColor(textColorInput) {
    let selectedColor = textColorInput.value;
    if (activeCell) {
        activeCell.style.backgroundColor = selectedColor;
        activeOptionsState.backgroundColor = selectedColor;
    }
}


// function onChangeFontSize(fontSizeInput) {
//     let selectedSize = fontSizeInput.value;
//     if (activeCell) {
//         activeCell.style.fontSize = selectedSize;
//         activeOptionsState.fontSize = selectedSize;
//     }
// }

function applyFontStyleAndSize(cell, fontStyle, fontSize) {
    cell.style.fontFamily = fontStyle;
    cell.style.fontSize = fontSize;
}

function onChangeFontSize(fontSizeInput) {
    let selectedFontSize = fontSizeInput.value;
    if (activeCell) {
        applyFontStyleAndSize(activeCell, activeOptionsState.fontFamily, selectedFontSize);
        activeOptionsState.fontSize = selectedFontSize;
    }
}

function loadGoogleFonts(fontName, fontStyle) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css?family=${fontName.replace(
        /\s+/g,
        "+"
    )}:${fontStyle}`;
    document.head.appendChild(link);
}

function onChangeFontStyle(fontDropdown) {
    const selectedFont = fontDropdown.value;


    if (activeCell) {
        activeCell.style.fontFamily = selectedFont;
        activeOptionsState.fontFamily = selectedFont;

        // Load the selected Google Font dynamically with a default font style of "regular"
        loadGoogleFonts(selectedFont, "regular");
    }
}

document.getElementById("font-size").addEventListener("change", function () {
    onChangeFontSize(this);
});