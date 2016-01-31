export default function(array, amount) {
  let newArray = [];

  while(amount > 0) {
    amount--;

    newArray.push(array[Math.floor(Math.random() * array.length)]);
  }

  return newArray;
}