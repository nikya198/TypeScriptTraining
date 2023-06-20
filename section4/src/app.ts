const userNeme = "MAX";
//userNeme = "MAXMAX";
// let age = 39;
// age = 40;

// function add(a: number, b: number) {
//   var result;
//   result = a + b;
//   return result;
// }

//console.log(result);

// if (age >= 20) {
//   let isAdult = true;
// }
//console.log(isAdult);

//デフォルト値は右側のみ
// const add = (a: number, b: number = 1) => a + b;

// const printOutput: (output: string | number) => void = (output) => {
//   console.log(output);
// };

// printOutput(add(2));

document.addEventListener(
  "DOMContentLoaded",
  function () {
    const button = document.querySelector("button");
    if (button) {
      button.addEventListener("click", (event) => {
        console.log(event);
      });
    }
  },
  false
);

const hobbies = ["sports", "Cooking"];
const activeHobbies = ["Hiking"];

activeHobbies.push(...hobbies);
//activeHobbies.push(hobbies[0], hobbies[1]);

const person = {
  firstName: "MAX",
  age: 30,
};

const copiedPerson = {
  ...person,
};
const add = (...numbers: number[]) => {
  return numbers.reduce((curResult, curValue) => {
    return curResult + curValue;
  }, 0);
};

const addedNUmbers = add(5, 10, 33.7);
console.log(addedNUmbers);

// const hobby1 = hobbies[0];
// const hobby2 = hobbies[1];

const [hobby1, hobby2, ...remainingHobbies] = hobbies;
console.log(hobbies, hobby1, hobby2);

const { firstName: userName, age } = person;
console.log(userName, age, person);
