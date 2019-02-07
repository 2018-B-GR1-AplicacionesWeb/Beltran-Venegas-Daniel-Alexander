//02-typescript./01-variables.ts
// sudo  npm i -g typecript  [em mac] sT
var nombre = '12rrt';
var edad = 12;
var nada = null;
var casado = false;
var loquesea = {};
loquesea = 'uno';
loquesea = true;
loquesea = 2;
var fachaNacimiento = new Date();
var identificador = '1'; //es de tipo numero o string
identificador = 'uno';
identificador = 1;
//tsc nombreDelArchivo --target es2016
var usuario = {
    nombre: 'JAVIER',
    apellido: 'SALAZAR'
};
usuario.edad = '2';
var Usuario = /** @class */ (function () {
    function Usuario() {
    }
    return Usuario;
}());
var javier = new Usuario();
var usuario2 = {
    nombres: 'JAVIER',
    apellidos: 'SALAZAR'
};
usuario2.edad = '4';
function sumardosnumeros(numUno, numDos) {
    return numUno + numDos;
}
sumardosnumeros(2, 6);
var saludar = function (nombre, apellido) {
    var infinito = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        infinito[_i - 2] = arguments[_i];
    }
    return 4;
};
var respuesta = saludar('renato', 'salazar', 1, 2, 3, 4); //le transforme a string con <> //casteo
respuesta = respuesta.toUpperCase();
var nombreDos = 'niko'; //duck typing
/*

function sumarDosNumeros(numero1, numero2)
{
numero1:numero1,
    numero2:number


const saludar = (nombre: string,
                 apellido?: string,
                 ...infinito: number[]): string => {

};
let respuesta = <string>saludar(nombre
:
'nombre',
    apellido
:
'apellido',
    infinito
:
1, 2, 3
)
;
let nombreDos = 'renato';
respuesta = respuesta.toUpperCase();





*/
