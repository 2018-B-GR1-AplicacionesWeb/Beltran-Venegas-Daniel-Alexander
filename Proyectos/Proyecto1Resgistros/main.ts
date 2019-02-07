declare var Promise:any;
const inquirer = require('inquirer');
const fs = require('fs');
const rxjs = require('rxjs');
const mergeMap = require('rxjs/operators').mergeMap;
const map = require('rxjs/operators').map;
const base = 'bdd.json';

const preguntaMenu = {
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

const preguntaBuscarRegistro = {
  type: 'input',
  name: 'id',
  message: 'Ingrese la ID del participantes a buscar: '};

const preguntaEliminarRegistro = {
  type: 'input',
  name: 'id',
  message: 'Ingrese la ID del participantes a eliminar: '};

const preguntaActualizarRegistro = {
  type: 'input',
  name: 'id',
  message: 'Ingrese la ID del participantes a actualizar: '};

const preguntasIngresarRegistro = [
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
      const valid = !isNaN(parseFloat(value));
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
  return new Promise(
    (resolve, reject) => {
      fs.readFile(base, 'utf-8',
        (error, contenidoArchivo) => { // CALLBACK
          if (error) {
            fs.writeFile(base, '{"Participantes":[]}',
              (error) => {
                if (error) {
                  reject({
                    mensaje: 'ERROR AL CREAR BASE',
                    error: 500
                  })
                } else {
                  resolve({
                    mensaje: 'BDD LEÍDA',
                    bdd: JSON.parse('{"Participantes":[]}')
                  })
                }

              }
            )

          } else {
            resolve({
              mensaje: 'BDD LEÍDA',
              bdd: JSON.parse(contenidoArchivo)
            })
          }
        }
      )
    }
  );
}

function main() {
  const respuestaBDD$ = rxjs.from(inicialiarBDD());
  respuestaBDD$
    .pipe(
      opcionDeMenu(),
      opcionDeRespuesta(),
      ejecutarAcccion(),
      guardarBaseDeDatos()
    )
    .subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      },
      () => {
        main();
        console.log('Complete');
      }
    )
}

function guardarBDD(bdd: BDD) {
  return new Promise(
    (resolve, reject) => {
      fs.writeFile(base, JSON.stringify(bdd),
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

function opcionDeMenu() {
  return mergeMap( // Respuesta Anterior Observable
    (respuestaBDD: RespuestaBDD) => {
      return rxjs
        .from(inquirer.prompt(preguntaMenu))
        .pipe(
          map( // respuesta ant obs
            (respuesta: OpcionesMenu) => {
              respuestaBDD.opcionMenu = respuesta;
              return respuestaBDD
            }
          )
        );
    }
  )
}

function opcionDeRespuesta() {
  return mergeMap(
    (respuestaBDD: RespuestaBDD) => {
      const opcion = respuestaBDD.opcionMenu.opcionMenu;
      switch (opcion) {
        case 'Crear':
          return rxjs
            .from(inquirer.prompt(preguntasIngresarRegistro))
            .pipe(
              map(
                (participante: Participantes) => { // resp ant OBS
                  respuestaBDD.participantes = participante;
                  return respuestaBDD;
                }
              )
            );
        case 'Buscar':
          return buscarParticipantePorId(respuestaBDD);
          break;
        case 'Actualizar':
          return actualizarParticipantePorId(respuestaBDD);
        case 'Borrar':
          return eliminarParticipantePorId(respuestaBDD);
          break;
      }
    }
  )
}

function guardarBaseDeDatos() {
  return mergeMap(// Respuesta del anterior OBS
    (respuestaBDD: RespuestaBDD) => {
      // console.log(respuestaBDD.bdd);
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
          const participantes = respuestaBDD.participantes;
          respuestaBDD.bdd.participantes.push(participantes);
          return respuestaBDD;
        case 'Actualizar':
          const idActualizar = respuestaBDD.id;
          if (idActualizar===-1) {
            console.error('Error no existe ese participantes')
          } else {
            respuestaBDD.bdd.participantes[idActualizar].nombre = respuestaBDD.participantes.nombre;
            console.log('participantes Actulizado con exito');
          }
          return respuestaBDD;
        case 'Buscar':
          const idBuscar = respuestaBDD.id;
          if (idBuscar === -1) {
            console.error('Error no existe ese participantes')
          } else {
            console.log('participantes encontrado : ', respuestaBDD.bdd.participantes[idBuscar])
          }
          return respuestaBDD;
        case 'Borrar':
          const idBorrar = respuestaBDD.id;
          if (idBorrar === -1) {
            console.error('Error No existe registro')
          } else {
            console.log('participantes borrado del registro !!', respuestaBDD.bdd.participantes[idBorrar]);
            const a = respuestaBDD.bdd.participantes
            a.splice(respuestaBDD.bdd.participantes[idBorrar], 1)
          }
          return respuestaBDD;
      }
    }
  )
}

function buscarParticipantePorId(respuestaBDD: RespuestaBDD) {
  return rxjs
    .from(inquirer.prompt(preguntaBuscarRegistro))
    .pipe(
      mergeMap( // RESP ANT OBS
        (respuesta: BuscarRegistroPorId) => {
          const participanteEncontrado = respuestaBDD.bdd.participantes
            .find(
              (participante)=>{
                return participante.id === respuesta.id;
              }
            )
          respuestaBDD.participantes = participanteEncontrado;
          return rxjs.of(respuestaBDD);
        }
      )
    );
}

function actualizarParticipantePorId(respuestaBDD: RespuestaBDD) {
  return rxjs
    .from(inquirer.prompt(preguntaActualizarRegistro))
    .pipe(
      mergeMap( // RESP ANT OBS
        (respuesta: BuscarRegistroPorId) => {
          // console.log(respuesta);
          const idParticipante = respuestaBDD.bdd
            .participantes
            .findIndex( // -1
              (participante: Participantes) => {
                // console.log(participantes);
                return participante.id === respuesta.id
              }
            );
          if (idParticipante === -1) {
            console.log('El id no existe, Intente nuevamente \n');
            return actualizarParticipantePorId(respuestaBDD);
          } else {
            respuestaBDD.id = idParticipante;
            return rxjs
              .from(inquirer.prompt(preguntaActualizarRegistro))
              .pipe(
                map(
                  (nombre:{nombre:string})=>{
                    respuestaBDD.participantes ={
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
                  }
                )
              );
          }
        }
      )
    );
}

function eliminarParticipantePorId(respuestaBDD: RespuestaBDD) {
  return rxjs.from(inquirer.prompt(preguntaEliminarRegistro))
    .pipe(
      mergeMap(
        (respuesta: EliminarParticipantePorId)=>{
          const indiceDelParticipante = respuestaBDD.bdd.participantes.findIndex((participante)=>{
            return participante.id === respuesta.id;
          });
          console.log(indiceDelParticipante)
          const resultadoSplice = respuestaBDD.bdd.participantes.splice(indiceDelParticipante,1);
          return rxjs.of(respuestaBDD);
        }
      )
    )
}

interface OpcionesMenu {
  opcionMenu: 'Crear' | 'Borrar' | 'Buscar' | 'Actualizar'
}

interface Participantes {
  id: number,
  nombre: string,
  direccion: string,
  telefono: string,
  tipo: string,
  edad: number,
  talla: string,
  patrocinador: string,
}

interface BDD {
  participantes: Participantes[] | any;
}

interface RespuestaBDD {
  mensaje: string,
  bdd: BDD,
  opcionMenu: OpcionesMenu,
  participantes?: Participantes,
  id?: number

}

interface BuscarRegistroPorId {
  id: number;
}

interface EliminarParticipantePorId {
  id: number;
}

main();