const inquirer = require('inquirer');
const path = require('path');

const data = require('./registros');
const print = require('./imprimir');

const filename = 'registros.json';
const filepath = `${path.resolve('.')}/${filename}`;
const items = data.load(filepath);
const options = [
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

inquirer.prompt(options).then(answers => {
    items.push({
        nombre: answers.nombre,
        direccion: answers.direccion,
        telefono: answers.telefono,
        tipo: answers.tipo,
        edad: answers.edad,
        talla: answers.talla,
        patrocinador: answers.patrocinador
    });

    data.save(filepath, items);
    print.printList(items);
})