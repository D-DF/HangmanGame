// Dépendance et module 
const readlineSync   = require('readline-sync');
const {readFileSync} = require('fs');
const chalk          = require('chalk');
const {randomInt}    = require('crypto');
// -- Programme de récupèration du mot depuis le fichier, puis avoir un mot au hasard
const dictionnaire = readFileSync('dic.txt', 'utf-8');
const tableauDeMot = dictionnaire.split("\n");
const indexHasard  = randomInt(0, tableauDeMot.length);
let mot            = tableauDeMot[indexHasard].toLowerCase();
let lettre         = mot.split("");


const hangman = [`
  +---+
  |   |
      |
      |
      |
      |
=========`, `
  +---+
  |   |
  O   |
      |
      |
      |
=========`, `
  +---+
  |   |
  O   |
  |   |
      |
      |
=========`, `
  +---+
  |   |
  O   |
 /|   |
      |
      |
=========`, `
  +---+
  |   |
  O   |
 /|\  |
      |
      |
=========`, `
  +---+
  |   |
  O   |
 /|\  |
 /    |
      |
=========`, `
  +---+
  |   |
  O   |
 /|\  |
 / \  |
      |
=========`]

// Tableau de bonne réponse

let question = "";
let count    = -1;
let coup     = 7;
console.log(mot)

do {
    question = readlineSync.question(`Quel mot ou lettre voulez vous choisir ? - `);
    if(lettre.includes(question)) {
        console.log(chalk.green(`Bravo, la lettre ${question}, fait partie du mot! Il vous reste ${coup} coups`))
        coup--;
    } else if (question === mot) {
        console.log(chalk.green(`Bravo, vous avez gagné!`));
        process.exit(1)
    } else {
        count++;
        console.log(chalk.red(`C'est faux, la lettre ${question} n'est pas dans le mot, il vous reste ${coup} coups
        ${hangman[count]}`))
        coup--;
    }

    if(count === hangman.length) {
        console.log("Vous avez perdu")
        process.exit(1)
    }
} while(question !==mot)

