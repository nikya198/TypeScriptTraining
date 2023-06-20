"use strict";
//const u2: User = ["Max", 29];
const u1 = { name: "Max", age: 29 };
function combine(input1, input2, resultConversion) {
    let result;
    if ((typeof input1 === "number" && typeof input2 === "number") ||
        resultConversion === "as-number") {
        result = +input1 + +input2;
    }
    else {
        result = input1.toString() + input2.toString();
    }
    return result;
    //   if (resultConversion === "as-number") {
    //     return +result;
    //   } else {
    //     return result.toString();
    //   }
}
const combiledAges = combine(30, 26, "as-number");
console.log(combiledAges);
const combiledStringAges = combine("30", "26", "as-number");
console.log(combiledStringAges);
const combiledNames = combine("MAX", "Anna", "as-text");
console.log(combiledNames);
