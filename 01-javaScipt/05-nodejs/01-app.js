const calculadora = require('./02-calculadora.js');
const util = require('../05-nodejs-02/01-util');
const tiempo = require('./tiempo/01-tiempo');
const fs = require('fs');
const pepito = require('express');


console.log('calculadora', calculadora.nombreCalculadora);
console.log('calculadora', calculadora.sumarDosNumeros(1,2));
console.log('tiempo', tiempo);
console.log('express', pepito);
console.log('fs', fs);
console.log('util', util);


