//obsevable .ts
//import {PAQUETE UNO, PAQUETE DOS}from 'rxjs';
//import {Observable}from 'rxjs';
//import { Observable, Subject, ReplaySubject, from, of, range } from 'rxjs';
//import { map, filter, switchMap } from 'rxjs/operators';
//import ownKeys = Reflect.ownKeys;
// 02-observables.ts
// import { PaqueteUno, Paquete dos} from 'rxjs';
//import * as rxjs from 'rxjs';
// import {Observable} from "rxjs";
// declare var module:any;

//import "rxjs/add/observable/interval";//https://gist.github.com/MichalZalecki/d78c52ec55d7ec7b53f7
//declare var require: any;
//import "rxjs/add/observable/interval";
//import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';



//const observableUno$ = rxjs.of(1);//para definir un Observable usamos la Funcion llamda of
//al final del Observable se pne SIEMPRE EL SIGNO DE $ DOLAR
//console.log(observableUno$);


const rxjs = require('rxjs');
const map = require('rxjs/operators').map;
const disctinct = require('rxjs/operators').distinct;

const observableUno$ = rxjs.of([1, 2, 3], 3, 'Hola', 3, true, 3, {nombre: 'Adrian'}, 3);
console.log(observableUno$);
observableUno$
    .pipe(disctinct(), map((valor) => {
        console.log('Valor', valor);
        return {
            data: valor
        };
    }))
    .pipe()
    .pipe()
    .subscribe((ok) => {
        console.log('En ok', ok);
    }, (error) => {
        console.log(error);
    }, () => {
        console.log('Completado');
    });
const promesita = () => {
    // @ts-ignore
    return new Promise((resolve, reject) => {
        reject(':(');
    });
};

/*const observableDePromesa$ = rxjs.from(promesita());
observableDePromesa$
    .pipe(map((valor) => {
        return {
            data: valor
        };
    }
        )
    )
    .subscribe((objetoFeliz) => {
        console.log(objetoFeliz);
    }, (error) => {
        console.log(error);
    });*/

async function ejeutarCodigoSyncrono() {
    console.log('inicio');
    try {
        const resultadoProemsita = await promesita();
        console.log(resultadoProemsita);
    } catch (e) {
        console.log('error en promesita');
    }

    console.log('fin');

};

