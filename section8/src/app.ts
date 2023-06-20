//デコレーターは開発者にとっての便利機能
//デコレーター関数
//頭は大文字にした方がいい
function Logger(constructor: Function) {
  //デコレーターは関数として直接呼び出されないので、以下のLOGでいつ使われたかわかるようにしておく
  console.log("ログ出力中...");
  console.log(constructor);
}

//デコレータファクトリ関数
//これにする利点は内側の関数が使用する値を渡して任意に指定できること
function Logger2(logstring: string) {
  console.log("LOGGER ファクトリ");
  return function (constructor: Function) {
    console.log(logstring);
    console.log(constructor);
  };
}

//便利なデコレータ
function WithTemplate(template: string, hoolId: string) {
  //_→引数を受け取るけど必要ないとき
  return function (_: Function) {
    const hookel = document.getElementById(hoolId);
    if (hookel) {
      hookel.innerHTML = template;
    }
  };
}
function WithTemplate2(template: string, hoolId: string) {
  console.log("TEMPLATE ファクトリ");
  //new→オブジェクトですがnewを使ってインスタンス化できるものつまりコンストラクタ関数であることを伝える
  //...args: any[]　コンストラクタ関数の引数を表す
  return function <T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T
  ) {
    //クラスに追加されるデコレータはコンストラクタ関数を返すことができる
    //デコレータカンスウが受け取った関数を別のものに置き換えられる
    //新しいclassを返す
    //デコレータが追加されたCLASSを新しいコンストラクタ関数で置き換えている
    //classをインスタンス化された時に実行される
    return class extends originalConstructor {
      constructor(..._: any[]) {
        super();
        console.log("テンプレートを表示");
        const hookel = document.getElementById(hoolId);
        if (hookel) {
          hookel.innerHTML = template;
          hookel.querySelector("h1")!.textContent = this.name;
          //this.nameは親クラスのプロパティ
        }
      }
    };
  };
}

//デコレーターはクラスが定義されたときに実行される、インスタンス化のときではない
//デコレーター関数を返す関数を実行している
//デコレーター関数の作成は上から下に実行される
//デコレーター関数の実行は下から上に実行されるWithTemplate2から実行される
@Logger2("ログ出力中 - PERSON")
@WithTemplate2("<h1>Personオブジェクト</h1>", "app")
class Person {
  name = "Max";
  constructor() {
    console.log("Personオブジェクトを作成中...");
  }
}
//classはコンストラクタ関数のシンタックスシュガー

const pers = new Person();
console.log(pers);

//target→以下のようにインスタンスのプロパティにデコレータを設定した場合、クラスのプロトタイプが渡される
//target→もしスタティックプロパティにデコレータを設定した場合、コンストラクタが渡される
function log(target: any, propertyName: string | Symbol) {
  console.log("Property デコレータ");
  console.log(target, propertyName);
  //targetにはProductクラスのプロトタイプが渡される。。title、_priceはない、プロトタイプに登録されたメソッドは登録されている
  //プロトタイプ→オブジェクトのこと？
}

//アクセサのためのデコレータ
//値を返せる
function Log2(
  target: any,
  name: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  console.log("Accessor デコレータ");
  console.log(target);
  console.log(name);
  console.log(descriptor);
  //元のPropertyDescriptorの中身を変更できる
  return {};
}

//メソッドのためのデコレータ
//値を返せる
function Log3(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log("Method デコレータ");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

//パラメータのためのデコレータ
//positonパラメータのいち
function Log4(target: any, name: string | Symbol, position: number) {
  console.log("Parameter デコレータ");
  console.log(target);
  console.log(name);
  console.log(position);
}

//プロパティデコレーターの詳細
//プロパティを持っているコンストラクタ関数がJSで作られたとき呼ばれる
class Product {
  @log
  title: string;
  //classの外部からはアクセスできない
  private _price: number;

  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error("不正な価格です・0以下は設定できませっｍ");
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}

const p1 = new Product("book", 100);
const p2 = new Product("book2", 100);
//デコレータはクラスをインスタンス化してときに呼ばれていないことがわかる
//クラスが定義されたときに呼ばれる

//targetにはインスタンスメソッドの場合はプロトタイプ、スタティックメソッドの場合はコンストラクタ関数が渡される
function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  //元のメソッドのオブジェクトを取り出す
  //古いDescriptorを新しいものに置き換える
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    //元のメソッドにはないgetterを追加する
    //メソッド実行前に実行される
    get() {
      const boudfn = originalMethod.bind(this);
      return boudfn;
    },
  };
  return adjDescriptor;
}

class Printer {
  message = "クリックしました";

  @Autobind
  showMassage() {
    console.log(this.message);
  }
}

const p = new Printer();
p.showMassage();
//これはPrinterのオブジェクトを参照している

const button = document.querySelector("button")!;
//undifiedが表示される理由⇛EventListenerが呼ばれたときのthis.messageは違うオブジェクトを参照している
//ここでのthisはイベントの対象となった要素への参照となってしまう。thisはbuttonを参照している
//イベントリスナーはコールバック関数を実行するときに、イベントの対象となった要素を関数にバインドするから
//button.addEventListener("click", p.showMassage.bind(p));
button.addEventListener("click", p.showMassage);

// ----
interface ValidatorConfig {
  [prop: string]: {
    [validatebleProp: string]: string[]; //['required','positive']
  };
}

//最初は空、デコレータが実行されて値が登録される
const registeredValidators: ValidatorConfig = {};

function Require(target: any, propName: string) {
  //Courseという名前が取得できる
  //クラスのバリデーターの設定を毎回新しいオブジェクトで上書きしているので以下のようにする
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ["required"],
  };
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ["positive"],
  };
}

function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if (!objValidatorConfig) {
    return true;
  }
  let isValid = true;
  for (const prop in objValidatorConfig) {
    console.log(prop);
    //switc分のなかでreturnしてしまっているので先に見つかったほうしか評価されない
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case "required":
          isValid = isValid && !!obj[prop];
          break;
        case "positive":
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}

//バリデーション
class Course {
  @Require
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector("form")!;
courseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const titleEl = document.getElementById("title") as HTMLInputElement;
  const priceEl = document.getElementById("price") as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  const createdCourse = new Course(title, price);

  if (!validate(createdCourse)) {
    alert("正しく入力してください");
    return;
  }
  console.log(createdCourse);
});
