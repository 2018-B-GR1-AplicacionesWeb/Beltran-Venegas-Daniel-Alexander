//06 callback-propio

const fs = require('fs');
let totalArchivo = 'INICIO';

function appendFile(nombreArchivo, cotenidoArchivo, callback) {
    fs.readFile(nombreArchivo, 'utf-8', (error, contenidoDelArchivo) => {
            if (err) {
                console.error('Error escribiendo');
                callback(err);
            } else {
                console.log('Archivo creado');
                callback(undefined, contenidoArchivo);
            }
        }
    );
}
