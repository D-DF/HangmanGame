const readlineSync   = require('readline-sync');
const {readFileSync} = require('fs');
const chalk          = require('chalk');
const {randomInt}    = require('crypto');
const dictionnaire   = readFileSync('dic.txt', 'utf-8');
const tableauDeMot   = dictionnaire.split("\n");
const indexHasard    = randomInt(0, tableauDeMot.length);
let mot              = tableauDeMot[indexHasard].toLowerCase();
let lettre           = mot.split("");
let mapTabLettre     = lettre.map(el => '_');
let pendu            = ""
let question         = "";
let count            = -1;
let coup             = 7;
let score            = 0;
console.log(mot)

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

do {
  question = readlineSync.question(chalk.blue(`Quel mot ou lettre voulez vous choisir ? ${pendu} 
Entrez votre lettre: `));

  if(isNaN(question)) {
    if(pendu.includes(question)) {
      console.log(chalk.yellow(`Vous avez déjà entrer cette lettre`))
    } else if (lettre.includes(question)) {
        console.log(chalk.green(`Bravo, la lettre ${question}, fait partie du mot!`));
        score++;
        for (let i = 0; i < mapTabLettre.length; i++) {
          if (lettre[i] === question) {
            let index = [i];
            mapTabLettre.splice(index, 1, question)
            pendu = mapTabLettre.join(' ');
          }
        }
    } else if (question === mot) {
      console.log(chalk.green(`Bravo, vous avez gagné, vous avez réussi en ${score} coups!`));
      score++;
      process.exit(1)
    } else {
      count++;
      score++;
      console.log(chalk.red(`C'est faux, il vous reste ${coup} coups
          ${hangman[count]}`))
      coup--;
    }
    if (coup === -1) {
      console.log("Vous avez perdu")
      process.exit(1)
    }
  } else {
    console.log(chalk.red(`Vous n'avez pas entrer une lettre`))
  }
} while (question !== mot)

