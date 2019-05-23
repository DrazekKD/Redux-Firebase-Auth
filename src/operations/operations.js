const fetchWord = async () =>{
	const response = await fetch('',{method:'GET'});
	const json = await response.json();

	return json;
};