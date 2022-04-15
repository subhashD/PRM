const mongoose = require('mongoose');
const GenderSeeder = require('./seeds/GenderSeeder');

const parameters = process.argv;
const seedAll = parameters.length > 2 ? false : true;

if(seedAll) {
    // run all the class added to the call list
    const callStack = [
        GenderSeeder
    ];

    for(const className of callStack) {
        const object = new className;
        object.seedDB();
    }
} else {
    const classIndex = parameters.indexOf('--class');
    let tempName = null;
    if (classIndex > -1) {
        // Retrieve the value after --custom
        tempName = parameters[classIndex + 1];
    }
    const className = tempName.charAt(0).toUpperCase() + tempName.slice(1) + 'Seeder';
    const instantiateClass = eval(className);
    
    const object = new instantiateClass;
    object.seedDB();
    // run only the selected seeder class
}