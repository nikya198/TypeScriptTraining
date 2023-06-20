import 'reflect-metadata';
import { plainToInstance } from 'class-transformer';
import { Product } from './product.model';

const products = [
  { title: '商品1', price: 100 },
  { title: '商品2', price: 200 },
];

//const p1 = new Product('AA', 100);

//これは処理が冗長しているため非常に面倒その場合ライブラリを使う
// const loadedProducts = products.map((prod) => {
//   return new Product(prod.title, prod.price);
// });

const loadedProducts = plainToInstance(Product, products);

for (const prd of loadedProducts) {
  console.log(prd.getInformation());
}
