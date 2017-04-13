/* eslint-disable */
/*
* Credits http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
*/
export default function shuffle (a: Array<any>): Array<any> {
  for (let i = a.length; i; i--) {
    let j = Math.floor(Math.random() * i)
    [a[i - 1], a[j]] = [a[j], a[i - 1]]
  }
}
