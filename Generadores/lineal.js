const btnSimMCL = document.getElementById('btnSimMCL');
const btnTest = document.getElementById('btnTestLineal');

// Para el test
var nroRnd;


const metCongruencialMixto = (seed, c, a, m, n, from, to) => {

    let xi = seed;
    let randArr = [];
    let row = {};
    let rnd = 0;

    if (from > n || to > n) throw "n must be greater";

    for (let i = 0; i < n; i++) {
        xi = (a * xi + c) % m;
        rnd = xi / m;

        row.Semilla = xi;
        row['Numero'] = Number(rnd.toFixed(4));
        row.n = i + 1;
        randArr.push(row);
        row = {};
    }

    if (typeof from !== 'undefined') {
        if (from > to) throw "Error"
        else {
            let newArr = randArr.splice(from - 1, to);
            return newArr;
        }
    }

    return randArr;
}

const simularMCL = () => {

    let rowData = [];
    btnSimMCL.disabled = true;
    btnTest.disabled = false;

    borrarTabla();

    // TODO: Cambiar el ID del grid
    const eGridDiv = document.querySelector('#gridLineal');
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
        { field: "Numero" },
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
        nroRnd = rowData;

    } catch (e) {
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

    const eGridDiv = document.querySelector('#gridLineal');
    const testGridDiv = document.querySelector('#gridTestLineal');


    btnSimMCL.disabled = false;
    btnTest.disabled = false;


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
}