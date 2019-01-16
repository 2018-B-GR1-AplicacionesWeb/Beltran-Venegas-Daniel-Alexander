//02 -02 fs/app.js

const fs=require('fs');
console.log(fs);
//const express=require('express');
//console.log(fs);
//console.log(express);
fs.readFile('.gitignore', 'utf-8',
    (err,textodelArchivoLeido)=>{
    if(err){
        try {
            throw new Error( err);
        }catch (e) {
            console.log(data);
        }else{
                 console.log(textodelArchivoLeido);
            } console.log(data);
        }
    );


