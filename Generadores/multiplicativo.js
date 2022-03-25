//metodo multiplicativo
function generar_semillas(a, semilla, m){
    let prox_semilla = (a * semilla) % m;
    return prox_semilla
}

function generar_aleatorio_multiplicativo(a, semilla, m, cant_random){
    let random = [];
    for (let i = 0; i < cant_random; i++) {
        semilla = generar_semillas(a, semilla, m);
        //console.log(semilla)
        let rnd = semilla / (m-1);
        let rnd_redondeado = rnd.toFixed(4)
        //console.log(rnd_redondeado);
        
        const valor_random = new ValorRandom(i, semilla, rnd_redondeado);
        random.push(valor_random);
        prox_semilla = semilla;

    }
    console.log(random);
    return random
}

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
    let rowData = [];
    let rowData1 = generar_aleatorio_multiplicativo(19, 17, 32, 8);
    console.log(rowData1.nro_random)
    //console.log(rowData.nro_random)
    for (let i = 0; i < 8; i++) {
        // Cada row se va a instaciar con objetos que retornan de las simulaciones a mostrar en pantalla, esto es un placeholder para la demo


        let row = {
            "n": i,
            "Semilla": i,
            "Número": i,
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

class ValorRandom {
    constructor(n, semilla, nro_random) {
        this.n = n
        this.semilla = semilla
        this.nro_random = nro_random
    }
}