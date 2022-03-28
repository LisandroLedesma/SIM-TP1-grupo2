const buttonTestD = document.getElementById('btnTestD');

const chiD = [
    [4, 9.49],
    [9, 16.92],
    [14, 23.68],
    [19, 30.14]
];

const getNumerosD = () => {

    filas = window.nroRnd;
    let aux = [];

    filas.forEach(fila => {
        aux.push(fila.Numero);
    });


    return aux;
}

const arrayMinD = (arr) => {
    return arr.reduce(function(p, v) {
        return (p < v ? p : v);
    });
}

const arrayMaxD = (arr) => {
    return arr.reduce(function(p, v) {
        return (p > v ? p : v);
    });
}

const testD = () => {


    const select = document.getElementById("intD");
    const intervalos = select.value;

    const numeros = getNumerosD();
    const max = arrayMaxD(numeros);
    const min = arrayMinD(numeros);
    const paso = ((max - min) / intervalos) + 0.1;

    console.log(min);
    console.log(max);

    let [suma, filas] = sumatoriaD(numeros, min, max, intervalos, paso);

    let res = pruebaD(intervalos, suma);

    console.log("test: ", res);

    generarTablaD(filas);
}

const sumatoriaD = (nros, minimo, maximo, int, paso) => {
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
        fila.fo = frecObsD(nros, lim_inf, lim_sup);
        fila.fe = nros.length / int;
        fila.estadistico = ((fila.fe - fila.fo) ** 2) / fila.fe;

        suma = (Number(suma) + Number(fila.estadistico)).toFixed(4);

        filas.push(fila);

    }

    return [suma, filas];

}

const frecObsD = (nros, inf, sup) => {
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
}

const generarTablaD = (filas) => {
    const eGridDiv = document.querySelector('#gridTestD');

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