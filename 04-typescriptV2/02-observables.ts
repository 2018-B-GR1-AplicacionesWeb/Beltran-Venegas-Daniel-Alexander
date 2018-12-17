//04  ../02-observables

declare var require: NodeRequire;
const rxjs = require('rxjs');
//inquirer.js
const map = require('rxjs/operators').map;
const distinct = require('rxjs/operators').distinct;
const obsevableUno$ = rxjs.of(1, [1, 2, 3], 'hola', {nombre: 'javier'}, new Date(), 1, 5, 1);

console.log(obsevableUno$);
obsevableUno$

    .pipe(
        distinct(),
        map((valor) => {
            console.log('Valor', valor);
            return {data: valor};
        })
    ).pipe() //en .susbcribe  allí ya se ejecuta la funcion
    .subscribe((ok) => {//el .then se ejecuta Aqui
        console.log("ok :", ok);
    }, (error) => {//aqui caería la promesa con error
        console.log(error);
    }, () => {
        console.log('compleado');
    });

//////  ej de otra promesa


const promesita = () => {


    // @ts-ignore
    return new Promise((resolve, reject) => {
            resolve('feliz :)');
        }
    )
};



/*
const observableDePromesa$ = rxjs.from(promesita());//con el observable hecho , siguiente paso es SUSBCRIVIRCE
observableDePromesa$
    .pipe(
        map( //el map es para tranforma en objeto JSON
            (valor) => {
                return {
                    data: valor
                }
            })
    )

    .subscribe((objetoFeliz) => {
        console.log(objetoFeliz);

    }, (error) => {
        console.log(error);
    });
*/

// @ts-ignore
async function ejecutarCodigoAsincrono() {
    console.log('inicio');
    try {
        const reultadosPromesa = await promesita();
        console.log(reultadosPromesa);
    } catch (e) {
        console.log('error en promesita', e);
    }
    console.log('fin');

}

ejecutarCodigoAsincrono();
