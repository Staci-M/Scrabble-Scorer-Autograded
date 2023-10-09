// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //


function initialPrompt() {
   console.log("Let's play some scrabble!\n");
   let word = input.question('Enter a word to score: ');

   return word;
};
// console.log(oldScrabbleScorer(initialPrompt()));


let simpleScorer = function(word){
   word = word.toUpperCase();
   let points = 0;
   for(let i = 0; i < word.length; i++){
      points += 1;
   }
   return points
};

// console.log(simpleScorer(initialPrompt()));


let vowelBonusScorer = function(word){
word = word.toUpperCase();
splitWord = word.split('');
  points = 0;
  for (let i = 0; i < splitWord.length; i++) {
    if (splitWord[i] === 'A' || splitWord[i] === 'E' || splitWord[i] === 'I' || splitWord[i] === 'O' || splitWord[i] === 'U') {
      points += 3;
    } else {
      points++;
    }
  }
  return points;
};

// console.log(vowelBonusScorer(initialPrompt()));

let scrabbleScorer = function(word){
   word = word.toLowerCase();
   let points = 0;
   for(let i = 0; i < word.length; i++){
      points += newPointStructure[word[i]];
   }
   return points;
};

const scoringAlgorithms = [
   {
      name: "Simple Score",
      description: "Each letter is worth 1 point.",
      scorerFunction: simpleScorer
   },
   {
      name: "Bonus Vowels",
      description: "Vowels are 3 pts, consonants are 1 pt.",
      scorerFunction: vowelBonusScorer

   },
   {
      name: "Scrabble",
      description: "The traditional scoring algorithm.",
      scorerFunction: scrabbleScorer
   }

];

function scorerPrompt() {
   let word = initialPrompt();
   let scoreSelection = input.question(`Which scoring method would you like to use:\n1 = ${scoringAlgorithms[0].name}\n${scoringAlgorithms[0].description}\n2 = ${scoringAlgorithms[1].name}\n${scoringAlgorithms[1].description}\n3 = ${scoringAlgorithms[2].name}\n${scoringAlgorithms[2].description}\nEnter 1, 2, or 3: `);

   scoreSelection = Number(scoreSelection);

   console.log(`The ${scoringAlgorithms[scoreSelection-1].name}:\nscoring function result is ${scoringAlgorithms[scoreSelection-1].scorerFunction(word)}`)

   return scoringAlgorithms[Number(scorerPrompt)]
}

// console.log(scorerPrompt());

function transform(oldPointSystem) {
   let newPointSystem = {};
   for(pointValueKey in oldPointSystem){
      for( i = 0; i < oldPointSystem[pointValueKey].length; i++){
         newPointSystem[oldPointSystem[pointValueKey][i].toLowerCase()] = Number(pointValueKey);
      }
   }
   return newPointSystem;
};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
   initialPrompt();
   scorerPrompt()
   
}

runProgram();
// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
