const people = require('../data/people');

/**
 *
 * Recursion
 *
 * Simply put, a recursion is a function that calls itself until some condition
 * causes it not to. There are many reasons for wanting to do this. Maybe you
 * want to loop through an array performing actions as you go until you get to
 * the end of the array. Maybe you want to count a series of numbers from x to
 * y. Or maybe you just want to create a fibonacci sequence. In all counts, you
 * can perform these actions with a recursive function.
 *
 * @link https://www.youtube.com/watch?v=k7-N8R0-KY4
 *
 */

/**
 * Simple recursive method that creates a list of numbers from 10 to 1.
 * Remember, we want to create and use pure functions.
 */
const decreaseFrom = (num) => {
    if (num === 0) return;         // stop the recursion by returning.
    console.log('DECREASE:', num); // output the result.
    decreaseFrom(num - 1);         // decrease number and go again.
};

decreaseFrom(10);
console.log(); // skip a line in the output for easier reading.

/**
 * Here, we use a recursive method to loop through the contents of people array
 * and output the name of each person.
 */
const peopleNames = (index = 0) => {
    if (index >= people.length) return;
    console.log('PEOPLE:', people[index].name);
    peopleNames(index + 1);
};

peopleNames();
console.log(); // skip a line in the output for easier reading.

/**
 * Add of course, where would we be if we didn't put in a fibonacci sequence
 * example.
 */
const fibonacci = (number = 1) => {
    if (number < 2)
        return 1;
    else
        return fibonacci(number - 2) + fibonacci(number - 1);
}
console.log('FIBONNACI 4:',  fibonacci(4));
console.log('FIBONNACI 7:',  fibonacci(7));
console.log('FIBONNACI 11:', fibonacci(11));
console.log(); // skip a line in the output for easier reading.

/**
 * So far, these are very simple implementations. Lets do something a little
 * harder. I will blatantly pull this example from MPJ's YouTube video (link
 * in the header comments above).
 *
 * We have a data structure below that references a hierarchy of animals.
 */
const animals = [
    { 'id': 'animals',      'parent': null },
    { 'id': 'mammals',      'parent': 'animals' },
    { 'id': 'cats',         'parent': 'mammals' },
    { 'id': 'dogs',         'parent': 'mammals' },
    { 'id': 'chihuahua',    'parent': 'dogs' },
    { 'id': 'labrador',     'parent': 'dogs' },
    { 'id': 'persian',      'parent': 'cats' },
    { 'id': 'siamese',      'parent': 'cats' }
];

/**
 * We want to take if from it's primitive flat form and recreate it as a tree
 * view like this.
 *
 * {
 *   animals: {
 *    mammals: {
 *      dogs: {
 *        chihuahua: null,
 *        labrador: null
 *      },
 *      cats: {
 *         persian: null,
 *         siamese: null
 *     }
 *   }
 * }
 *
 * Let's create a function that recurses through our data set and builds the
 * tree we are expecting.
 */
const hasParent =
    (parent) =>
        (animal) =>
            animal.parent === parent;

const assignTo =
    (tree) =>
        (list) =>
            (item) =>
                tree[item.id] = makeTree(list)(item.id);

const makeTree = (animals) =>
    (parent) => {
        let nodes = {};

        animals
            .filter(hasParent(parent))
            .forEach(assignTo(nodes)(animals));

        return nodes;
    };

console.log('ANIMALS:\n', JSON.stringify(makeTree(animals)(null), null, 2));
