var arreglo = [];

arreglo = [
    1,
    "Adrian",
    false,
    null,
    new Date(),
    {
        nombre: "Vicente"
    },
    [1, 2, false, true]
];

console.log(arreglo);

arreglo.push(3);

console.log(arreglo);

arreglo.pop();

console.log(arreglo);

var arregloNumeros = [1, 2, 3, 4, 5];

arregloNumeros.splice(1, 0, 1.1);

console.log(arregloNumeros); // [1, 1.1, 2, 3, 4, 5];

arregloNumeros.splice(4, 1);

console.log(arregloNumeros);

var indiceDelNumeroDos = arregloNumeros.indexOf(2);

console.log(indiceDelNumeroDos);

arregloNumeros.splice(indiceDelNumeroDos, 0, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9);

console.log(arregloNumeros);

var indiceUnoSiete = arregloNumeros.indexOf(1.7);

console.log(arregloNumeros[indiceUnoSiete]); // 1.7
console.log(arregloNumeros[0]); // 1

var posicionInicialUnoUno = arregloNumeros.indexOf(1.1); // 0
var posicionInicialUnoNueve = arregloNumeros.indexOf(1.9); // 5

var desdeElUnoUnoAlUnoNueve = (
    posicionInicialUnoNueve - posicionInicialUnoUno) + 1;

var arregloArgumentos = [posicionInicialUnoUno,
    desdeElUnoUnoAlUnoNueve];

arregloNumeros.splice(...arregloArgumentos);

console.log(arregloNumeros);

var arregloUno = [1, 2, 3];
var arregloDos = [4, 5, 6];

// Destructuracion de arreglos

console.log(1, 2, 3);
console.log(...arregloUno);

var arregloCompleto = [...arregloUno, ...arregloDos];

console.log(arregloCompleto);

// Destructuracion de objetos

var adrian = {
    nombre: "Adrian",
    apellido: "Eguez",
    direccion: "Gregorio Bobadilla",
    casado: false,
    edad: 29
};
var vicente = {
    mascota: {
        nombre: "Cachetes"
    },
    fechaNacimiento: new Date('1989-06-10')
};

var datosDelUsuario = {
    ...adrian,
    ...vicente
};

console.log(datosDelUsuario);

// Objetos

var atributosDelObjeto = Object.keys(datosDelUsuario);


console.log(atributosDelObjeto);

console.log(datosDelUsuario[atributosDelObjeto[0]]);


