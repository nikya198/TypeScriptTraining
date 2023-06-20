//交差型
type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

//交差型
//interface ElevatedEmploee extends Employee, Admin {}
type ElevatedEmploee = Admin & Employee;

const e1: ElevatedEmploee = {
  name: "MAX",
  privileges: ["create-server"],
  startDate: new Date(),
};

type Combinable = string | number;
type Numeric = number | boolean;
type Universal = Combinable & Numeric;

//型ガード
//関数オーバーロード
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: string, b: number): number;
function add(a: number, b: string): number;
function add(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

const result = add("sss", " ssssssss");
result.split(" ");

const fechedUserData = {
  id: "u1",
  name: "user1",
  job: {
    title: "developer",
    description: "Typescript",
  },
};

//オプショナルチェーン演算子
//ネストされたプロパティに安全にアクセスできる
console.log(fechedUserData?.job?.title);

const userInput = "";

//falsyな値→false,0,"",null,undefined
//??→NULL合体演算子
//null,undefinedの場合は代替の値を利用する
const storedDate = userInput ?? "DEFAULT";

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log(emp.name);
  if ("privileges" in emp) {
    console.log("privileges" + emp.privileges);
  }
  if ("startDate" in emp) {
    console.log("startDate" + emp.startDate);
  }
}
printEmployeeInformation(e1);
//printEmployeeInformation({ name: "Manu", startDate: new Date() });

class Car {
  drive() {
    console.log("運転中...");
  }
}

class Truck {
  drive() {
    console.log("トラックを運転中");
  }

  loadCargo(amount: number) {
    console.log("荷物を乗せています...." + amount);
  }
}

type Vehicle = Car | Truck;
const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  // if ("loadCargo" in vehicle) {
  //   vehicle.loadCargo(20);
  // }
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(20);
  }
}

useVehicle(v1);
useVehicle(v2);

//判別可能なUnion型
interface bird {
  type: "bird";
  flyingSpeed: number;
}
interface Horse {
  type: "horse";
  runningSpeed: number;
}
type Animal = bird | Horse;

function moveAnimals(animal: Animal) {
  let speed: number;
  switch (animal.type) {
    case "bird":
      speed = animal.flyingSpeed;
      break;
    case "horse":
      speed = animal.runningSpeed;
  }
  console.log("移動速度" + speed);
}

moveAnimals({ type: "horse", runningSpeed: 30 });

// const userInputElement = <HTMLInputElement>(
//   document.getElementById("user-input")!
// );

// const userInputElement = document.getElementById(
//   "user-input"
// )! as HTMLInputElement;

const userInputElement = document.getElementById("user-input");
//型キャスト
//typescriptが型を推論できない場合に使う
//typescriptはHTMLの解析までは実施しない
//ｈｔｍｌタグの判別
if (userInputElement) {
  (userInputElement as HTMLInputElement).value = "こんにちは";
}

//インデックス型
//どのようなプロパティがあるか分からないときに使う
interface ErrorContainer {
  //{email:'正しいメールアドレスではありません。',userName:'ユーザ名に記号を含めることはできません。'}
  [prop: string]: string;
  //プロパティ名がstringとし
}
const erroBag: ErrorContainer = {
  email: "正しいメールアドレスではありません。",
  username: "ユーザ名に記号を含めることはできません。",
};
