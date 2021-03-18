function XML(){
	let http = new XMLHttpRequest();
	
	if (window.XMLHttpRequest){
	http=new XMLHttpRequest();
	}
	else{
	http=new ActiveXObject("Microsoft.XMLHTTP");
	}
	return http;
}


async function php(name, params, ofset, file){
	if(typeof file != 'undefined'){
		let element = document.getElementById(file);
		var formData = new FormData();
		formData.append("file", element.files[0]);
	}
	
	let http = XML();
	let odp = "Błąd serwera, spróbój ponownie";

	if(typeof ofset == 'undefined'){
		var ofset = 500;
	}
	
	http.onreadystatechange=function(){
        if (http.readyState==4 && http.status==200){
		odp = JSON.parse(this.responseText);
        }
	}
	
	var url = `${name}?${params}`;
	http.open('POST', url, true);
	
	http.send(formData);

	let promise = new Promise((resolve, reject) => {
		setTimeout(() => resolve(odp), ofset)
	});

	let result = await promise;
	return result;
}
  

function makeAccount(){
    let login = CryptoJS.MD5(document.getElementById("login").value);
	let hasło = CryptoJS.MD5(document.getElementById("hasło").value);
	let email = document.getElementById("email").value;
	let imie = document.getElementById("imie").value;
	let nazwisko = document.getElementById("nazwisko").value;

    let url = 'make_account_admin.php';
	let params = 'login=' + login + '&hasło=' + hasło + '&email=' + email+ '&imie=' + imie + '&nazwisko=' + nazwisko;
	let odp = php(url, params);


	odp.then(function (odp){
		if(odp == '1'){
				alert("utworzono konto administratora")
		}
		else{
				alert(odp);
		}
	}); 
}


function onEnter(fields, btn){
	for(i=0; i<fields.length; ++i){
		let field = document.getElementById(fields[i]);
		field.addEventListener("keyup", function(event) {
			if (event.keyCode === 13) {
			event.preventDefault();
			document.getElementById(btn).click();
			}
		});
	}
}