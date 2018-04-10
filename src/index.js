import './index.scss';
console.log('-------');
console.log(1000);

const obj = {
	a: '1',
	b: '2'
}
console.log(ENV);
console.log('++++++');
fetch('/mocks/demo').then((res) => {
	return res.json();
}).then((res) => {
	console.log(res);
})
console.log(Object.assign({},obj));