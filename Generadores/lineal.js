const metCongruencialMixto = (seed, c, a, m, n, from, to) => {

    let xi = seed;
    let randArr = [];
    let row = {};

    if (from > n || to > n) throw "n must be greater";

    for (let i = 0; i < n; i++) {
        xi = (a * xi + c) % m;
        rnd = xi / m;
        row.Semilla = xi;
        row['Número'] = rnd.toFixed(4);
        row.N = i + 1;
        randArr.push(rnd.toFixed(4));
    }

    if (typeof from !== 'undefined') {
        if (from > to) throw "Error"
        else {
            let newArr = randArr.splice(from - 1, to);
            return newArr;
        }
    }

    return randArr;
}

export default metCongruencialMixto;