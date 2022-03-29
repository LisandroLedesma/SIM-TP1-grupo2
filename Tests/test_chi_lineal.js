const buttonTest = document.getElementById('btnTestLineal');

const chi = [
    [4, 9.49],
    [9, 16.92],
    [14, 23.68],
    [19, 30.14]
];

const getNumeros = () => {

    filas = window.nroRnd;
    let aux = [];

    filas.forEach(fila => {
        aux.push(fila.Numero);
    });


    return aux;
}

const test = () => {


    const select = document.getElementById("intLineal");
    const intervalos = select.value;
    const spanL = document.getElementById('resL');
    const spanLD = document.getElementById('dataL');

    const numeros = getNumeros();
    numeros.sort();

    const max = numeros[numeros.length - 1];
    const min = numeros[0];
    const paso = Number(((max - min) / intervalos) + 0.0001);

    let [suma, filas] = sumatoria(numeros, min, max, intervalos, paso);


    let [res, sum, tabla] = prueba(intervalos, suma);

    sum = Number(sum).toFixed(2);

    spanLD.innerHTML = `<span>Estadistico: ${sum}. Valor de tabla: ${tabla}</span>`;


    if (res) {
        spanL.innerHTML = `<span style="color: green">No se rechaza la hipotesis</span>`;
    } else {
        spanL.innerHTML = `<span style="color: red">Se rechaza la hipotesis</span>`;
    }

    generarTabla(filas);
    generarHistogramaL(filas, paso);
}

const sumatoria = (nros, minimo, maximo, int, paso) => {
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
        // if ((i + 1) === Number(int)) {
        //     lim_sup = Number(maximo + 0.0001);
        // }


        let fila = new Object();

        let mc = (lim_inf + (lim_sup - lim_inf) / 2).toFixed(4);
        fila.marca_clase = Number(mc);
        fila.lim_inf = Number(lim_inf);
        fila.lim_sup = Number(lim_sup);
        fila.fo = frecObs(nros, lim_inf, lim_sup);
        fila.fe = nros.length / int;
        fila.estadistico = ((fila.fe - fila.fo) ** 2) / fila.fe;

        suma = (Number(suma) + Number(fila.estadistico)).toFixed(4);

        filas.push(fila);

    }

    return [suma, filas];

}

const frecObs = (nros, inf, sup) => {
    fo = 0;
    ord = nros;

    ord.forEach((numero) => {
        if (numero >= inf && numero < sup) {
            fo += 1;
        }
    });

    return fo;
}

const prueba = (int, suma) => {
    let v = int - 1;
    let res = false;
    let valor_tabla = 0;

    chi.forEach((par) => {
        if (par[0] === v) {
            valor_tabla = par[1];
        }
    });

    if (suma <= valor_tabla) {
        res = true;
    }

    return [res, suma, valor_tabla];
}

const generarTabla = (filas) => {
    const eGridDiv = document.querySelector('#gridTestLineal');

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
    gridOptions.api.sizeColumnsToFit();
}

//Carga frecuencias esperadas (es un hardcode dinamico)
const cargarValoresL = (filas, marca_clase) => {
    let aux = [];
    for (var i = 0; i < filas[0].fe; i++) {
        aux.push(marca_clase);
    }
    return aux;
};

const generarHistogramaL = (filas, paso) => {
    randArr = getNumeros();

    let startValue = filas[0].lim_inf;
    let endValue = filas[filas.length - 1].lim_sup;

    var x1 = [];
    var x2 = [];

    //Carga frecuencias observadas
    for (var i = 0; i < randArr.length; i++) {
        x1[i] = randArr[i];
    }

    //Carga frecuencias esperadas (es un hardcode dinamico)
    let marcas_clase = filas.map((x) => x.marca_clase);
    for (var i = 0; i < filas.length; i++) {
        let aux = cargarValoresL(filas, marcas_clase[i]);
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
        title: "Distribución de frecuencia (método lineal)",
        barmode: "overlay",
        xaxis: { title: "Intervalos" },
        yaxis: { title: "Frecuencia" },
    };
    let data = [trace1, trace2];
    let config = {
        responsive: true,
    };
    Plotly.newPlot("gd-mcl", data, layout, config);
};