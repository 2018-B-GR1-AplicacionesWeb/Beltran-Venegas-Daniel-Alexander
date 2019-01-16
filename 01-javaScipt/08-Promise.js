const fs = require('fs'); //importa fs module
const nuevaPromesa = new Promise(
    (resolve, reject) => {
        // resolve(); //cuando se ejecta resol se ejecuta  .THEN
        fs.readFile('texto.txt', 'utf-8', (error,contenodoArchivo) => {
            if (error) {
                reject(error);
            } else {
                resolve( contenodoArchivo);
            }
        })
    }
);

const nuevaPromesaEscritura =
const nuevaPromesaLectura = new Promise(
    (resolve, reject) => {
        // resolve(); //cuando se ejecta resol se ejecuta  .THEN
        fs.readFile('texto.txt', 'utf-8', (error,contenodoArchivo) => {
            if (error) {
                reject(error);
            } else {
                resolve( contenodoArchivo);
            }
        })
    }
);
console.log(nuevaPromesa);

nuevaPromesa.then((resultadoOk) => {
    console.log('todo bien',resultadoOk);
}).catch((resultadoERROR) => {

    console.log('algo malo paso',resultadoERROR);
});