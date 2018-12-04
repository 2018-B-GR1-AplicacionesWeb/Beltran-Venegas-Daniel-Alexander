function ejemplo() {
}

var ejemploDos = function () {
}; // Anonymous function

var adrian = {
    trabajar: function () {// Anonymous function
        return 'Trabajando';
    }
};

var arregloFunciones = [function () {// Anonymous function

}];

/* no se pueden usar funciones anonimas sin igualar o enviar como paraemtro
function(a,b,c){

}
*/

console.log(typeof ejemplo); // Tipo de dato -> function
console.log(ejemplo); // Definicion de la funcion
console.log(ejemplo()); // Ejecucion funcion

var variableUno; // NUNCA USAR
let variableDos = 2; // USAR MUTABLE (este se asigna a otro valor)
variableDos = variableDos + 1;
const pi = 3.1416;  // INTENTEN USAR CONST SIEMPRE

// operadores

const arregloDeNombres = ['A', 'b', 'C'];

arregloDeNombres[1] = 'B';

arregloDeNombres.push('D');

// arregloDeNombres = {};

// arregloDeNombres = [];


const vicente = {
    nombre: 'Vicente'
};

delete vicente.nombre;

const casado = true;

// casado = false; Cambiar booleanos

const apellido = '';

// apellido = '123'; Cambiar Strings

const edad = 29;
// edad = 30; Cambiar Number

const variableNull = null;

// variableNull = 1; Cambiar Null

vicente.nombre = 'Adrian';
vicente.edad = 24;

console.log(arregloDeNombres);
console.log(vicente);

arregloDeNombres.forEach(  // Escribir codigo que se entienda
    function (valorActual, indiceActual, arreglo) {
        console.log('Valor Actual', valorActual);
        console.log('Indice Actual', indiceActual);
        console.log('Arreglo', arreglo);
    }
);

// function con nombre
// function anonimas
// fat arrow functions  ->   =>

arregloDeNombres.forEach(  // Escribir codigo que se entienda
    (valorActual, indiceActual, arreglo) => {
        console.log('Valor Actual', valorActual);
        console.log('Indice Actual', indiceActual);
        console.log('Arreglo', arreglo);
    }
);

const sumarDosNumeros = (numUno, numDos) => {
    return numUno + numDos
};

const sumarDosNumerosV2 = (numUno, numDos) => numUno + numDos;

const elevarAlCuadrado = (numero) => numero * numero;

const elevarAlCuadradoV2 = numero => numero * numero;

const arregloNombresDos = ['E', 'F', 'G', 'H'];

const resultado = arregloDeNombres
    .map( // mutar cada elemento del arreglo
        valorActual => {
            return valorActual + '.';
        }
    )  // Devolver un ARREGLO
    .forEach(
        (valorNuevo) => console.log(valorNuevo)
    ); // undefined

console.log(resultado);

const arregloNumeros = [2, 3, 1, 5, 6, 4, 7, 8, 9, 10];


const resultadoFilter = arregloNumeros
    .filter(n => (n % 2) === 0);

console.log(resultadoFilter);

// Triple igual

if ('' === 0) {
    console.log('Es verdad');
} else {
    console.log('Es falso');
}

// Every

const resultadoEvery = arregloNumeros
    .every(n => n > 1); // Si cumple TODOS TRUE / FALSE

console.log(resultadoEvery);

// Some

const resultadoSome = arregloNumeros
    .some(n => n < 0); // Si uno cumple condicion TRUE / FALSE

console.log(resultadoSome);

// findIndex

const resultadoFindIndex = arregloNumeros
    .findIndex(n => n === 7);

console.log(resultadoFindIndex);
console.log(arregloNumeros.indexOf(7));

// find

const resultadoFind = arregloNumeros
    .find(n => n === 7);

// reduce

const resultadoReduce = arregloNumeros
    .reduce(
        (valorActualDelNumero, valorActualDelArreglo) => {  // 1er parametro una funcion
            return valorActualDelNumero - valorActualDelArreglo;
        },
        100  // Acepta un valor
    );
console.log(resultadoReduce);

const resultadoReduceV2 = arregloNumeros.reduceRight((a, b, indice) => {
    if (indice > 4) {
        return a + b;
    } else {
        return a;
    }
}, 0);

console.log(resultadoReduceV2);

// SORT

const clonArregloNumeros = JSON.parse(JSON.stringify(arregloNumeros));

const resultadoSort = arregloNumeros.sort((a, b) => a - b);

const resultadoSortV2 = clonArregloNumeros.sort((a, b) => b - a);

console.log(resultadoSort);
console.log(resultadoSortV2);