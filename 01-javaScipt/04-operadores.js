//OPERADORES
function ejemplo() { }
var ejemplodos=function () {};//anonimous funtion
var javier ={
};
var arregloDeNombres=['A','b','C','D'];
arregloDeNombres[1]='D';
arregloDeNombres.push('g');
const Javier ={
  //  nombre:'JAVIER';
//  const  casado= false; //no se [uede cambiar bools
//const varianlenull=null;


};
javier.nombr='renato';
arregloDeNombres.forEach(//escribircodigo que se entienda
    function (   valorActual,indiceactual,arrglo) {

        console.log('valor actual', valorActual);
        console.log('indice actual', indiceactual);
        console.log('arreglo', arrglo);
    }
    );

//Console.log(typeof ejemplo);
Console.log(ejemplo);
console.log(arregloDeNombres);


var variableuno;
let variableDos;// usar mutable (este se asigna a otro valor
variableDos= variableDos+1;
const  pi=3.1415; //csi simepreusar cons


////funciones anonimas
//fat ARROW FUNTION
arregloDeNombres.forEach(//escribircodigo que se entienda
    (   valorActual,indiceactual,arrglo) =>{

        console.log('valor actual', valorActual);
        console.log('indice actual', indiceactual);
        console.log('arreglo', arrglo);
    }
);

const  sumarDosnumeros=(numersoUno,numeroDso)=>{return numersoUno+numeroDso};
const  sumardosnumeros=(numuno,numdos)=>numuno+numdos;
const  elevarCuadrado=(numero)=>numero+numero;
const  elevarCuadradoV2=numero=>numero+numero;

const  arregloNombresdos=['E','F','G','H'];
const resultado =arregloDeNombres
    .map(//cambia el arreglo);
        (valoractual)=>{
            return valoractual+'.';
        })
    .forEach(//undefine)

        (valornuevo)=>console.log(valornuevo));

// devolver un arreglo
console.log(resultado);



