
const version=require('./version.js');
const  versionNode=require('./version-node/version-node');
console.log(version);
const calculadora =require('./calculadora');
console.log(calculadora.sumar(2,6));
console.log(calculadora.restar(2,6));
console.log('version',versionNode);


