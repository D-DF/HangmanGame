const readlineSync   = require('readline-sync');
const {readFileSync} = require('fs');
const chalk          = require('chalk');
const {randomInt}    = require('crypto');
// Lecture du fichier ou sont les mots
const dictionnaire   = readFileSync('dic.txt', 'utf-8');
// Récupération des mots dans un tableau
const tableauDeMot   = dictionnaire.split("\n");
// Choix d'un mot au hasard grâce à randomInt
const indexHasard    = randomInt(0, tableauDeMot.length);
let mot              = tableauDeMot[indexHasard].toLowerCase();
let lettre           = mot.split("");
// Map me retourne un tableau avec la longueur du mot, mais en le remplacant par des _
let mapTabLettre     = lettre.map(el => '_');
let pendu            = ""
let question         = "";
let count            = -1;
let coup             = 7;
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
    if (lettre.includes(question)) {
      console.log(chalk.green(`Bravo, la lettre ${question}, fait partie du mot!`))
  
      for (let i = 0; i < mapTabLettre.length; i++) {
        if (lettre[i] === question) {
          //Je récupère l'index du mot
          let index = [i];
          // grâce à la méthode splice, il ajoute la lettre a l'index récupéré.
          mapTabLettre.splice(index, 1, question)
          pendu = mapTabLettre.join(' ');
        }
      }
    } else if (question === mot) {
      console.log(chalk.green(`Bravo, vous avez gagné, le mot est: ${question}`));
      process.exit(1)
    } else {
      count++;
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

