class User {
    constructor(pseudo, score) {
        this.pseudo = pseudo;
        this.score  = score;
    }
}

const alice = new User('Alice', 7)
console.log(alice)