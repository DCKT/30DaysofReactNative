/* eslint-disable */
/*
* Credits https://css-tricks.com/snippets/javascript/shuffle-array/
*/
export default function shuffle(o) {
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o
}