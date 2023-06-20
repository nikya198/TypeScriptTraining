//セクションまとめ
//LodashのようなJSライブラリをtyで使用するにはtypesを使用する
//class-transformerライブラリ
//class-validatorライブラリ

import 'reflect-metadata';
import { plainToInstance } from 'class-transformer';
import { Product } from './product.model';
//クラスバリデーターはtypescript専用
import { validate } from 'class-validator';
//typeをインストールしてTYに理解させる
import _ from 'lodash';

console.log(_.shuffle([1, 2, 3]));

const products = [
  { title: '商品1', price: 100 },
  { title: '商品2', price: 200 },
];

const newProd = new Product('', -100);
validate(newProd).then((errors) => {
  if (errors.length > 0) {
    console.log('バリデーションえらー！！');
    console.log(errors);
  } else {
    console.log(newProd.getInformation());
  }
});

//const p1 = new Product('AA', 100);

//これは処理が冗長しているため非常に面倒その場合ライブラリを使う
// const loadedProducts = products.map((prod) => {
//   return new Product(prod.title, prod.price);
// });

const loadedProducts = plainToInstance(Product, products);

for (const prd of loadedProducts) {
  console.log(prd.getInformation());
}
