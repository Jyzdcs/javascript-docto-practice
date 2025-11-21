const makeCounter = (start) => {
  let num = start;

  const incremente = () => {
    return num++;
  };

  return incremente;
};

const makePrefixer = (prefix) => {
  const f = (str) => {
    return prefix + str;
  };

  return f;
};

// const yo = makePrefixer("Yo");
// console.log(yo(" Tlmd"));

export { makeCounter, makePrefixer };
