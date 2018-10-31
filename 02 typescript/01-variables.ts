//02 -typescript/01-variables.ts
// sudo npm i -g typescript
const nombre: string = '2312';
const apellido: string = '2312';
const edad: number = '12';
const nada: string = '2312';
const cansado: boolean = false;
let loQuesea:any ={};
loQuesea = 1;
loQuesea = 'Facil';
loQuesea = true;
const fechaNacimineto:Date = new Date();
let identificador: number | string = '1';
identificador = 'uno';
//tsc nombreArchivo --target es2015
interface UsuarioInterface {
    nombre: string;
    apellido: string;
    edad?: number | string;
}
class Usuario{
    public nombre:string;
    public apellido:string;
    public edad?: number | string;
}
const usuario:Usuario = {
     nombre: 'Adrian',
    apellido: 'Eguez'
};
usuario.edad = '2';
function sumarDosNumeros (
    numeroUno: number,
    numeroDos: number
){
    return numeroUno + numeroDos;
}
sumarDosNumeros(numeroUno: 2, numeroDos: 2);
const saludar = (nombre:string,
                 apellido?: string,
                 ...infinito: number[]): string | number => {
    return 'HOLA';
    };
const respuesta = saludar(nombre: 'nombre',
    apellido: 'eguez',
    infinito: 1, 2, 3, 4 );


