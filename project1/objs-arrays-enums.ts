// const person2:{
//     name:string,
//     age:number,
// }={
//     name:'yota',
//     age:20,
// }

// const person: {
//     name:string,
//     age:number,
//     hobbies:string[],
//     role:[number,string],
// } = {
//     name:'yota',
//     age:20,
//     hobbies:['Sports','Cooking',2],
//     role:[2, 'author'],
// };

// const ADMIN = 0;
// const READ_ONLY = 1;
// const AUTHOR = 2;
enum Role {
  ADMIN = "ADMIN",
  READ_ONLY = 100,
  AUTHOR = 200,
}

const person = {
  name: "yota",
  age: 20,
  hobbies: ["Sports", "Cooking", 2],
  role: Role.ADMIN,
};

// person.role.push('admin');
// person.role[1]=10;
//person.role=[0,'admin','user'];

let favoriteActivities: string[];
favoriteActivities = ["Sports"];

console.log(person.name);
//console.log(person2.name)
for (const hobby of person.hobbies) {
  console.log(hobby);
}

if (person.role === Role.ADMIN) {
  console.log("管理者ユーザー");
}
