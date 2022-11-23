// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
}

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
}

// Factory function that returns the number of the specimen and the array of 15 DNA bases
const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,
    // Mutate method that changes one random base to another base (can't change to same base)
    mutate() {
      // Random index (one of the 15 bases) of the DNA strand
      let i = Math.floor(Math.random() * this.dna.length);
      // Target base letter
      let oldBase = this.dna[i];
      // Swapping out (mutating) the randomly chosen base on the DNA strand
      let newBases = ['A', 'T', 'C', 'G']; // Added this array so that the original dnaBases does not mutate
      newBases.splice(newBases.indexOf(oldBase), 1); // Removes one random base
      let mutatedBase = newBases[Math.floor(Math.random() * 3)]; // Chooses one of three remaining bases randomly
      // console.log(pAequorFactory(1, mockUpStrand()).mutate()); at global scope needed to view the code below
      console.log(`Changed ${oldBase} to ${mutatedBase} on index number ${i}`);
      return this.dna.splice(i, 1, mutatedBase) // returns the removed base in oldBase back to the dna array. Undefined if not included
    },
    // Compares DNA between two random pAequors, showing the percentage of same bases at each index
    compareDNA(otherPAequor) {
      // for loop that counts the number of same position bases in the 2 dna strands
      let count = 0;
      for (let i = 0; i < otherPAequor.length; i++) {
        if (this.dna[i] === otherPAequor[i]) {
          count ++;
        }
      }
      // Arithmetic to calculate same base percentage
      count /= 15;
      count *= 100;
      // Use .parseFloat and .toFixed
      console.log(`The two strands are ${Number.parseFloat(count).toFixed(0)}% the same.`);
      return `The count value is: ${count}`; // Have to add this or output will show undefined
    },
    // This method returns true of DNA array contains at least 60% 'C' or 'G' bases
    willLikelySurvive() {
      const cAndG = this.dna.filter(letter => letter === 'C' || letter === 'G');
      if (cAndG.length / this.dna.length > 0.6) {
        return true;
      } else {
        return false;
      }
    } 
  }
};

// 30 instances of pAequor that can survive
let multipleInstances = [];
let i = 0;
while (multipleInstances.length < 30) {
  let trial = pAequorFactory(i, mockUpStrand());
  if (trial.willLikelySurvive() === true) {
    multipleInstances.push(trial);
    i += 1;
  }
};

// Function check
const randomSpecies = pAequorFactory(1, mockUpStrand());
console.log(randomSpecies.dna); // Array of the random DNA string
console.log(randomSpecies.mutate()); // Displays index number of where one base was changed to another base
console.log(randomSpecies.compareDNA(mockUpStrand())); // "The two strands are ...% the same"
console.log(randomSpecies.willLikelySurvive()); // true or false
console.log(multipleInstances); // 30 instances of pAequor DNA strings likely to survive