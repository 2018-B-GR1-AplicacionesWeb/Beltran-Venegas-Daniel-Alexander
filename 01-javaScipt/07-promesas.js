// 07-promesas.js

//Una promesa no es nada más que Definir una nueva clase //las promesas reciben una funcion como parametro
//las promesas tienes DOS funciones //-Resolve --> es OK //-Reject--> algo malo paso
//la promesa es como que algo va a paser en el futuro
const fs = require('fs'); //vamos a convertir una fucion en una proemsa
const nuevaPromesaLectura = new Promise(
    (resolve, reject) => { //aqui se puede escribir cualquier tipo de codigo
        fs.readFile('07-texto.txt', 'utf-8',
            (error, contenidoDelArchivo) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(contenidoDelArchivo);
                }
            });
    }
);



const nuevaPromesaEscritura = (contenidoLeido) => {//parametro que NECESITO recibir =(contenidoLeido)
    return new Promise(
        (resolve, reject) => { //aqui se puede escribir cualquier tipo de codigo
            const contenido = contenidoLeido ? contenidoLeido + ' Otro dato' : 'Otro ola';
            fs.writeFile('07-texto.txt', contenido, (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(contenido);
                }
            });
        }
    );
};
const segundaPromesaEscritura = (recivoParametro) => {
    return new Promise((resolve, reject) => {
        const aumentarContenido = recivoParametro ? recivoParametro + ' Agregar otro Dato' : 'no se agrego dato'
        fs.writeFile('05-texto.txt', aumentarContenido, (error) => {
            if (error) {
                reject(error);
            } else {
                resolve(aumentarContenido);
            }
        });
    });
};
console.log(nuevaPromesaEscritura);
//la primera promesa se llama nuevaPromesa.then() //  .then es cuando algo salio Bien


nuevaPromesaLectura
    .then(//.then ->despues de haber leido el archivo 07 !!!hagamos esta otra tarea
        (contenidoArchivo) => {
            console.log('Todo bien ', contenidoArchivo);
            return nuevaPromesaEscritura(contenidoArchivo)// para concatener una promesa, LO QUE SE DEBE HACER es devolver en EL RETURN una PROMESA
        })
    .then((contenidoCompleto) => {//despues de haber escrito !! hacer esta otra tarea
        console.log('Contenido completo ', contenidoCompleto);
        return segundaPromesaEscritura(contenidoCompleto) //devuelvo una promesa para concatenar
    })
    .then((masContenido) => {
        console.log('Se agrego mas datos ', masContenido);
    })
    .catch(// .catch --> algo malo paso);
        (resultadoError) => {
            console.log('Algo malo paso', resultadoError);
        });
/*
const arregloString= ['A','B','C'];
nuevaPromesaAppendFile('07-texto.txt',
    '\n Promesa',
    (contenidoArchivo)
        .then((contenidoArchivo)=>{
            console.log(contenidoArchivo);
            }
        )
);

*/
const appernFile = new Promise((resolve, reject) => {
    appendFile('07-texto.txt', 'utf-8', (err, contenido) => {
        if (err) {
            reject(err);
        } else {
        }


    });


});