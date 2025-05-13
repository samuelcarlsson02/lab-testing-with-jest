const _ = require('underscore');

let stack = [];

// Lägger ett element överst i stacken
exports.push = function (x) {
    stack.push(x);
};

// Returnerar det översta elementet i stacken och tar bort det
exports.pop = function () {
    return "fail"; // Medvetet fel för att få testet att misslyckas
}

// Returnerar det översta elementet i stacken
exports.peek = function () {
    return _.last(stack);
}