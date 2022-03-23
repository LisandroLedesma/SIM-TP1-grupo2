const button = document.getElementById('btnSimMultiplicativo');


const borrarTabla = () => {

    const eGridDiv = document.querySelector('#myGrid');

    button.disabled = false;

    let child = eGridDiv.lastElementChild;
    while (child) {
        eGridDiv.removeChild(child);
        child = eGridDiv.lastElementChild;
    }
}

const simularMultiplicativo = () => {

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
    //let rowData = [];
    let rowData = generar_aleatorio_multiplicativo(13, 6, 8, 10000);
    for (let i = 0; i < 10000; i++) {
        // Cada row se va a instaciar con objetos que retornan de las simulaciones a mostrar en pantalla, esto es un placeholder para la demo


        let row = {
            "n": rowData.n,
            "Semilla": rowData.semilla,
            "Número": rowData.Número,
        }
        rowData.push(row)
    }

    //let rowData = generar_aleatorio_multiplicativo();

    // Matchea colunas y filas
    let gridOptions = {
        columnDefs: columnDefs,
        rowData: rowData
    };


    new agGrid.Grid(eGridDiv, gridOptions);
}