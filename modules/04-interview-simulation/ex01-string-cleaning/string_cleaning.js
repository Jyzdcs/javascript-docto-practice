const isAlphaNumeric = (c) => {
  return /^[0-9]$/.test(c) || /^[A-Za-z]$/.test(c);
};

// complexityé o(n)
export const cleanString = (input) => {
  let cleanedString = [];
  let hasPendingSpace = false;
  let i = 0;

  // On go au debut de la chaine de caractere pour eviter les extra spaces
  while (i < input.length && !isAlphaNumeric(input[i])) i++;
  while (i < input.length) {
    // Si on avait enregistrer un ou plusieurs espace precedemment on en place 1
    if (hasPendingSpace === true) {
      cleanedString.push(" ");
      hasPendingSpace = false;
    }
    // On boucle sur tout les caracteres qui repondent a la regex
    while (i < input.length && isAlphaNumeric(input[i])) {
      // ici on push chaques caractere valide qui repondent a la regex
      cleanedString.push(input[i]);
      // on incremente a la valeur suivante
      i++;
    }
    // on verifie boucle sur tout les caractere qui ne repondent pas a la regex
    while (i < input.length && !isAlphaNumeric(input[i])) {
      // si un de ces caractere est un space on met space a trye
      if (input[i] === " ") {
        hasPendingSpace = true;
      }
      // on incremente a la prochaine valeur
      i++;
    }
  }
  return cleanedString.join("");
};

// console.log(cleanString("Hello World"));
// console.log(cleanString("    Hello,    World!!!"));
// console.log(cleanString("42      is\tgreat   !"));
// console.log(cleanString("    Hello,    World!   !"));
