//let,const

// var val1 = 'var変数';
// console.log(val1);

// // //var変数は上書き可能
// val1 = 'aaaaaaaa';
// console.log(val1);

// // //var変数は再宣言可能
// var val1 = 'nbbbbbb';
// console.log(val1);

// let val2 = 'let変数';
// console.log(val2);

// //letは上書き可能
// val2 = 'let変数上書き';
// console.log(val2);

// //letは再宣言不可能
// let val2 = 'let変数再宣言';
// console.log(val2);

// const val3 = 'const変数';
// console.log(val3);

// //constは上書き不可能
// val3 = 'const変数上書き';

//lconstは再宣言不可能
// let val3 = 'let変数再宣言';
// console.log(val3);

// //constで定義したobjectはプロパティの変更が可能
// const val4 = {
//   name: 'MAX',
//   age: 28,
// };
// val4.name = 'JUNU';
// console.log(val4);

// //constで定義した配列はプロパティの変更が可能
// const val5 = [1, 2];
// val5[0] = 10;
// val5.push = 'monkey';
// console.log(val5);

// //テンプレート文字列
// const name2 = 'MAX';
// const age = 29;
// const massage = `私は${name2}。${age}です。`;
// console.log(massage);

// //アロー関数
// const func1 = function a(str) {
//   return str;
// };
// console.log(func1('aaaaaaa'));

// const func2 = (str) => {
//   return str;
// };
// console.log(func2('bbbbbbbbbbb'));

// const func3 = (str) => str;
// console.log(func3('ccccccccccc'));

// const func4 = (num1, num2) => num1 + num2;
// console.log(func4(10, 20));

// //分割代入
// const myProfile = {
//   name5: 'MAX',
//   age5: 29,
// };

// const massage2 = `私は${myProfile.name2}。年齢は${myProfile.age2}です。`;
// console.log(massage2);

// const { name5, age5 } = myProfile;
// const massage3 = `私は${name5}。年齢は${age5}です。`;
// console.log(massage3);
// //配列でも同じ
// const myProfileArry = ['MAX', 29];

// //デフォルト値
// const sayHello = (name22 = 'ゲスト') =>
//   console.log(`こんにちは！${name22}さん！`);
// sayHello();

// //スプレッド構文

// //配列の展開
// const arr1 = [1, 2];
// // console.log(arr1);
// // console.log(...arr1);

// const summaryfunc = (num1, num2) => console.log(num1 + num2);
// summaryfunc(arr1[0], arr1[1]);
// summaryfunc(...arr1);

// //まとめる
// const arr2 = [1, 2, 3, 4, 5];
// const [num1, num2, ...arr3] = arr2;
// console.log(num1);
// console.log(num2);

// console.log(arr3);

// //配列のコピー、結合
// const arr4 = [10, 20];
// const arr5 = [30, 40];

// const arr6 = [...arr4];
// console.log(arr6);

//map,filter
const nameArr = ['MAX', 'KEN', 'YA'];

// for (let i = 0; i < nameArr.length; i++) {
//   console.log(nameArr[i]);
// }

// const nameArr2 = nameArr.map((name) => {
//   return name;
// });
// for (let i = 0; i < nameArr.length; i++) {
//   console.log(nameArr[i]);
// }

// nameArr.map((name, i) => console.log(`${i + 1}番目は${name}です。`));

// const numArr = [1, 2, 3, 4, 5];

// const newNumArr = numArr.filter((num) => {
//   return num % 2 === 1;
// });
// console.log(newNumArr);

// const newNameArr = nameArr.map((name) => {
//   if (name === 'YA') {
//     return name;
//   } else {
//     return `${name}さん`;
//   }
// });
// console.log(newNameArr);

//３項演算子
const checkSum = (n1, n2) => {
  return n1 + n2 > 100 ? '100を超えています！' : '許容範囲内です';
};
console.log(checkSum(10, 1));
