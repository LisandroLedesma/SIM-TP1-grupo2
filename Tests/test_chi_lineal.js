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

const arrayMin = (arr) => {
    return arr.reduce(function(p, v) {
        return (p < v ? p : v);
    });
}

const arrayMax = (arr) => {
    return arr.reduce(function(p, v) {
        return (p > v ? p : v);
    });
}

const test = () => {


    const select = document.getElementById("intLineal");
    const intervalos = select.value;

    const numeros = getNumeros();
    const max = arrayMax(numeros);
    const min = arrayMin(numeros);
    const paso = ((max - min) / intervalos) + 0.1;


    let [suma, filas] = sumatoria(numeros, min, max, intervalos, paso);

    let res = prueba(intervalos, suma);

    console.log("test: ", res);

    generarTabla(filas);
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

        let fila = new Object();

        let mc = (lim_inf + (lim_sup - lim_inf) / 2).toFixed(4);
        fila.marca_clase = mc;
        fila.lim_inf = lim_inf;
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

    return res;
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
}