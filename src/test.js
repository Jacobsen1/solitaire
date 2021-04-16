


let tmp = []
for(let i = 0; i < 23; i++){
  tmp.push(i)
}
let newDeck = []
while(tmp.length){
  if((tmp.length - 3) > 0){
    newDeck.push(tmp.splice(tmp.length - 3, 3))
  } else {
    newDeck.push(tmp.splice(0, tmp.length))
  }
}

console.log(newDeck)