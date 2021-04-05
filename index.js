const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);

// Function that creates the array of questions for user

function promptUser() {
    return inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of your project?',
            name: 'title'
        },
        {
            type: 'input',
            message: 'Please enter a description of your project?',
            name: 'description'
        },
        {
            type: 'input',
            message: 'Describe how your application to be used?',
            name: 'usage'
        },
        {
            type: 'input',
            message: 'What technologies were used for this project?',
            name: 'technologies'
        },
        {
            type: 'input',
            message: 'Who are the contributors to this project?',
            name: 'author'
        },
        {
            type: 'input',
            message: 'Cite your work for the project.',
            name: 'credits'
        },
        {
            type: 'list',
            message: 'Please select a license.',
            choices: [
                'Apache',
                'MIT',
                'ISC',
                'GNU GPLv3',
                'Free'
            ],
            name: 'license'
        },
    ]);
}

function generateMarkdown(response) {
    return `
# ${response.title}

### Table of Contents:

- [Descritption](#description)
- [Usage](#usage)
- [Technologies](#technologies)
- [Author](#author)
- [Credits](#credits)
- [License](#license)

## Description:
![License](https://img.shields.io/badges/License-${response.license}-blue.svg "License Badge")

    ${response.description}

## How to Use:
    
    ${response.usage}

## Technologies:
    
    ${response.technologies}

## Author Info:
    
    ${response.author}
    
## Credits:
    
    ${response.credits}

## License:
    For more information about the license, click on the link below.

- [License](https://unlicense.org/${response.license})

`;
}

//Function to initialize program
async function init() {
    try {
        const response = await promptUser();
            console.log(response);
        const readMe = generateMarkdown(response);

        await writeFileAsync('README.md', readMe);
        console.log('Success!');
    } catch (err) {
        console.log(err);
    }
}

//Function call to initialize program
init();
