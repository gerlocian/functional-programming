const people = require('../data/people');

/**
 *
 * Functional Composition
 *
 * So now that we understand pure functions, we can explore how they can be
 * combined to create new methods. This process is called composition, and what
 * it means is that we can take two or more pure functions and create a new
 * pure function that allows us to create more advanced logic.
 *
 * This is very powerful because this ties directly into everything we've ever
 * heard about programming with functions, which is that they allow for better
 * sustainable and reusable code.
 *
 * You can think about function composition like you would think about pipe,
 * "do something and then do something else with the result."
 *
 * Because of this, we can build more complicated logic around the data that
 * we pass into our pure functions relatively easily.
 *
 * In addition, in a functional programming language, method composition can be
 * a better alternative to object oriented programming since it doesn't force
 * us to understand the potential future of our project before considering how
 * to build our classes (more on this later).
 *
 * @link https://medium.com/@chetcorcos/functional-programming-for-javascript-people-1915d8775504#.jcbopkvmi
 * @link http://fr.umio.us/why-ramda/
 * @link https://www.youtube.com/watch?v=wfMtDGfHWpA
 *
 */

/**
 * Lets grab our isMale, findMale, getName, and getNames methods from the
 * previous section.
 */
const isMale = person => person.gender === 'male';
const findMale = people => people.filter(isMale);
const getName = person => person.name;
const getNames = people => people.map(getName);

/**
 * Now that we have those, lets compose these into a method that will return
 * only the names of males in a collection.
 */
const getMaleNames = people => getNames(findMale(people));

/**
 * That's it. When we invoke this with a collection of people, we will only
 * see the names of the males in the array. This is good because the areas we
 * have to find code to maintain it is reduced in this example.
 */
console.log('MALE NAMES:', getMaleNames(people));

/**
 * With composition, the ideas around object and type creation changes from
 * object oriented "design classes around what they are" to "design objects
 * around what they do" or "design objects around what they have." This
 * allows us to create our data structures in a way that we can easily add
 * functionality to them later, and have that functionality be accessible to
 * other structures that may need it.
 *
 * For example:
 * Lets say I want to create a Dog class, I could do something like this:
 *
 * class Dog {
 * }
 *
 * Ok simple enough, dogs need to be able to growl.
 *
 * class Dog {
 *     growl() { console.log('Grrrr'); }
 * }
 *
 * Ok still simple. Now we need to create a Wolf. Sure lets do that. Also
 * wolves howl.
 *
 * class Wolf {
 *     howl() { console.log('Arooo'); }
 * }
 *
 * Still simple. But now we need to have the Wolf growl too. Hmm. Ok.
 *
 * class Canine {
 *     growl() { console.log('Grrrr');
 * }
 *
 * class Dog extends Canine {
 * }
 *
 * class Wolf extends Canine {
 *     howl() { console.log('Arooo');
 * }
 *
 * Cool, I thought I had you. Lets create a fluffy kitty.
 *
 * class Cat {
 * }
 *
 * Let's make it able to purr.
 *
 * class Cat {
 *     purr() { console.log('Prrrr');
 * }
 *
 * Outstanding, this is going well. Here's the structure we have so far.
 *
 * Canine
 *   .growl()
 *
 *     Dog extends Canine
 *
 *     Wolf extends Canine
 *       .howl()
 *
 * Cat
 *   .purr()
 *
 * Now science has messed up everything and scientists have bred a cat with a
 * wolf. Shocking I know. Your project manager wants you to model this in your
 * code, but there is a problem. You see, this cat/wolf hybrid can purr and
 * and howl, but it can't growl. You don't want to extend Cat and re-implement
 * howl in your new code, and you can't extend two classes and then remove a
 * method, so at this point, your structure doesn't work. You will have to
 * completely restructure or think of something else.
 *
 * This is where composition shines.
 *
 * Consider thinking of your structures on the basis of what they do instead of
 * what they are.
 *
 * dog     = growler
 * wolf    = growler + howler
 * cat     = purrer
 * wolfcat = purrer + howler
 *
 * Based on this, we can create a structure that stores state, and then later
 * give it a pure function that will take in that state and do things with it.
 *
 * Here's some examples using the above information.
 *
 */
const growler = state => ({ growl: () => console.log(`Grrrr, says ${state.name}`) });
const howler  = state => ({ howl:  () => console.log(`Arooo, says ${state.name}`) });
const purrer  = state => ({ purr:  () => console.log(`Prrrr, says ${state.name}`) });

const dog = (() => {
    'use strict';

    let state = {
        name: 'Dog'
    };

    return Object.assign(
        {},
        growler(state)
    );
})();

const wolf = (() => {
    'use strict';

    let state = {
        name: 'Wolf'
    };

    return Object.assign(
        {},
        growler(state),
        howler(state)
    );
})();

const cat = (() => {
    'use strict';

    let state = {
        name: 'Cat'
    };

    return Object.assign(
        {},
        purrer(state)
    );
})();

const wolfcat = (() => {
    'use strict';

    let state = {
        name: 'Wolfcat'
    };

    return Object.assign(
        {},
        purrer(state),
        howler(state)
    );
})();

/**
 * So above we have three methods that define the things that can be done.
 * Below that we have four objects that assign those methods to their objects
 * in order to add them to the things that it can do. Because of this, we are a
 * good bit more flexible, and code can be reused wherever it is needed without
 * having to worry about a large inheritance structure.
 */
console.log('DOG:', dog);
dog.growl();

console.log('WOLF:', wolf);
wolf.growl();
wolf.howl();

console.log('CAT:', cat);
cat.purr();

console.log('WOLFCAT:', wolfcat);
wolfcat.purr();
wolfcat.howl();
