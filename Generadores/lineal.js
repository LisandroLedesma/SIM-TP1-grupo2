const btnSimL = document.getElementById("btnSimL");
const btnTestL = document.getElementById("btnTestL");

// Para el test
var nroRnd;

const metCongruencialLineal = (seed, c, a, m, n) => {
    let randArr = [];

    for (let i = 0; i < n; i++) {
        seed = (a * seed + c) % m;
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

const simularL = () => {
    const eGridDiv = document.querySelector("#myGridL");

    btnSimL.disabled = true;
    btnTestL.disabled = false;

    borrarTablaL();

    let a = document.getElementById("mcl-a").value;
    let c = document.getElementById("mcl-c").value;
    let m = document.getElementById("mcl-m").value;
    let n = document.getElementById("mcl-n").value;
    let seed = document.getElementById("mcl-seed").value;

    //Definir columnas
    let columnDefs = [
        { field: "n" },
        { field: "Semilla" },
        { field: "Numero" },
    ];

    // Validar inputs
    if (a === "" || c === "" || m === "" || n === "" || seed === "") {
        alert("Por favor, llene todos los campos");
        btnSimL.disabled = false;
        throw "Se deben llenar todos los campos";
    }

    if (a < 0 || c < 0 || m < 0 || n < 0 || seed < 0) {
        alert("Los valores deben ser positivos");
        btnSimL.disabled = false;
        throw "Los valores deben ser positivos";
    }

    if (isNaN(a) || isNaN(c) || isNaN(m) || isNaN(n) || isNaN(seed)) {
        alert("Todos los valores deben ser numeros");
        btnSimL.disabled = false;
        throw "Los valores deben ser numeros";
    }

    a = parseInt(a);
    c = parseInt(c);
    m = parseInt(m);
    n = parseInt(n);
    seed = parseInt(seed);

    let rowData = metCongruencialLineal(seed, c, a, m, n);
    nroRnd = rowData;

    // Matchea colunas y filas
    let gridOptions = {
        columnDefs: columnDefs,
        rowData: rowData,
    };

    new agGrid.Grid(eGridDiv, gridOptions);
};

const borrarTablaL = () => {
    const eGridDiv = document.querySelector("#myGridL");
    const testGridDiv = document.querySelector("#gridTestL");

    btnSimL.disabled = false;
    btnTestL.disabled = false;

    let child = eGridDiv.lastElementChild;
    while (child) {
        eGridDiv.removeChild(child);
        child = eGridDiv.lastElementChild;
    }

    let childT = testGridDiv.lastElementChild;
    while (childT) {
        testGridDiv.removeChild(childT);
        childT = testGridDiv.lastElementChild;
    }
};
