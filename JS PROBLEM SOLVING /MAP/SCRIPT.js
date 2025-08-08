
//DOUBLE VALUES 
const map=[1,2,3];
const dmap=map.map((item,index)=>item*2)
console.log(dmap)


//Extract names from user objects
const arr=[{ name: 'Alice' }, { name: 'Bob' }];

console.log(arr.reduce((acc,cur)=>{
    acc.push(cur.name)
    return acc
},[]))


//USING MAP 
const map1=arr.map((item,index)=>{
    // op.push(item.name)
    return item.name
})
console.log(map1)

const arr1=[{ price: 100 }, { price: 200 }]
const map2=arr1.map((item,index)=>{
    item.tax=10
    return item
})
console.log(map2) //[{ price: 100, tax: 10 }, { price: 200, tax: 20 }]


//NESTED DOUBLING ARRAY SCORES

const arr2=[{ name: 'Alice', scores: [10, 20] }, { name: 'Bob', scores: [5, 15] }]

const map3= arr2.map((item,index)=>{
    if(item.scores){
        item.scores.map((item)=>item*2)
    }
    return item 
})
console.log(map3)


