const readlineSync   = require('readline-sync');
const {readFileSync} = require('fs');
let fichier = "dic.txt"
let dictionnaire = ""
try {
  dictionnaire = readFileSync(fichier, 'utf-8');
} catch (e) {
  if (e.code === 'ENOENT') {
    console.error(`Error: ${e.code}: file does not exist`)
    process.exit(1)
  } else if (e.code === 'EISDIR') {
    console.error(`Error: ${e.code}: is a directory`)
    process.exit(1)
  } else if (e.code === 'EACCES') {
    console.error(`Error: ${e.code} access denied`)
    process.exit(1)
  } else {
    console.log(e.message)
  }
}

const chalk          = require('chalk');
const {randomInt}    = require('crypto');
const tableauDeMot   = dictionnaire.split("\n");
const indexHasard    = randomInt(0, tableauDeMot.length);
let mot              = tableauDeMot[indexHasard].toLowerCase();
let lettre           = mot.split("");
let mapTabLettre     = lettre.map(el => '_');
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
  question = readlineSync.question(chalk.blue(`Quel mot ou lettre voulez vous choisir ? ${mapTabLettre.join(' ')} 
Entrez votre lettre ou mot: `)).toLowerCase();

  if (isNaN(question)) {
    if (mapTabLettre.join(' ').includes(question)) {
      console.log(chalk.yellow(`Vous avez déjà entrer cette lettre`))
    } else if (lettre.includes(question)) {
      score++;
      console.log(chalk.green(`Bravo, la lettre ${question}, fait partie du mot!`));
      
      for (let i = 0; i < mapTabLettre.length; i++) {
        if (lettre[i] === question) {
          let index = [i];
          mapTabLettre.splice(index, 1, question)
          mapTabLettre.join(' ');

          if(mapTabLettre.join('') === mot) {
            score++;
            console.log(chalk.green(`Bravo vous avez gagné! Vous avez réussi en ${score} coups!🏆`));
            process.exit(1)
          }
        }
      }
    } else if (question === mot) {
      score++;
      console.log(chalk.green(`Bravo vous avez gagné! Vous avez réussi en ${score} coups!🏆`));
      process.exit(1)
    } else {
      count++;
      score++;
      console.log(chalk.red(`C'est faux, il vous reste ${coup} coups 😰
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
