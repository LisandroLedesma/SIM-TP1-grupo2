const button = document.getElementById('btnSim');
const buttonTest = document.getElementById('btnTest');


var nroRnd;

const borrarTabla = () => {

    const eGridDiv = document.querySelector('#myGrid');

    const testGridDiv = document.querySelector('#gridTestLineal');

    button.disabled = false;
    buttonTest.disabled = false;

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

const simular = () => {

    const eGridDiv = document.querySelector('#myGrid');

    button.disabled = true;


    // Definir columnas
    let columnDefs = [
        { field: "n" },
        { field: "Semilla" },
        { field: "Numero" },
    ];


    // Validar inputs


    // Definir filas
    let rowData = [];
    for (let i = 0; i < 50; i++) {
        // Cada row se va a instaciar con objetos que retornan de las simulaciones a mostrar en pantalla, esto es un placeholder para la demo


        let row = {
            "n": i,
            "Semilla": i,
            "Numero": Math.random().toFixed(4),
        }
        rowData.push(row)
    }

    nroRnd = rowData;


    // Matchea colunas y filas
    let gridOptions = {
        columnDefs: columnDefs,
        rowData: rowData
    };


    new agGrid.Grid(eGridDiv, gridOptions);
}