//metodo multiplicativo
const btnTestM = document.getElementById('btnTestMultiplicativo');
const button = document.getElementById('btnSimMultiplicativo');

// Para el test
var nroRnd;

function generar_semillas(a, semilla, m) {
    let prox_semilla = (a * semilla) % m;
    return prox_semilla
}

function generar_aleatorio_multiplicativo(a, semilla, m, cant_random) {
    let random = [];
    for (let i = 0; i < cant_random; i++) {
        semilla = generar_semillas(a, semilla, m);
        let rnd = semilla / m;
        let rnd_redondeado = rnd.toFixed(4);

        const valor_random = new ValorRandom(i + 1, semilla, rnd_redondeado);
        prox_semilla = semilla;

        let row = {
            "n": valor_random.n,
            "Semilla": valor_random.semilla,
            "Numero": valor_random.nro_random,
        }

        random.push(row);

    }

    return random
}



const borrarTablaM = () => {

    const eGridDiv = document.querySelector('#myGridMult');
    const testGridDivM = document.querySelector('#gridTestMultiplicativo');
    const graphicDivM = document.querySelector("#gd-mcm");

    button.disabled = false;
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
    let childGraphic = graphicDivM.lastElementChild;
    while (childGraphic) {
        graphicDivM.removeChild(childGraphic);
        childGraphic = graphicDivM.lastElementChild;
    }
}

const simularMultiplicativo = () => {

    const eGridDiv = document.querySelector('#myGridMult');

    button.disabled = true;


    // Definir columnas
    let columnDefs = [
        { field: "n" },
        { field: "Semilla" },
        { field: "Numero" },
    ];


    // Validar inputs
    let a = document.getElementById('mm-a').value;
    let m = document.getElementById('mm-m').value;
    let n = document.getElementById('mm-n').value;
    let semilla = document.getElementById('mm-semilla').value;

    //validacion para campos vacios
    if (a === '' || m === '' || n === '' || semilla === '') {
        alert('Por favor, llene todos los campos');
        button.disabled = false;
    }

    //validacion para campos negativos
    if (a < 0 || m < 0 || n < 0 || semilla < 0) {
        alert('Los valores deben ser positivos');
        button.disabled = false;
    }

    //validacion para semilla impar y primo
    //if (semilla % 2 == 0){
    //    alert('La semilla debe ser un numero impar y primo')
    //}

    // Definir filas
    let rowData = generar_aleatorio_multiplicativo(a, semilla, m, n);
    nroRnd = rowData;

    // Matchea colunas y filas
    let gridOptions = {
        columnDefs: columnDefs,
        rowData: rowData
    };


    new agGrid.Grid(eGridDiv, gridOptions);
}

class ValorRandom {
    constructor(n, semilla, nro_random) {
        this.n = n
        this.semilla = semilla
        this.nro_random = nro_random
    }
}