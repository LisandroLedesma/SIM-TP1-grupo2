const btnSimM = document.getElementById("btnSimM");
const btnTestM = document.getElementById("btnTestM");

// Para el test
var nroRnd;

const metCongruencialMultiplicativo = (seed, a, m, n) => {
    let randArr = [];

    for (let i = 0; i < n; i++) {
        seed = (a * seed) % m;
        let rnd = seed / m;

        let row = {
            n: i + 1,
            Semilla: seed,
            Numero: Number(rnd.toFixed(4)),
        };

        randArr.push(row);
    }

    return randArr;
};

const simularM = () => {
    const eGridDiv = document.querySelector("#myGridM");

    btnSimM.disabled = true;
    btnTestM.disabled = false;

    borrarTablaM();

    let a = document.getElementById("mm-a").value;
    let m = document.getElementById("mm-m").value;
    let n = document.getElementById("mm-n").value;
    let seed = document.getElementById("mm-semilla").value;

    //Definir columnas
    let columnDefs = [
        { field: "n" },
        { field: "Semilla" },
        { field: "Numero" },
    ];

    // Validar inputs
    if (a === "" || m === "" || n === "" || seed === "") {
        alert("Por favor, llene todos los campos");
        btnSimM.disabled = false;
    }

    if (a < 0 || m < 0 || n < 0 || seed < 0) {
        alert("Los valores deben ser positivos");
        btnSimM.disabled = false;
    }

    if (isNaN(a) || isNaN(m) || isNaN(n) || isNaN(seed)) {
        alert("Todos los valores deben ser numeros");
        btnSimL.disabled = false;
        throw "Los valores deben ser numeros";
    }

    a = parseInt(a);
    m = parseInt(m);
    n = parseInt(n);
    seed = parseInt(seed);

    let rowData = metCongruencialMultiplicativo(seed, a, m, n);
    nroRnd = rowData;

    // Matchea colunas y filas
    let gridOptions = {
        columnDefs: columnDefs,
        rowData: rowData,
    };

    new agGrid.Grid(eGridDiv, gridOptions);
};

const borrarTablaM = () => {
    const eGridDiv = document.querySelector("#myGridM");
    const testGridDivM = document.querySelector("#gridTestM");

    btnSimM.disabled = false;
    btnTestM.disabled = false;

    let child = eGridDiv.lastElementChild;
    while (child) {
        eGridDiv.removeChild(child);
        child = eGridDiv.lastElementChild;
    }

    let childT = testGridDivM.lastElementChild;
    while (childT) {
        testGridDivM.removeChild(childT);
        childT = testGridDivM.lastElementChild;
    }
};
