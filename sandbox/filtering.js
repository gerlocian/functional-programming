const animals = [
    { name: 'Snickers', type: 'dog' },
    { name: 'Misty',    type: 'cat' },
    { name: 'Coco',     type: 'rat' },
    { name: 'Lola',     type: 'rat' },
    { name: 'Shawna',   type: 'dog' },
    { name: 'Mert',     type: 'turtle' }
];

function isDog(animal) {
    return animal.type === 'dog';
}

function isCat(animal) {
    return animal.type === 'cat';
}

function isRat(animal) {
    return animal.type === 'rat';
}

function isTurtle(animal) {
    return animal.type === 'turtle';
}

function findDogs(animals) {
    return animals.filter(isDog);
}

function findCats(animals) {
    return animals.filter(isCat);
}

function findRats(animals) {
    return animals.filter(isRat);
}

function findTurtles(animals) {
    return animals.filter(isTurtle);
}

function getNameOfAnimal(animal) {
    return animal.name;
}

console.log(
    animals.filter(isDog).map(getNameOfAnimal).sort()
);