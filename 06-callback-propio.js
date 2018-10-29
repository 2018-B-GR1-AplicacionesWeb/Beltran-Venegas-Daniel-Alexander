// 06-callback-propio.js

const fs = require('fs');

let totalArchivo = 'INICIO';

function appendFile(nombreArchivo, contenidoArchivo, callback) {

    fs.readFile(nombreArchivo, 'utf-8',
        (error, contenidoArchivoLeido) => {
            if (error) {
                fs.writeFile(nombreArchivo, contenidoArchivo,
                    (err) => {
                        if (err) {
                            console.error('Error escribiendo');
                            totalArchivo = 'ERROR';
                        } else {
                            console.log('Archivo creado');
                            totalArchivo = contenidoArchivo;
                        }
                    }
                );
            } else {
                fs.writeFile(
                    nombreArchivo,
                    contenidoArchivoLeido + contenidoArchivo,
                    (err) => {
                        if (err) {
                            console.error('Error escribiendo');
                            totalArchivo = 'ERROR';
                        } else {
                            console.log('Archivo creado');
                            totalArchivo = contenidoArchivoLeido + contenidoArchivo;
                        }
                    }
                );
            }
        }
    );
}

appendFile('06-texto.txt',
    '\n Adios mundo',
    () => {

    }
);
