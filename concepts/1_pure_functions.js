/**
 *
 * Pure Functions
 *
 * A pure function is a function that only relies on the inputs to the,
 * function to determine the returned output. Another way of saying this is
 * that a pure function doesn't depend on or modify anything outside it's own
 * scope. In this way, a pure function will always give the same results when
 * provided with the same inputs because it doesn't rely on the state of the
 * environment to determine return values.
 *
 * Because of this, pure functions allow you to only worry about the body of
 * the function, and reduces the cognitive load of programming.
 *
 * @link https://medium.com/@chetcorcos/functional-programming-for-javascript-people-1915d8775504#.vb9emteh4
 * @link http://www.nicoespeon.com/en/2015/01/pure-functions-javascript/
 * @link http://alistapart.com/article/making-your-javascript-pure/
 *
 */

/**
 * This is a pure function that will always return the square of a number
 * provided to it.
 */
const square = x => x * x;

/**
 * These are pure functions that will return a boolean that is based on the
 * value of gender of the passed object.
 */
const isMale   = person => person.gender === 'male';
const isFemale = person => person.gender === 'female';

/**
 * This is a pure function that will find all the males in an array of people.
 * Notice how it uses the "isMale" and "isFemale" method above. This is another
 * cornerstone of functional programming which is that all methods compose well
 * together. More on this later.
 */
const findMales   = people => people.filter(isMale);
const findFemales = people => people.filter(isFemale);

/**
 * In addition, we can use pure functions to fuel higher order functions. For
 * example, we can use a pure function to convert the data of a people array
 * using the higher order function "map".
 */
const getName = person => person.name;
const collectNames = people => people.map(getName);

/**
 * EXAMPLES:
 */
const people = [
    {
        name: 'Patrick',
        gender: 'male'
    },
    {
        name: 'Bob',
        gender: 'male'
    },
    {
        name: 'Beverly',
        gender: 'female'
    },
    {
        name: 'Zoe',
        gender: 'female'
    },
    {
        name: 'James',
        gender: 'male'
    },
    {
        name: 'Finley',
        gender: 'female'
    }
];

// Square examples.
console.log('SQUARE:', square(2));
console.log('SQUARE:', square(100));
console.log('SQUARE:', square(86));

// Finding males and females in the array.
console.log('MALES:', findMales(people));
console.log('FEMALES:', findFemales(people));

// Getting an array of all the names of people.
console.log('NAMES:', collectNames(people));

// Finally composing these methods to get only the names of all the males and
// then all the females.
console.log('MALE NAMES:', people.filter(isMale).map(getName));
console.log('FEMALE NAMES:', people.filter(isFemale).map(getName));





