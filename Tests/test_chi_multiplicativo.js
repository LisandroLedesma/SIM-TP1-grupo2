const buttonTestM = document.getElementById('btnTestMultiplicativo');

const chiM = [
    [4, 9.49],
    [9, 16.92],
    [14, 23.68],
    [19, 30.14]
];

const getNumerosM = () => {

    filas = window.nroRnd;
    let aux = [];

    filas.forEach(fila => {
        aux.push(fila.Numero);
    });


    return aux;
}

const arrayMinM = (arr) => {
    return arr.reduce(function(p, v) {
        return (p < v ? p : v);
    });
}

const arrayMaxM = (arr) => {
    return arr.reduce(function(p, v) {
        return (p > v ? p : v);
    });
}

const testM = () => {


    const select = document.getElementById("intMultiplicativo");
    const intervalos = select.value;

    const numeros = getNumerosM();
    const max = arrayMaxM(numeros);
    const min = arrayMinM(numeros);
    const paso = (max - min) / intervalos;


    let [suma, filas] = sumatoriaM(numeros, min, max, intervalos, paso);

    let res = pruebaM(intervalos, suma);

    console.log("test: ", res);

    generarTablaM(filas);
    generarHistograma();
}

const sumatoriaM = (nros, minimo, maximo, int, paso) => {
    let filas = [];
    let suma = 0;
    let min = minimo;

    for (let i = 0; i < int; i++) {

        if (i == 0) {
            lim_inf = Number(min);
            lim_sup = (Number(min) + Number(paso)).toFixed(4);
        } else {
            lim_inf = Number(lim_sup);
            lim_sup = (Number(lim_sup) + Number(paso)).toFixed(4);
        }

        let fila = new Object();

        let mc = (lim_inf + (lim_sup - lim_inf) / 2).toFixed(4);
        fila.marca_clase = mc;
        fila.lim_inf = lim_inf;
        fila.lim_sup = Number(lim_sup);
        fila.fo = frecObsM(nros, lim_inf, lim_sup);
        fila.fe = nros.length / int;
        fila.estadistico = ((fila.fe - fila.fo) ** 2) / fila.fe;

        suma = (Number(suma) + Number(fila.estadistico)).toFixed(4);

        filas.push(fila);

    }

    return [suma, filas];

}

const frecObsM = (nros, inf, sup) => {
    fo = 0

    ord = nros.sort();

    for (let i = 0; i < ord.length; i++) {
        if ((i + 1) !== ord.length) {
            if (ord[i] >= inf && ord[i] < sup) {
                fo += 1
            }
        } else {
            if (ord[i] >= inf && ord[i] <= sup) {
                fo += 1
            }
        }
    }

    return fo
}

const pruebaM = (int, suma) => {
    let v = int - 1;
    let res = false;
    let valor_tabla = 0;

    chiM.forEach((par) => {
        if (par[0] === v) {
            valor_tabla = par[1];
        }
    });

    if (suma <= valor_tabla) {
        res = true;
    }

    return res;
}

const generarTablaM = (filas) => {
    const eGridDiv = document.querySelector('#gridTestMultiplicativo');

    let columnDefs = [
        { field: "LimInf" },
        { field: "LimSup" },
        { field: "MC" },
        { field: "Fe" },
        { field: "Fo" },
        { field: "Estadístico" },
    ];

    let rowData = [];
    filas.forEach((fila) => {
        let row = {
            "LimInf": fila.lim_inf,
            "LimSup": fila.lim_sup,
            "MC": fila.marca_clase,
            "Fe": fila.fe,
            "Fo": fila.fo,
            "Estadístico": fila.estadistico,
        }
        rowData.push(row);
    })

    let gridOptions = {
        columnDefs: columnDefs,
        rowData: rowData
    };


    new agGrid.Grid(eGridDiv, gridOptions);
}

const generarHistograma = () => {
    randArr = getNumerosD();

    var x1 = [];
    var x2 = [];
    for (var i = 0; i < randArr.length; i ++) {
        x1[i] = randArr[i];
    }

    //Frecuencias observadas
    var trace1 = {
        x: x1,
        type: 'histogram',
        name: 'Frecuencia Observada',
        marker: {
            color: "rgba(255, 100, 102, 0.7)", 
        },
        opacity: 0.5,
        xbins: {
            end: 1, 
            size: 0.1, 
            start: 0
        }
    };

    //Frecuencias esperadas 
    //TODO: falta implementarlo
    var trace2 = {
        x: x2,
        type: 'histogram',
        name: 'Frecuencia Esperadas',
        marker: {
            color: "rgba(100, 200, 102, 0.7)",
        },
        opacity: 0.75, 
        xbins: { 
            end: 1, 
            size: 0.1, 
            start: 0
        }
    };
    var layout = { 
        title: "Método congruencial lineal o mixto", 
        barmode: "overlay", 
        xaxis: {title: "Value X"},
        yaxis: {title: "Count Y"}
    };
    var data = [trace1, trace2];
    Plotly.newPlot('gd-mcm', data, layout);
}
