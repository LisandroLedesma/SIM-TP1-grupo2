const btnSimD = document.getElementById('btnSimD');
const btnTestD = document.getElementById('btnTestD');

// Para el test
var nroRnd;

const simularD = () => {

    let rowData = [];
    btnSimD.disabled = true;
    btnTestD.disabled = false;

    borrarTablaD();

    // TODO: Cambiar el ID del grid
    const eGridDivD = document.querySelector('#myGridD');
    let n = document.getElementById('d-n').value;

    // Definir columnas
    let columnDefs = [
        { field: "n" },
        { field: "Numero" },
    ];

    // Validar inputs
    // TODO: Mejorar esto ya que no aplica el patron DRY
    if (n === '') {
        alert('Por favor, llene todos los campos');
        btnSimD.disabled = false;
        throw "Se deben llenar todos los campos";
    }
    if (n < 0) {
        alert('Los valores deben ser positivos');
        btnSimD.disabled = false;
        throw "Los valores deben ser positivos";
    }
    // validar si los inputs no son numeros
    if (isNaN(n)) {
        alert('Todos los valores deben ser numeros');
        btnSimD.disabled = false;
        throw "Los valores deben ser numeros";
    }

    n = parseInt(n);

    try {

        btnSimD.disabled = false;
        for (let i = 0; i < n; i++) {


            let row = {
                "n": i,
                "Numero": Math.random().toFixed(4),
            }
            rowData.push(row)
        }

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


    new agGrid.Grid(eGridDivD, gridOptions);
}

const borrarTablaD = () => {

    const eGridDivD = document.querySelector('#myGridD');
    const testGridDivD = document.querySelector('#gridTestD');
    const graphicDivD = document.querySelector("#gd-def");

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

    let childGraphic = graphicDivD.lastElementChild;
    while (childGraphic) {
        graphicDivD.removeChild(childGraphic);
        childGraphic = graphicDivD.lastElementChild;
    }
}