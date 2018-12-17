//04  ../02-observables
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const rxjs = require('rxjs');
//inquirer.js
const map = require('rxjs/operators').map;
const distinct = require('rxjs/operators').distinct;
const obsevableUno$ = rxjs.of(1, [1, 2, 3], 'hola', { nombre: 'javier' }, new Date(), 1, 5, 1);
console.log(obsevableUno$);
obsevableUno$
    .pipe(distinct(), map((valor) => {
    console.log('Valor', valor);
    return { data: valor };
})).pipe() //en .susbcribe  allí ya se ejecuta la funcion
    .subscribe((ok) => {
    console.log("ok :", ok);
}, (error) => {
    console.log(error);
}, () => {
    console.log('compleado');
});
//////  ej de otra promesa
const promesita = () => {
    // @ts-ignore
    return new Promise((resolve, reject) => {
        resolve('feliz :)');
    });
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
function ejecutarCodigoAsincrono() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('inicio');
        try {
            const reultadosPromesa = yield promesita();
            console.log(reultadosPromesa);
        }
        catch (e) {
            console.log('error en promesita', e);
        }
        console.log('fin');
    });
}
ejecutarCodigoAsincrono();
