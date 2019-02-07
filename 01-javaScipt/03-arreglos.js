//arreglos
var arreglo = [];
arreglo = [1, 2,
    "JAVIER",
    null,
    new Date(),
    {nombre: "javier"},
    [1, 2, false, true]
];
arreglo.push(3);//añade al final de la cadena
arreglo.pop();
console.log(arreglo);

var arregloMisNumeros = [1, 2, 3, 4, 5, 6];
console.log(arregloMisNumeros);
arregloMisNumeros.splice(1, 0, 1.1);
console.log(arregloMisNumeros);//[ 1, 1.1, 2, 3, 4, 5, 8, 19, 10 ]
//quiero borrar el 8
arregloMisNumeros.splice(6, 1);//0,1,2,3
console.log(arregloMisNumeros);//=[ 1, 1.1, 2, 3, 4, 5, 19, 10 ]
//Buscar la posicion dentro de un arreglo
var indeiceDelNumDos = arregloMisNumeros.indexOf(2);//Busca el indice de un número dado
console.log(indeiceDelNumDos); //me debuelve el indice
arregloMisNumeros.splice(indeiceDelNumDos, 0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9);//agrero numeros desde la psoicion
console.log(arregloMisNumeros);//posicion 2 =>[ 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1, 7, 1.8, 1.9, 2, 3, 4, 5 ]
var indiceUnoSiete = arregloMisNumeros.indexOf(1.7);
console.log(arregloMisNumeros[indiceUnoSiete]);


var posicionInicialUnoUno = arregloMisNumeros.indexOf(1.1);
var posicionInicialUnoNueve = arregloMisNumeros.indexOf(1.9);
var desdeElUnoUnoAlUnoNueve = (posicionInicialUnoNueve - posicionInicialUnoUno) + 1;

var arregloArgumentos = [posicionInicialUnoUno, posicionInicialUnoNueve];
arregloMisNumeros.splice(...arregloArgumentos);//DESTRUCTURO
console.log("arreglo de argumentos DESTRUCTURACION: ", arregloMisNumeros);

arregloMisNumeros.splice(
    posicionInicialUnoUno,
    desdeElUnoUnoAlUnoNueve);
console.log("arreglo ", arregloMisNumeros);//salida [ 1, 2, 3, 4, 5 ]

//Unir dos o mas arreglos
var arrgloUno = [1, 2, 3];
var arrgloDos = [4, 5, 6];
//para esto usaremos la DESTRUCTURACION
console.log(1, 2, 3);
console.log(...arrgloUno);
var arregloCompleto = [...arrgloUno, ...arrgloDos];
console.log(arregloCompleto);
console.log(...arrgloUno, ...arrgloDos);
//Destructuracion de objetos

var javier = {
    nombre: "Adrian",
    apellido: "Salazar",
    edad: 8
};
var renato={
    mascota:{
        nombreMascota: "rufino",
    },
    fechaNacimiento:new Date('2000-10-23'),
};
var datosusuario = {
    ...javier,  ...renato
};
console.log("Destructuracion de Objeto: ",datosusuario);
//si queremos validar los datos que estan dentro del objeto
//mas ejemple deObjetos
var atributosDElObjeto= Object.keys(datosusuario);
console.log(atributosDElObjeto);
console.log(datosusuario['nombre']);//debuelve nombre
console.log(datosusuario[atributosDElObjeto[1]]);

