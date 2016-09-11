const fs = require('fs');
const path = require('path');
const pets = require('../data/pets');
const peoplePath = path.resolve(__dirname, '..', 'data', 'people.js');

/**
 *
 * Function Currying
 *
 * Function currying is the action of taking a function that expects multiple
 * arguments, and recreating it in a way where you stagger the delivery of
 * those arguments. This can be a useful pattern in examples where you want to
 * use a function that uses the same arguments, or want to set a condition in
 * your code that you want to pass around. Because javascript is a functional
 * language, and functions can be passed around like other values, this means
 * that you can setup a function as you need it and then pass it around for
 * further processing later.
 *
 * @link https://medium.com/@kbrainwave/currying-in-javascript-ce6da2d324fe#.ui4b7lk8g
 * @link https://www.sitepoint.com/currying-in-functional-javascript/
 *
 */

/**
 * Let's look at an example, at the top of the file, we pulled in a pets array
 * with pet data. Let set up a function that returns all the pets based on
 * species and age.
 */
const findPets = (species, age) => {
    return pets.filter(pet => species === pet.species && age === pet.age);
};

/**
 * This will work fine because we give it the pets array, the species we want
 * to find, and then the age we're looking for and we get back a list of all
 * the pets that fill that criteria. For most cases where you know all this
 * information up front, this works just fine.
 */
// Prints [ { name: 'Shawna', species: 'dog', "age": 16 } ];
console.log(findPets('dog', 16));

/**
 * But what happens if we don't have all the information we need up front?
 * We could wait until we have all the information to begin the search, but
 * what if we need to execute this search elsewhere? This is where function
 * currying comes in. Here's the same function, but made in the curry
 * pattern.
 */
const findPetsCurry = (species) => {
    return (age) => {
        return pets.filter((pet) => {
            return species === pet.species
                && age === pet.age;
        });
    }
};

/**
 * This can be a little confusing, so lets step through it. First we create a
 * function that takes the species we're looking for. That in turn returns
 * another function that takes the age we want to find. Finally, that returns
 * the function that will then return the results. With this, we can create a
 * function that we can pass around that allows us to create this query as we
 * have the information we're looking to find. In fact, we can pass this around
 * mid way through execution so that other functions and processes can further
 * the information requested as the software continues to process. For example:
 */
const getDogs = findPetsCurry('dog');
const getCats = findPetsCurry('cat');

console.log(getDogs(16)); // [ { name: 'Shawna', species: 'dog', "age": 16 } ];
console.log(getCats(16)); // [ { name: 'Misty',  species: 'cat', "age": 16 } ];

/**
 * A better, more practical example of this might be setting up file reads with
 * callbacks. A function can be setup to read from a specific file and then
 * passed around until the contents are actually needed. In this way, you can
 * abstract a lot of the processes of setting up file reads to a single
 * function and have that return the actual process of the read. See below:
 */
const readFile = (path) => {
    return (options) => {
        return (callback) => {
            fs.readFile(path, options, callback);
        }
    }
};

const readPeople = readFile(peoplePath)('utf8');

/**
 * In this example, readPeople has been created to read from the people.js file
 * in UTF-8 format. At this point however, the processing hasn't started and
 * the function is waiting only for the callback to know what to do with the
 * data. We can pass readPeople around until we're ready to give it the
 * callback. Let's say we passed it to another function. It can now do
 * something like this.
 */
readPeople((err, data) => {
    if (err) throw new Error('Can not read file');
    console.log(data);
});

/**
 * This will return the contents of the file. Notice that the only thing the
 * code did at this point was setup the callback. No processing was needed to
 * setup the file read nor did the method that function this code have to know
 * where the file was. The only thing it was responsible for was setting up
 * the callback to do the work it needed to do.
 *
 * This is very powerful. In fact, lets say we want to do something else with
 * the same file and will need to read it again. No sense is setting it up
 * again, because we've already done this. Now all we need is the reference
 * to the readPeople function and give it a different callback.
 */
readPeople((err, data) => {
    if (err) throw new Error('Can not read file');
    console.log(data.replace('\n', '').split('').reverse().join(''));
});

/**
 * In conclusion, function currying is strong tool to put in your belt. You
 * may not need to use this in every case, but starting to use them will not
 * hurt your program execution.
 */