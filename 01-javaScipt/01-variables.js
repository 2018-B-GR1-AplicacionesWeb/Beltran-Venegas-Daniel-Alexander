//tpados int edad=1;

var edad=1; //
var sueldo=1.10;
var nombre="javier";
var name=`javier`;
var casado= false;
var gatos=null;//objeto
var cuatroBRAZOS;//undefine
var fecha=new Date();//object las clases no se pouede heredar

console.log('fecha',fecha);
console.log(typeof fecha);
var javierJSON= {
    "nombre": "Adrian",
    "edad": 12,
    "sueldo": 203.4,
    "casado": false,
    "hijos": null,
    "mascotas": {
        "nombre": "max"
    }
}//objeto
var javier ={
    'javier':'Javier',
    edad:12,
    sueldo:20.9,
    casado:false,
    hijos:null,
    mascota:{
        nombre:"cachetes"
    },

};//objeto

console.log(javier.nombre);
//truthy
//falsy
if(true){
    console.log("si");
}else{console.log("no");}

//truthy (strings, 1, -1, numbers, object)
//false  (0, null, undefined)
if(""){
    console.log("Si")
}else {
    console.log("no")
}
if (null){
    console.log("si")
} else {
    console.log("no")
}if (new Date()){
    console.log("si");
}else {
    console.log("no")
}