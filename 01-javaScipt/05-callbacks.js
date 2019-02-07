//05-Callbacks

const fs = require('fs');
fs.readFile('04-operadores.js', 'utf-8',  (error, contenidoDelArchivo) => {//calback
        if (error) {
            console.log(error);
            throw new Error(error);
        } else {
            console.log(contenidoDelArchivo);
        }
    });
/*

const contenidoAAgregar ='JAVIER\n';
const nombreAgregar ='05-texto.txt';
console.log('inicio');
fs.readFile ('04-operadores.js',
    'utf-8',
    (error,contenidoArchivo)=>{ //callback
    if(error){

        console.log(error);
        try{
        }catch (e) {
            console.log(e);
        }
        //throw new Error(error);
        console.log('extra')
}else{
    console.log('si sirvio',contenidoArchivo);
}});
console.log('fin');
*/
