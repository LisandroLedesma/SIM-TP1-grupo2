const button = document.getElementById('btnSim');


const borrarTabla = () => {

    const eGridDiv = document.querySelector('#myGrid');

    button.disabled = false;

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