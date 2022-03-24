import metCongruencialMixto from "./Generadores/lineal.js"

window.metCongruencialMixto = metCongruencialMixto;

const button = document.getElementById('btnSim');
const btnSimMCL = document.getElementById('btnSimMCL');
const btnSimMCLDelete = document.getElementById('btnSimMCL');

const simularMCL = () => {

    let rowData = [];
    btnSimMCL.disabled = true;

    borrarTabla();

    // TODO: Cambiar el ID del grid
    const eGridDiv = document.querySelector('#myGrid');
    let a = document.getElementById('mcl-a').value;
    let c = document.getElementById('mcl-c').value;
    let m = document.getElementById('mcl-m').value;
    let n = document.getElementById('mcl-n').value;
    let seed = document.getElementById('mcl-seed').value;
    // const from = document.getElementById('mcl-from').value;
    // const to = document.getElementById('mcl-to').value;

    // Definir columnas
    let columnDefs = [
        { field: "n" },
        { field: "Semilla" },
        { field: "Número" },
    ];

    // Validar inputs
    // TODO: Mejorar esto ya que no aplica el patron DRY
    if (a === '' || c === '' || m === '' || n === '' || seed === '') {
        alert('Por favor, llene todos los campos');
        btnSimMCL.disabled = false;
        throw "Se deben llenar todos los campos";
    }
    if (a < 0 || c < 0 || m < 0 || n < 0 || seed < 0) {
        alert('Los valores deben ser positivos');
        btnSimMCL.disabled = false;
        throw "Los valores deben ser positivos";
    }
    // validar si los inputs no son numeros
    if (isNaN(a) || isNaN(c) || isNaN(m) || isNaN(n) || isNaN(seed)) {
        alert('Todos los valores deben ser numeros');
        btnSimMCL.disabled = false;
        throw "Los valores deben ser numeros";
    }

    a = parseInt(a);
    c = parseInt(c);
    m = parseInt(m);
    n = parseInt(n);
    seed = parseInt(seed);

    try {
        // TODO: Agregar from y to
        btnSimMCL.disabled = false;
        rowData = metCongruencialMixto(seed, c, a, m, n);
    }
    catch (e) {
        alert(e);
        throw "Error";
    }

    // let rowData = lineal();

    // Matchea colunas y filas
    let gridOptions = {
        columnDefs: columnDefs,
        rowData: rowData
    };


    new agGrid.Grid(eGridDiv, gridOptions);
}


// Deberíamos crear un "borrarTablaXX" para cada tipo de simulación?? O con uno eliminamos todas las tablas posibles?
const borrarTabla = () => {

    const eGridDiv = document.querySelector('#myGrid');

    button.disabled = false;
    btnSimMCL.disabled = false;

    let child = eGridDiv.lastElementChild;
    while (child) {
        eGridDiv.removeChild(child);
        child = eGridDiv.lastElementChild;
    }
}

const simular = () => {

    const eGridDiv = document.querySelector('#myGrid');

    button.disabled = true;


    // Definir columnas
    let columnDefs = [
        { field: "n" },
        { field: "Semilla" },
        { field: "Número" },
    ];


    // Validar inputs


    // Definir filas
    let rowData = [];
    for (let i = 0; i < 10000; i++) {
        // Cada row se va a instaciar con objetos que retornan de las simulaciones a mostrar en pantalla, esto es un placeholder para la demo


        let row = {
            "n": i,
            "Semilla": i,
            "Número": i,
        }
        rowData.push(row)
    }

    // let rowData = lineal();

    // Matchea colunas y filas
    let gridOptions = {
        columnDefs: columnDefs,
        rowData: rowData
    };


    new agGrid.Grid(eGridDiv, gridOptions);
}

document.getElementById('btnSimMCL').addEventListener('click', simularMCL);
document.getElementById('btnSimMCLDelete').addEventListener('click', borrarTabla);