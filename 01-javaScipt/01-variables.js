// Tipados Int edad = 1;

var edad = 1; // number
var sueldo = 1.01; // number
var nombre = "Adrian"; // string
var nombre = 'Adrian'; // string
var nombre = `Adrian`; // string
var casado = false; // boolean
var hijos = null; // object
var cuatroBrazos; // undefined
var fecha = new Date(); // object

console.log('fecha', fecha); // 2018..........
console.log(typeof fecha); // object


var adrianJSON = {
    "nombre": "Adrian",
    "edad": 29,
    "sueldo": 12.2,
    "casado": false,
    "hijos": null,
    "mascota": {
        "nombre": "Cachetes"
    }
}; // object


var adrian = {
    'nombre': 'Adrian',
    edad: 29,
    sueldo: 12.2,
    casado: false,
    hijos: null,
    deberes: undefined,
    mascota: {
        nombre: 'Cachetes'
    },
}; // object

console.log(adrian.nombre); // 'Adrian'

if(true){
    console.log("Si"); //
} else{
    console.log("No");
}


if(false){
    console.log("Si");
} else{
    console.log("No"); //
}

// truthy
// falsy

if(undefined){
    console.log("Si");
} else{
    console.log("No"); // falsy
}


if(new Date()){
    console.log("Si"); // truthy
} else{
    console.log("No");
}


if(null){
    console.log("Si");
} else{
    console.log("No"); // falsy
}


if(0){
    console.log("Si");
} else{
    console.log("No"); // falsy
}

if(-1){
    console.log("Si"); // truthy
} else{
    console.log("No");
}

if(1){
    console.log("Si"); //
} else{
    console.log("No");
}


if(""){
    console.log("Si"); //
} else{
    console.log("No");
}





