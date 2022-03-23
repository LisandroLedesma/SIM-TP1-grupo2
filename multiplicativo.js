//metodo multiplicativo
function generar_semillas(a, semilla, m){
    prox_semilla = (a * semilla) % m;
    return semilla
}

function generar_aleatorio_multiplicativo(a, semilla, m, cant_random){
    let random = [];
    for (let i = 0; i < cant_random; i++) {
        semilla = generar_semillas(a, semilla, m);
        rnd = semilla / m;
        
        const valor_random = new ValorRandom(i, semilla, rnd)
        random.push(valor_random)
        prox_semilla = semilla

    }

    return random
}

class ValorRandom {
    constructor(n, semilla, nro_random) {
        this.n = n
        this.semilla = semilla
        this.nro_random = nro_random
    }
}