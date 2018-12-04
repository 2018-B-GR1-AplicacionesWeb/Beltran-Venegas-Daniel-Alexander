//import inquirer from ('inquirer');

declare var require: any;
const inquirer = require('inquirer');
const fs = require('fs');
const rxjs = require('rxjs');
const timer = require('rxjs').timer;
const mergeMap = require('rxjs/operators').mergeMap;
const map = require('rxjs/operators').map;
const retryWhen = require('rxjs/operators').retryWhen;
const delayWhen = require('rxjs/operators').delayWhen;

const Menu1 = {
    type: 'list',
    name: 'Menu',
    message: 'Menu Principal',
    choices: [
        'Crear',
        'Borrar',
        'Buscar',
        'Actualizar',
        'Salir'
    ]
};

const BuscarUsuario = [
    {
        type: 'input',
        name: 'idUsuario',
        message: 'Ingrese Codigo de las motocicletas',
    }
];

const preguntaUsuario = [
    {
        type: 'input',
        name: 'id',
        message: 'Cual es el codigo de las motocicletas?'
    },
    {
        type: 'input',
        name: 'nombre',
        message: 'Cual es el nombre de la motocicleta?'
    },
    {
        type: 'input',
        name: 'precio',
        message: '¿Cual es su precio?'
    },


];

const EdicionUsuario = [
    {
        type: 'input',
        name: 'nombre',
        message: 'Cual es el nuevo nombre de las motocicletas'
    },
];


function inicialiarBDD() {
    // @ts-ignore
    return new Promise(
        (resolve, reject) => {
            fs.readFile('bdd.json', 'utf-8',
                (error, contenidoArchivo) => { // CALLBACK
                    if (error) {
                        fs.writeFile('bdd.json', '{"usuarios":[]}',
                            (error) => {
                                if (error) {
                                    reject({
                                        mensaje: 'Error creando',
                                        error: 500
                                    })
                                } else {
                                    resolve({
                                        mensaje: 'BDD leida',
                                        bdd: JSON.parse('{"usuarios":[]}')
                                    })
                                }
                            }
                        )

                    } else {
                        resolve({
                            mensaje: 'BDD leida',
                            bdd: JSON.parse(contenidoArchivo)
                        })
                    }
                }
            )
        }
    );
}

// @ts-ignore
async function main() {
    // of(Cualquier cosa JS)
    // from(Promesas)
    const respuestaBDD$ = rxjs.from(inicialiarBDD());
    respuestaBDD$
        .pipe(
            OpciondeMenu(),
            opcionesdeRespuesta(),
            ejecutarAcccion(),
            guardarBaseDeDatos()
        )
        .subscribe(
            (data) => {
                //
                console.log(data);
            },
            (error) => {
                //
                console.log(error);
            },
            () => {
                main();
                console.log('Complete');
            }
        )

}

function guardarBDD(bdd: BDD) {
    // @ts-ignore
    return new Promise(
        (resolve, reject) => {
            fs.writeFile(
                'bdd.json',
                JSON.stringify(bdd),
                (error) => {
                    if (error) {
                        reject({
                            mensaje: 'Error creando',
                            error: 500
                        })
                    } else {
                        resolve({
                            mensaje: 'BDD guardada',
                            bdd: bdd
                        })
                    }

                }
            )
        }
    )
}


main();


function OpciondeMenu() {
    return mergeMap( // Respuesta Anterior Observable
        (respuestaBDD: RespuestaBDD) => {

            return rxjs
                .from(inquirer.prompt(Menu1))
                .pipe(
                    map( // respuesta
                        (respuesta: OpcionMenu) => {
                            respuestaBDD.opcionMenu = respuesta;
                            return respuestaBDD
                        }
                    )
                );

            // OBSERVABLE!!!!!!!!!!
        }
    )
}

function opcionesdeRespuesta() {
    return mergeMap(
        (respuestaBDD: RespuestaBDD) => {
            const opcion = respuestaBDD.opcionMenu.opcionMenu;
            switch (opcion) {
                case 'Crear':
                    return rxjs
                        .from(inquirer.prompt(preguntaUsuario))
                        .pipe(
                            map(
                                (motocicletas: fastMotorcicle) => { // resp ant OBS
                                    respuestaBDD.motocicletas = motocicletas;
                                    return respuestaBDD;
                                }
                            )
                        );
                case 'Buscar':
                    return consultarid(respuestaBDD);
                case 'Actualizar':
                    return preguntarIdUsuario(respuestaBDD);
                case 'Borrar':
                    return consultarid(respuestaBDD);
            }
        }
    )
}

function guardarBaseDeDatos() {
    return mergeMap(// Respuesta del anterior OBS
        (respuestaBDD: RespuestaBDD) => {
            // OBS
            return rxjs.from(guardarBDD(respuestaBDD.bdd))
        }
    )
}

function ejecutarAcccion() {
    return map( // Respuesta del anterior OBS
        (respuestaBDD: RespuestaBDD) => {
            const opcion = respuestaBDD.opcionMenu.opcionMenu;
            switch (opcion) {
                case 'Crear':
                    const motocicletas = respuestaBDD.motocicletas;
                    respuestaBDD.bdd.usuarios.push(motocicletas);
                    return respuestaBDD;
                case 'Actualizar':
                    const indiceActualizar = respuestaBDD.indiceUsuario;
                    if (indiceActualizar===-1) {
                        console.error('Error no existe ese producto')
                    } else {
                        respuestaBDD.bdd.usuarios[indiceActualizar].nombre = respuestaBDD.motocicletas.nombre;
                        console.log('Producto Actulizado con exito');
                    }
                    return respuestaBDD;

                case 'Buscar':
                    const indiceBuscar = respuestaBDD.indiceUsuario;
                    if (indiceBuscar === -1) {
                        console.error('Error no existe ese producto')
                    } else {
                        console.log('Motocicletas encontradas : ', respuestaBDD.bdd.usuarios[indiceBuscar])
                    }
                    return respuestaBDD;
                case 'Borrar':
                    const indiceBorrar = respuestaBDD.indiceUsuario;
                    if (indiceBorrar === -1) {
                        console.error('Error No existe registro')
                    } else {
                        console.log('Producto borrado del registro !!', respuestaBDD.bdd.usuarios[indiceBorrar]);
                        const a = respuestaBDD.bdd.usuarios
                        a.splice(respuestaBDD.bdd.usuarios[indiceBorrar], 1)
                    }
                    return respuestaBDD;
            }
        }
    )
}

interface RespuestaBDD {
    mensaje: string;
    bdd: BDD;
    opcionMenu?: OpcionMenu;
    motocicletas?: fastMotorcicle;
    indiceUsuario?: number;
}

interface BDD {
    usuarios: fastMotorcicle[] | any;

}


interface fastMotorcicle {
    id: number;
    nombre: string;
    precio: number;
}


interface OpcionMenu {
    opcionMenu: 'Crear' | 'Borrar' | 'Buscar' | 'Actualizar';
}

interface BuscarUsuarioPorId {
    idUsuario: string;
}

function preguntarIdUsuario(respuestaBDD: RespuestaBDD) {
    return rxjs
        .from(inquirer.prompt(BuscarUsuario))
        .pipe(
            mergeMap( // RESP ANT OBS
                (respuesta: BuscarUsuarioPorId) => {
                    const indiceUsuario = respuestaBDD.bdd
                        .usuarios
                        .findIndex( // -1
                            (motocicletas: any) => {
                                return motocicletas.id === respuesta.idUsuario
                            }
                        );
                    if (indiceUsuario === -1) {
                        console.log('Registro no encontrado, no existe');
                        return preguntarIdUsuario(respuestaBDD);
                    } else {
                        respuestaBDD.indiceUsuario = indiceUsuario;
                        return rxjs
                            .from(inquirer.prompt(EdicionUsuario))
                            .pipe(
                                map(
                                    (nombre: { nombre: string }) => {
                                        respuestaBDD.motocicletas = {
                                            id: null,
                                            nombre: nombre.nombre,
                                            precio: null
                                        };
                                        return respuestaBDD;
                                    }
                                )
                            );

                    }

                }
            )
        );
}

function consultarid(respuestaBDD: RespuestaBDD) {
    return rxjs
        .from(inquirer.prompt(BuscarUsuario))
        .pipe(
            map( // RESP ANT OBS
                (respuesta: BuscarUsuarioPorId) => {
                    const indiceUsuario = respuestaBDD.bdd
                        .usuarios
                        .findIndex( // -1
                            (motocicletas: any) => {

                                return motocicletas.id === respuesta.idUsuario

                            }
                        );

                    respuestaBDD.indiceUsuario = indiceUsuario;

                    return respuestaBDD;


                }
            )
        );
}