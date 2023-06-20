"use strict";
const userNeme = "MAX";
document.addEventListener("DOMContentLoaded", function () {
    const button = document.querySelector("button");
    if (button) {
        button.addEventListener("click", (event) => {
            console.log(event);
        });
    }
}, false);
const hobbies = ["sports", "Cooking"];
const activeHobbies = ["Hiking"];
activeHobbies.push(...hobbies);
const person = {
    firstName: "MAX",
    age: 30,
};
const copiedPerson = Object.assign({}, person);
const add = (...numbers) => {
    return numbers.reduce((curResult, curValue) => {
        return curResult + curValue;
    }, 0);
};
const addedNUmbers = add(5, 10, 33.7);
console.log(addedNUmbers);
const [hobby1, hobby2, ...remainingHobbies] = hobbies;
console.log(hobbies, hobby1, hobby2);
const { firstName: userName, age } = person;
console.log(userName, age, person);
//# sourceMappingURL=app.js.map