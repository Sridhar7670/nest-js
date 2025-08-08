//REDUCE ARRAY SUM 

const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log(sum); 


//Count frequency of items in array

const fruits = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];
const freq=fruits.reduce((acc,fruit)=>{
    acc[fruit]=(acc[fruit]||0)+1;
    return acc;
},{});

console.log(freq);


//GROUP USERS BY AGE 

const arr = [{ name: 'Alice', age: 20 },{ name: 'Bob', age: 21 },{ name: 'Charlie', age: 20 }];
const grouped = arr.reduce((acc, user) => {
  if(!acc[user.age]){
    acc[user.age]=[]
  }
  acc[user.age].push(user.name)
  return acc;
}, {});

console.log(grouped);


//SUM SCORES IN NESTED ARRAY
const arr1=[
  { name: 'Alice', scores: [10, 20, 30] },
  { name: 'Bob', scores: [15, 25] },
  { name: 'Charlie', scores: [5, 10, 15, 20] }
];


const tvalue=arr1.reduce((sum,item)=>{
    const arr=item.scores
    if(arr){
        const cum=arr.reduce((acc,num)=>acc+num,0)
        return sum+=cum
    }
},0)

console.log(tvalue); 



// FLATNENING AN ARRAY USING REDUCE METHOD 

const input = [[1, 2], [3, 4], [5]];

const flattened = input.reduce((acc, curr) => {
  if (Array.isArray(curr)) {
    return acc.concat(curr);
  }
  return acc.concat([curr]);
}, []);

console.log(flattened); 


const array=[{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
console.log(array.reduce((acc, curr) => {
  acc[curr.id] = curr
  return acc
}, {})
);



