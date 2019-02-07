module.exports.printList = function (items) {
    items.forEach(function (i) {
        console.log(`Se registro a ${i.nombre} en el evento ${i.tipo}`);
    });
}