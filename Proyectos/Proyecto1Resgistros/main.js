var inquirer = require('inquirer');
var fs = require('fs');
var rxjs = require('rxjs');
var mergeMap = require('rxjs/operators').mergeMap;
var map = require('rxjs/operators').map;
var base = 'bdd.json';
var preguntaMenu = {
    type: 'list',
    name: 'opcionMenu',
    message: 'Registro para Eventos Deportivos',
    choices: [
        'Crear',
        'Borrar',
        'Buscar',
        'Actualizar',
        'Salir'
    ]
};
var preguntaBuscarRegistro = {
    type: 'input',
    name: 'id',
    message: 'Ingrese la ID del participantes a buscar: '
};
var preguntaEliminarRegistro = {
    type: 'input',
    name: 'id',
    message: 'Ingrese la ID del participantes a eliminar: '
};
var preguntaActualizarRegistro = {
    type: 'input',
    name: 'id',
    message: 'Ingrese la ID del participantes a actualizar: '
};
var preguntasIngresarRegistro = [
    {
        type: 'input',
        name: 'id',
        message: 'Ingrese su ID'
    },
    {
        type: 'input',
        name: 'nombre',
        message: "Ingrese su nombre",
    },
    {
        type: 'input',
        name: 'direccion',
        message: "Ingrese su direccion",
    },
    {
        type: 'input',
        name: 'telefono',
        message: "Ingrese su numero de telefono",
    },
    {
        type: 'list',
        name: 'tipo',
        message: 'Escoja el tipo de evento',
        choices: ['Carrera', 'Ciclismo', 'Duatlon', 'Triatlon'],
    },
    {
        type: 'input',
        name: 'edad',
        message: 'Ingrese su edad',
        validate: function (value) {
            var valid = !isNaN(parseFloat(value));
            return valid || 'Ingrese un numero';
        },
        filter: Number
    },
    {
        type: 'input',
        name: 'talla',
        message: "Ingrese su talla",
    },
    {
        type: 'list',
        name: 'patrocinador',
        message: 'Ingrese un patrocinador',
        choices: ['Empresa', 'Grupo', 'Independiente'],
    }
];
function inicialiarBDD() {
    return new Promise(function (resolve, reject) {
        fs.readFile(base, 'utf-8', function (error, contenidoArchivo) {
            if (error) {
                fs.writeFile(base, '{"Participantes":[]}', function (error) {
                    if (error) {
                        reject({
                            mensaje: 'ERROR AL CREAR BASE',
                            error: 500
                        });
                    }
                    else {
                        resolve({
                            mensaje: 'BDD LEÍDA',
                            bdd: JSON.parse('{"Participantes":[]}')
                        });
                    }
                });
            }
            else {
                resolve({
                    mensaje: 'BDD LEÍDA',
                    bdd: JSON.parse(contenidoArchivo)
                });
            }
        });
    });
}
function main() {
    var respuestaBDD$ = rxjs.from(inicialiarBDD());
    respuestaBDD$
        .pipe(opcionDeMenu(), opcionDeRespuesta(), ejecutarAcccion(), guardarBaseDeDatos())
        .subscribe(function (data) {
        console.log(data);
    }, function (error) {
        console.log(error);
    }, function () {
        main();
        console.log('Complete');
    });
}
function guardarBDD(bdd) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(base, JSON.stringify(bdd), function (error) {
            if (error) {
                reject({
                    mensaje: 'Error creando',
                    error: 500
                });
            }
            else {
                resolve({
                    mensaje: 'BDD guardada',
                    bdd: bdd
                });
            }
        });
    });
}
function opcionDeMenu() {
    return mergeMap(// Respuesta Anterior Observable
    function (respuestaBDD) {
        return rxjs
            .from(inquirer.prompt(preguntaMenu))
            .pipe(map(// respuesta ant obs
        function (respuesta) {
            respuestaBDD.opcionMenu = respuesta;
            return respuestaBDD;
        }));
    });
}
function opcionDeRespuesta() {
    return mergeMap(function (respuestaBDD) {
        var opcion = respuestaBDD.opcionMenu.opcionMenu;
        switch (opcion) {
            case 'Crear':
                return rxjs
                    .from(inquirer.prompt(preguntasIngresarRegistro))
                    .pipe(map(function (participante) {
                    respuestaBDD.participantes = participante;
                    return respuestaBDD;
                }));
            case 'Buscar':
                return buscarParticipantePorId(respuestaBDD);
                break;
            case 'Actualizar':
                return actualizarParticipantePorId(respuestaBDD);
            case 'Borrar':
                return eliminarParticipantePorId(respuestaBDD);
                break;
        }
    });
}
function guardarBaseDeDatos() {
    return mergeMap(// Respuesta del anterior OBS
    function (respuestaBDD) {
        // console.log(respuestaBDD.bdd);
        return rxjs.from(guardarBDD(respuestaBDD.bdd));
    });
}
function ejecutarAcccion() {
    return map(// Respuesta del anterior OBS
    function (respuestaBDD) {
        var opcion = respuestaBDD.opcionMenu.opcionMenu;
        switch (opcion) {
            case 'Crear':
                var participantes = respuestaBDD.participantes;
                respuestaBDD.bdd.participantes.push(participantes);
                return respuestaBDD;
            case 'Actualizar':
                var idActualizar = respuestaBDD.id;
                if (idActualizar === -1) {
                    console.error('Error no existe ese participantes');
                }
                else {
                    respuestaBDD.bdd.participantes[idActualizar].nombre = respuestaBDD.participantes.nombre;
                    console.log('participantes Actulizado con exito');
                }
                return respuestaBDD;
            case 'Buscar':
                var idBuscar = respuestaBDD.id;
                if (idBuscar === -1) {
                    console.error('Error no existe ese participantes');
                }
                else {
                    console.log('participantes encontrado : ', respuestaBDD.bdd.participantes[idBuscar]);
                }
                return respuestaBDD;
            case 'Borrar':
                var idBorrar = respuestaBDD.id;
                if (idBorrar === -1) {
                    console.error('Error No existe registro');
                }
                else {
                    console.log('participantes borrado del registro !!', respuestaBDD.bdd.participantes[idBorrar]);
                    var a = respuestaBDD.bdd.participantes;
                    a.splice(respuestaBDD.bdd.participantes[idBorrar], 1);
                }
                return respuestaBDD;
        }
    });
}
function buscarParticipantePorId(respuestaBDD) {
    return rxjs
        .from(inquirer.prompt(preguntaBuscarRegistro))
        .pipe(mergeMap(// RESP ANT OBS
    function (respuesta) {
        var participanteEncontrado = respuestaBDD.bdd.participantes
            .find(function (participante) {
            return participante.id === respuesta.id;
        });
        respuestaBDD.participantes = participanteEncontrado;
        return rxjs.of(respuestaBDD);
    }));
}
function actualizarParticipantePorId(respuestaBDD) {
    return rxjs
        .from(inquirer.prompt(preguntaActualizarRegistro))
        .pipe(mergeMap(// RESP ANT OBS
    function (respuesta) {
        // console.log(respuesta);
        var idParticipante = respuestaBDD.bdd
            .participantes
            .findIndex(// -1
        function (participante) {
            // console.log(participantes);
            return participante.id === respuesta.id;
        });
        if (idParticipante === -1) {
            console.log('El id no existe, Intente nuevamente \n');
            return actualizarParticipantePorId(respuestaBDD);
        }
        else {
            respuestaBDD.id = idParticipante;
            return rxjs
                .from(inquirer.prompt(preguntaActualizarRegistro))
                .pipe(map(function (nombre) {
                respuestaBDD.participantes = {
                    id: null,
                    nombre: nombre.nombre,
                    direccion: null,
                    telefono: null,
                    tipo: null,
                    edad: null,
                    talla: null,
                    patrocinador: null,
                };
                return respuestaBDD;
            }));
        }
    }));
}
function eliminarParticipantePorId(respuestaBDD) {
    return rxjs.from(inquirer.prompt(preguntaEliminarRegistro))
        .pipe(mergeMap(function (respuesta) {
        var indiceDelParticipante = respuestaBDD.bdd.participantes.findIndex(function (participante) {
            return participante.id === respuesta.id;
        });
        console.log(indiceDelParticipante);
        var resultadoSplice = respuestaBDD.bdd.participantes.splice(indiceDelParticipante, 1);
        return rxjs.of(respuestaBDD);
    }));
}
main();
