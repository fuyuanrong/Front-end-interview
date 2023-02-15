function func1() {
  return new Promise((resolve, reject) =>{
        setTimeout(() => {
			console.log('func1')
	        resolve('func1')
		}, 3000);
	})
}
function func2() {
  return new Promise((resolve, reject) =>{
        console.log('func2')
        resolve('func2')
	})
}
function func3() {
  return new Promise((resolve, reject) =>{
        
        setTimeout(() => {
			console.log('func3')
	        resolve('func3')
		}, 3000);
	})
}
function func4() {
  return new Promise((resolve, reject) =>{
        console.log('func4')
        resolve('func4')
	})
}

async function test() {
	const v1 = await func1();
	const v2 = await func2();

	const v3 = await func3();
	const v4 = await func4();

}

test();