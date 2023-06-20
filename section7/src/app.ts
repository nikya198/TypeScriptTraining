//-----------Generic関数---------------------------------
//ジェネリクス型→<>

//Array型
const names: Array<string> = [];

//Promise型（JSの機能）
// const promise = new Promise<number>((resolve, reject) => {
//   setTimeout(() => {
//     resolve(10);
//   }, 2000);
// });

// promise.then((data) => {
//   //data.split(' ');
// });

//なぜ便利？
//ジェネリクス型使えば最終的に何を投げるかを伝えることが出来る
//追加の型情報を提供できる型のこと
//Typescriptにおける型安全性を高められる、自動補完等の開発サポートを向上されられる

//独自のジェネリクス型

//objectは非常に曖昧な型
//この状態だとTypeScriptはobjectを返すことしか分からない
function merge(objA: object, objB: object) {
  return Object.assign(objA, objB);
}

//T　Uは特定の異なった方を受け取ることを示している,同じでもいい
//不明確なOBJECT型でなく型を明確に理解できるようになる
//extendsでジェネリクスに制約を追加する
function merge2<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
  //assign→オブジェクト同士でしかマージできない、objBにNUMBER型の値を渡しても何も表示されない
}

//console.log(merge({ name: "MAX" }, { age: 30 }));
const mergeObj = merge2({ name: "MAX", hobbies: ["soccer"] }, { age: 30 });
console.log(mergeObj.age);

interface Lengthy {
  length: number;
}

//Tはlengthプロパティがあるかどうかだけを制約している
//関数オーバーロードやUNIONでは柔軟性がない
function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = "値がありません。";
  if (element.length > 0) {
    descriptionText = "値は" + element.length + "個です。";
  }
  return [element, descriptionText];
}

console.log(countAndDescribe("お疲れさまです！"));
console.log(countAndDescribe(""));
console.log(countAndDescribe(["Sports", "Cooking"]));

//keyof
//UはTのオブジェクトのプロパティを含んでいないとダメ
function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return "Values: " + obj[key];
}

//正しい構造のオブジェクトを受け取ることが出来る
console.log(extractAndConvert({ name: "MAX" }, "name"));

//--------------------------Genericクラス---------------------------------

//union型だと何がダメか？
// class DataStorage2 {
//   //string | number | booleanがミックスされた配列であることをあらわしている
//   //private data: (string | number | boolean)[] = [];
//   private data: string[] | number[] | boolean[] = [];

//   //union型だとこのaddItemが呼ばれたときにどの型でも受け入れてしまう
//   addItem(item: string | number | boolean) {
//     this.data.push(item);
//   }

//   removeItem(item: string | number | boolean) {
//     if (this.data.indexOf(item) === -1) {
//       return;
//     }
//     this.data.splice(this.data.indexOf(item), 1); // -1
//   }

//   getItems() {
//     return [...this.data];
//   }
// }
//const textStorage2 = new DataStorage2();

//Generic型では最初に保存するデータの型を指定する必要があるので、その跡の関数でもそれを引き継げる
//1つの型に固定できる
class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) {
      return;
    }
    this.data.splice(this.data.indexOf(item), 1); // -1
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem("Data1");
textStorage.addItem("Data2");
textStorage.removeItem("Data1");
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();

// const objStorage = new DataStorage<object>();
// const obj = { name: 'Max' };
// objStorage.addItem(obj);
// objStorage.addItem({ name: 'Manu' });
// // ...
// objStorage.removeItem(obj);
// console.log(objStorage.getItems());

interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

//以下はコンパイルされると削除される
//Partial→任意のオプショナルのプロパティをくるむ
//Partial→Generic型に指定されたオブジェクトの型のプロパティをすべてオプショナルに変更する
//なのでcourseGoalに｛｝のオブジェクトを設定出来る。
function createCourseGoal(
  title: string,
  description: string,
  date: Date
): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;
  //courseGoal.completeUntil2 = date;
  return courseGoal as CourseGoal;
}

//ロックされた配列（読み取り専用）
const names2: Readonly<string[]> = ["Max", "Anna"];
// names.push("Manu");
// names.pop();
console.log(names2);
