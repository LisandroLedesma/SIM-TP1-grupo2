const buttonTestD = document.getElementById("btnTestD");

const chiD = [
    [4, 9.49],
    [9, 16.92],
    [14, 23.68],
    [19, 30.14],
];

const getNumerosD = () => {
    filas = window.nroRnd;
    let aux = [];

    filas.forEach((fila) => {
        aux.push(fila.Numero);
    });

    return aux;
};

const testD = () => {
    const select = document.getElementById("intD");
    const intervalos = select.value;

    const numeros = getNumerosD();

    const max = Math.max.apply(Math, numeros);
    const min = Math.min.apply(Math, numeros);
    const paso = Number(((max - min) / intervalos).toFixed(4));

    let [suma, filas] = sumatoriaD(numeros, min, max, intervalos, paso);

    pruebaD(intervalos, suma);

    generarTablaD(filas);
    generarHistogramaD(filas, paso);
};

const sumatoriaD = (nros, minimo, maximo, int, paso) => {
    let filas = [];
    let suma = 0;
    let min = minimo;

    const select = document.getElementById("intD");
    const intervalos = select.value;

    for (let i = 0; i < int; i++) {
        if (i == 0) {
            lim_inf = Number(min);
            lim_sup = Number((Number(min) + Number(paso)).toFixed(4));
        } else {
            lim_inf = Number(lim_sup);
            lim_sup = Number((Number(lim_sup) + Number(paso)).toFixed(4));
        }

        if (int + 1 == intervalos) {
            lim_sup = maximo;
        }

        let fila = new Object();

        let mc = (lim_inf + (lim_sup - lim_inf) / 2).toFixed(4);
        fila.marca_clase = mc;
        fila.lim_inf = lim_inf;
        fila.lim_sup = Number(lim_sup);
        fila.fo = frecObsD(nros, lim_inf, lim_sup);
        fila.fe = nros.length / int;
        fila.estadistico = (fila.fe - fila.fo) ** 2 / fila.fe;

        suma = (Number(suma) + Number(fila.estadistico)).toFixed(4);

        filas.push(fila);
    }

    return [suma, filas];
};

const frecObsD = (nros, inf, sup) => {
    fo = 0;

    ord = nros.sort();

    for (let i = 0; i < ord.length; i++) {
        if (i + 1 !== ord.length) {
            if (ord[i] >= inf && ord[i] < sup) {
                fo += 1;
            }
        } else {
            if (ord[i] >= inf && ord[i] <= sup) {
                fo += 1;
            }
        }
    }

    return fo;
};

const pruebaD = (int, suma) => {
    let v = int - 1;
    let res = false;
    let valor_tabla = 0;

    chiD.forEach((par) => {
        if (par[0] === v) {
            valor_tabla = par[1];
        }
    });

    if (suma <= valor_tabla) {
        res = true;
    }

    return res;
};

const generarTablaD = (filas) => {
    const eGridDiv = document.querySelector("#gridTestD");

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
            LimInf: fila.lim_inf,
            LimSup: fila.lim_sup,
            MC: fila.marca_clase,
            Fe: fila.fe,
            Fo: fila.fo,
            Estadístico: fila.estadistico,
        };
        rowData.push(row);
    });

    const gridOptions = {
        columnDefs: columnDefs,
        rowData: rowData,
    };

    new agGrid.Grid(eGridDiv, gridOptions);
    gridOptions.api.sizeColumnsToFit();
};

//Carga frecuencias esperadas (es un hardcode dinamico)
const cargarValoresD = (filas, lim_inf) => {
    let aux = [];
    for (var i = 0; i < filas[0].fe; i++) {
        aux.push(lim_inf);
    }
    return aux;
};

const generarHistogramaD = (filas, paso) => {
    randArr = getNumerosD();

    let startValue = filas[0].lim_inf;
    let endValue = filas[filas.length - 1].lim_sup;

    var x1 = [];
    var x2 = [];

    //Carga frecuencias observadas
    for (var i = 0; i < randArr.length; i++) {
        x1[i] = randArr[i];
    }

    //Carga frecuencias esperadas (es un hardcode dinamico)
    let limites_inf = filas.map((x) => x.lim_inf);
    for (var i = 0; i < filas.length; i++) {
        let aux = cargarValoresD(filas, limites_inf[i]);
        aux.map((x) => x2.push(x));
    }

    //Frecuencias observadas
    let trace1 = {
        x: x1,
        type: "histogram",
        name: "Frecuencia Observada",
        marker: {
            color: "rgb(255, 100, 102)",
        },
        opacity: 0.75,
        xbins: {
            end: endValue,
            start: startValue,
            size: paso,
        },
    };

    //Frecuencias esperadas
    let trace2 = {
        x: x2,
        type: "histogram",
        name: "Frecuencia Esperada",
        marker: {
            color: "rgb(100, 200, 102)",
        },
        opacity: 0.3,
        xbins: {
            end: endValue,
            start: startValue,
            size: paso,
        },
    };
    let layout = {
        title: "Distribución de frecuencia (método default)",
        barmode: "overlay",
        xaxis: { title: "Intervalos" },
        yaxis: { title: "Frecuencia" },
    };
    let data = [trace1, trace2];
    let config = {
        responsive: true,
    };
    Plotly.newPlot("gd-def", data, layout, config);
};
