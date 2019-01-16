const  arreglonumeros=[2,3,1,5,6,4,7,8,9,10];
const resultadoFilter= arreglonumeros.
filter(n =>n%2==0);
console.log(resultadoFilter);
if('1'===1){
    console.log('es verdad');
    }else{console.log('es falso');


};
console.log(resultadoFilter);

//for each devuelve un final
// filter devuelve un arreglo que cumla con una expresion

const resultadoEvery=arreglonumeros.every(n=> n>0);
//SITODOS CUMOPLE DEB=VUEVE TRUE
console.log(resultadoEvery);
//SOME
const resultadoSOME= arreglonumeros
    .some(n=> n<0);// cuando hay uno true , sino false
console.log(resultadoSOME);


//FINDEiNDEXOFF
const  resultadoFindIndex=arreglonumeros
    .findIndex(n=> n===7);//buscar por elindice
arreglonumeros.indexOf(7);
console.log(resultadoFindIndex);
console.log(arreglonumeros.indexOf(7));
//find
const resultadoFind=arreglonumeros
    .find(n=> n===7);
console.log(resultadoFind);


// reduce

const  resultadoReduce= arreglonumeros
    .reduce(
       // (valoractulaDelNumero,valorActualDElArreglo)=>{//1er una funcion
(valoractulaDelNumero,valorActualDElArreglo)=>{//1er una funcion
            return valoractulaDelNumero-valorActualDElArreglo;
        },
        100//acepta un valor
    );
console.log(resultadoReduce);

//version dos
const  resultadoReduceV2= arreglonumeros.reduceRight((a,b,indice)=>{
    if(indice>4){
        return a+b;
    }else{
        return a;
    }
},0
    );

//sort
const clonarArregloNumeros=JSON.parse(JSON.stringify(arreglonumeros));
console.log(clonarArregloNumeros);
const  resultadoSort= arreglonumeros.sort(( a,b) => a-b);
console.log(resultadoSort);
const  resultadoSortV2= clonarArregloNumeros.sort(( a,b) => b-a);
console.log(resultadoSortV2);

