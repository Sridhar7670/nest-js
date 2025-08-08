const arr=[1, 2, 3, 4]
const filter1=arr.filter((item)=>item%2==0)
console.log(filter1)


//FILTER BY CONDITION NESTED :

const arr1=[{ name: 'Alice', age: 25 }, { name: 'Bob', age: 17 }];
const filter2=arr1.filter((item,index)=>{
    if(item.age){
        return item.age>18
    }
})
console.log(filter2)


//REMOVE FALSY 
const arr2=[0, 'hello', null, false, 42];
const filter3=arr2.filter((item,index)=>{
   // return item==false //will return 0,false 
    return item //js truthy auto 
})
console.log(filter3) //["hello",42]

//FILTER NESTED SCORES 

// const arr3=[{ name: 'Alice', scores: [8, 15] }, { name: 'Bob', scores: [12, 5] }];
// const filter4= arr3.filter((item,index)=>{
//     if(item.scores){
//         return item.scores.some((item=>item>10))
//     }
// })
// console.log(filter4)

const arr3 = [
  { name: 'Alice', scores: [8, 15] },
  { name: 'Bob', scores: [12, 5] }
];

const filter4 = arr3.map(obj => ({
  name: obj.name,
  scores: obj.scores.filter(score => score > 10)
}));

console.log(filter4);


