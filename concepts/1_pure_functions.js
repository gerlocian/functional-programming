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
 * This is a pure function that will return a boolean that is based on whether
 * a person object passed in is male.
 */
const isMale = person => person.gender === 'male';

/**
 * This is a pure function that will find all the male people in an array of
 * people. Notice how it uses the "isMale" method above. This is another
 * cornerstone of functional programming which is that all methods compose well
 * together.
 */
function findMales(people) {
    return people.filter(isMale);
}



