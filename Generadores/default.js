const btnSimD = document.getElementById("btnSimD");
const btnTestD = document.getElementById("btnTestD");

// Para el test
var nroRnd;

const metDefault = (n) => {
    let randArr = [];

    for (let i = 0; i < n; i++) {
        let row = {
            n: i + 1,
            Numero: Number(Math.random().toFixed(4)),
        };
        randArr.push(row);
    }

    return randArr;
};

const simularD = () => {
    const eGridDiv = document.querySelector("#myGridD");

    btnSimD.disabled = true;
    btnTestD.disabled = false;

    borrarTablaD();

    let n = document.getElementById("d-n").value;

    // Definir columnas
    let columnDefs = [{ field: "n" }, { field: "Numero" }];

    // Validar inputs
    if (n === "") {
        alert("Por favor, llene todos los campos");
        btnSimD.disabled = false;
        throw "Se deben llenar todos los campos";
    }

    if (n < 0) {
        alert("Los valores deben ser positivos");
        btnSimD.disabled = false;
        throw "Los valores deben ser positivos";
    }

    if (isNaN(n)) {
        alert("Todos los valores deben ser numeros");
        btnSimD.disabled = false;
        throw "Los valores deben ser numeros";
    }

    n = parseInt(n);

    let rowData = metDefault(n);
    nroRnd = rowData;

    // Matchea colunas y filas
    let gridOptions = {
        columnDefs: columnDefs,
        rowData: rowData,
    };

    new agGrid.Grid(eGridDiv, gridOptions);
};

const borrarTablaD = () => {
    const eGridDivD = document.querySelector("#myGridD");
    const testGridDivD = document.querySelector("#gridTestD");

    btnSimD.disabled = false;
    btnTestD.disabled = false;

    let child = eGridDivD.lastElementChild;
    while (child) {
        eGridDivD.removeChild(child);
        child = eGridDivD.lastElementChild;
    }

    let childT = testGridDivD.lastElementChild;
    while (childT) {
        testGridDivD.removeChild(childT);
        childT = testGridDivD.lastElementChild;
    }
};
