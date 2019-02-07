//02-typescript./01-variables.ts
// sudo  npm i -g typecript  [em mac] sT

const nombre: string = '12rrt';
const edad: number = 12;
const nada = null;
const casado: boolean = false;
let loquesea: any = {};
loquesea = 'uno';
loquesea = true;
loquesea = 2;

const fachaNacimiento: Date = new Date();

let identificador: number | String = '1';//es de tipo numero o string
identificador = 'uno';
identificador = 1;
//tsc nombreDelArchivo --target es2016


const usuario: {//Los 2 puntos es el TIPO
    nombre: string;
    apellido: string;
    edad?: number | string;//el signo ? es opcional
} =//EL Igual es el valor
    {
        nombre: 'JAVIER',
        apellido: 'SALAZAR',
    };
usuario.edad = '2';

//otra sintaxis para definr el objeto
interface usuarioInterface {
    nombres: string;
    apellidos: string;
    edad?: number | string;//el signo ? es opcional
}

class Usuario { //la clase se usa si es algo importante
    public nombres: string;
    public apellidos: string;
    public edad?: number | string;
}

const javier = new Usuario();
const usuario2: Usuario =
    {
        nombres: 'JAVIER',
        apellidos: 'SALAZAR',
    };
usuario2.edad = '4';


function sumardosnumeros(numUno: number, numDos: number) {
    return numUno + numDos;
}

sumardosnumeros(2, 6);
const saludar = (nombre: string, apellido?: string, ...infinito: number[]): any => {
    return 4;
};
let respuesta = <string>saludar('renato', 'salazar', 1, 2, 3, 4); //le transforme a string con <> //casteo
respuesta = respuesta.toUpperCase();
let nombreDos = 'niko'; //duck typing


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
