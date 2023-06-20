type User = { name: string; age: number };
//const u2: User = ["Max", 29];
const u1: User = { name: "Max", age: 29 };

type Combinable = number | string;
type ConversionDescriptor = "as-number" | "as-text";

function combine(
  input1: Combinable,
  input2: Combinable,
  resultConversion: ConversionDescriptor
) {
  let result;
  if (
    (typeof input1 === "number" && typeof input2 === "number") ||
    resultConversion === "as-number"
  ) {
    result = +input1 + +input2;
  } else {
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
