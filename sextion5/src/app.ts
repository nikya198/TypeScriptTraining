//--------classの復習--------------------------------------------------------
//クラスはコンストラクタのシンタックスシュガーのようなもの
//Jsファイルを見るとコンストラクタ関数でクラスのようなものを無理やり作っている
//クラスはJSにもTSにもある
class Department2 {
  name: string;
  //これはオブジェクトではない、クラスのフィールドである
  constructor(n: string) {
    this.name = n;
  }
  //describeが実行されろときDepartment2をベースにしたインスタンスを参照することを強制する
  describe(this: Department2) {
    console.log("department" + this.name);
    //thisをつけないとwindowオブジェクトのnameプロパティを参照することになる
  }
}

const accounting2eee = new Department2("Accounting");
console.log(accounting2eee);

//--------classの復習--------------------------------------------------------

//type AddFn = (a: number, b: number) => number;
interface AddFn {
  (a: number, b: number): number;
}

let add: AddFn;
add = (n1: number, n2: number) => {
  return n1 + n2;
};

interface Named {
  readonly name?: string;
  ouyputName?: string;
}

//オブジェクトがどんな形であるか定義するもの
//abstractとの違いは何も実装を持てないこと
interface Greetable extends Named {
  greet(phrase: string): void;
}

//インタフェースは複数使える
class Person implements Greetable {
  name?: string;
  age = 30;

  constructor(n?: string) {
    if (n) {
      this.name = n;
    }
    this.name = n;
  }

  greet(phrase: string) {
    if (this.name) {
      console.log(phrase + " " + this.name);
    } else {
      console.log("Hi!");
    }
  }
}

let user1: Greetable;
// user1 = {
//   name: "MAX",
//   //age: 30,
//   greet(phrase: string) {
//     console.log(phrase + " " + this.name);
//   },
// };
user1 = new Person();

user1.greet("Hello I am");
//user1.name = "Manu";
console.log(user1);
