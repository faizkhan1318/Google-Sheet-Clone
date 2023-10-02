const header = document.getElementById("header");
const body = document.getElementById("body");



let bold = document.createElement("b");
bold.className = "header-col";
bold.innerText = "S.No";
header.appendChild(bold);

for (let i = 65; i <= 90; i++) {

    let bold = document.createElement("b");
    bold.innerText = String.fromCharCode(i);
    header.appendChild(bold);
}
{/* <div class="row">
            <b></b> //64
            <div></div> //65
            <div></div> //66
            <div></div>
            <div></div>
        </div> */}
function createAndAppendRow(rowNumber) {
    const row = document.createElement("div");
    row.className = "row";

    //inside each roe we have to create 27 cell  
    for (let i = 64; i <= 90; i++) {
        if (i === 64) {

            const b = document.createElement("b");
            b.innerText = rowNumber;
            row.appendChild(b);

        } else {
            const cell = document.createElement("div");
            cell.id = `${String.fromCharCode(i)}${rowNumber}`;
            cell.contentEditable = "true";
            cell.addEventListener("focus",onCellFocus);
            row.appendChild(cell);
        }
    }

    body.appendChild(row);
}

for (let i = 1; i <= 100; i++) {
    createAndAppendRow(i);
}


