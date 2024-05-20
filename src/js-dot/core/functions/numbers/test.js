const REGEX = /^\d+$/;

function isNumeric(value) {
	const type = typeof value;
	return type === 'number' ?
		true :
		type === 'string' ?
			value.length > 0 && value == +value :
			false;
}

function isNumber1(value){
	return typeof value === 'number' || REGEX.test(value);
}

function isNumber2(value){
	return isNumeric(value) && (''+value).indexOf('.') < 0;
}

function isNumber3(value){
	return parseInt(value) == value;
}


const tests = [
	1,
	1.1,
	'1',
	'1.1',
	'1.1.1'
];
