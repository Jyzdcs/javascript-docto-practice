export const twoSum = (nums, target) => {
  // la data strucutre la plus simple d'utilisation et logique dans ce context cest la hashtable
  // en javascript l'equivalent de la hashtable c'est map
  let seen = new Map();

  // je vais dabord verifier si ma data structure est bien fonctionnel voir si elle est adapter dans notre contexte
  console.log(nums.length);
  console.log(nums[9999]);
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 9999) console.log(nums[i]);
    if (nums[i] === nums.length) console.log(nums[i]);
    // maintenant quon a notre systeme qui garde en memoir tout les nombres vue, on doit trouver un moyen permettant de savoir de quel nombre on a besoin pour pouvoir atteindre la target
    let need = target - nums[i];

    if (seen.has(need)) {
      return [seen.get(need), i];
    }
    seen.set(nums[i], i);
  }
  return [];
};
