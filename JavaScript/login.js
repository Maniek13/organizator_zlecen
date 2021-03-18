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

	name = 'php/' + name;

	var url = `${name}?${params}`;

	http.open('POST', url, true);
	http.send(formData);

	let promise = new Promise((resolve, reject) => {
		setTimeout(() => resolve(odp), ofset)
	});

	let result = await promise;
	return result;
}

function login(){
	let myCookie = readCookie("admin_log");
	let myCookie2 = readCookie("usser");

	if (myCookie == null) {
		if (myCookie2 == null) {
			let button = "log";

			let fieldLog = "#login1";
			let regLog = /^[a-zA-Ząćęłńóśóżź0-9]{1,}$/; 
			let msgLog = "Wpisz login, może zawierac litery i cyfry";
			
			let fieldPas = "#hasło";
			let regPas = /^[a-zA-Ząćęłńóśóżź0-9:@!$%#^&*()]{5,}$/; 
			let msgPas = "Wpisz hasło składające się conajmniej z 5 znaków. Może zawierać litery, cyfry oraz znaki :@!$%#^&*(). ";

			let fields = [fieldLog, fieldPas];
			error(fieldLog, regLog, msgLog, fields, button, "error_log");
			error(fieldPas, regPas, msgPas, fields, button, "error_pas");
		}
		else {
			location.href= "usser.html";
		}
	}
	else {
		location.href= "main.html";
	}
}

function onEnter(on_enter){
	on_enter.addEventListener("keyup", function(event) {
		if (event.keyCode === 13) {
		event.preventDefault();
		document.getElementById("log").click();
		}
	});
}

async function changePassword(){
    if(document.getElementById("old_password")){
        var hasło = document.getElementById("old_password").value;
        var hasło1 = document.getElementById("new_password").value;
        var hasło2 = document.getElementById("new_password2").value;
        var login = readCookie("login");
    
    }
    else{
        var first_time = true;
        var hasło = document.getElementById("hasło").value;
        var hasło1 = document.getElementById("hasło1").value;
        var hasło2 = document.getElementById("hasło2").value;
        var login = document.getElementById("login1").value;
	}
	
	if(hasło == hasło2){
		notifications("Zmian hasła", 'Nowe hasło nie może być takie jak stare');
		return;
	}
	
        
    if(hasło1 == hasło2){
        let password = CryptoJS.MD5(hasło);
        let url = 'corect.php';
    
        let zmienna = ""
    
        if(first_time){
            zmienna = '&login=' + CryptoJS.MD5(login);
        }
        else{
            zmienna = '&workersId=' + login;
        }
    
        let params = zmienna + '&password=' + password;
    
        let result2 = await php(url, params);
    
        let temat = "Edycja hasła";
    
        if(result2 == "ok"){
            let password2 = CryptoJS.MD5(hasło1);
            let url = 'change.php';
            let params = zmienna + '&password=' + password2;
    
            let zmieniono = await php(url, params);
    
            if(zmieniono == "1"){
                
                if(first_time){
                    writeCookie("usser", "true");
                    location.href= "usser.html";
                }
                else{
                    notifications(temat, 'zmieniono');
                    settings();
                }	
            }
            else{
                notifications(temat, zmieniono, 'error');
            }
        }
        else{
            notifications(temat, result2, 'error');
        }
    }
    else{
        notifications(temat, "prosze wpisać dwa razy takie samo hasło", 'error');
    }
    }


    
async function logIn(){
	let login = CryptoJS.MD5(document.getElementById("login1").value);
	let password = CryptoJS.MD5( document.getElementById("hasło").value);
	
	let url = 'login.php';
	let params = '&login=' + login + '&password=' + password;

	let logowanie = await php(url, params);

	let temat = "Logowanie";

		if(logowanie == "main.html"){
			writeCookie("admin_log", "true");
			writeCookie("admin_login", login);

			let temat = "Logowanie";
			notifications(temat, 'Zalogowano jako administrator');	

			location.href= "main.html";
		}
		else if(Array.isArray(logowanie)){
			writeCookie("name", logowanie[1] + " " + logowanie[2]);
			writeCookie("login", logowanie[3]);

			let url = 'changed.php';
			let params = '&login=' + login + '&password=' + password;
	
			let changed = await php(url, params);

			if(changed == '0'){
				document.getElementById("log").disabled = true;
				document.getElementById("zmiana_hasła").open = true;
			}
			else if(changed == '1'){
				writeCookie("usser", "true");
				notifications(temat, 'Zalogowano jako ' + logowanie[1] + " " + logowanie[2]);	
				location.href= "usser.html";
			}
			else{
				notifications(temat, changed, 'error');
			}
		}
		else{
			notifications(temat,logowanie, 'error');
		}
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

function walidPassword(pass1, pass2, btn){
	let button = btn;
	let inp1 = pass1;
	let inp2 = pass2;
	let reg = /^[a-zA-ZąćęłńóśóżźĄĆĘŁŃÓŚŹŻ0-9:!*&^%$#@]{5,}$/; 
	let msg = "Hasło powinno posiadać 5 znaków. Cyfry i litery oraz znaki: :!*&^%$#@.";

	let inputs = [inp1, inp2];

	error(inp1, reg, msg, inputs, button);
	error(inp2, reg, msg, inputs, button);
}

function schowPassword(password){
	let x = document.getElementById(password);
		
	if (x.type === "password"){
		x.type = "text";
	} 
	else {
		x.type = "password";
	}  
}


function notifications(temat, tekst, icona){
	let powiadomienie = document.createElement('div');
	powiadomienie.id = "powiadomienie";

	let d1 = document.createElement('div');
	d1.id = 'icon';

	let icon = document.createElement('div');
	icon.id = 'icon_file';
	icon.style.backgroundImage = 'url("icons/good.svg")';

	if(icona == 'error'){
		icon. style.backgroundImage = 'url("icons/error.svg")';
	}
	else if(icona){
		icon.style.backgroundImage = 'url(' + icona + ')';
	}
	d1.appendChild(icon);

	let d2 = document.createElement('div');
	d2.id = 'msg';

	let tytuł = document.createElement('p');
	tytuł.innerText = temat;
	tytuł.id = 'tytuł_msg';

	let wiadomość = document.createElement('div');
	wiadomość.innerText = tekst;
	wiadomość.id = 'wiadomosc';

	d2.appendChild(tytuł);
	d2.appendChild(wiadomość);

	powiadomienie.appendChild(d1);
	powiadomienie.appendChild(d2);
	
	document.body.appendChild(powiadomienie);

	setTimeout(function(){
		let x = document.getElementById('powiadomienie');
			document.body.removeChild(x);
	}, 2500);
}

function error(field, reg, msg, fields, button, error_field){
	let pole = document.querySelector(field);

	if(button == null){
		var button = "dodaj";
	}

	pole.addEventListener("input", function() {
		const preg_match = "/;/";
		const val = this.value;

		if (!reg.test(val)) {
			this.classList.add("field-error");

			if(document.getElementById(button)){
				document.getElementById(button).setAttribute("disabled", true);
			}

			if(document.getElementById("error" + field)){
			}
			else{
				if(error_field == null){
					let error = document.createElement("div");
					error.classList.add("error_data");
					error.id = "error" + field;
					error.innerText = msg;
					this.after(error);
				}
				else if(error_field == 1){
					let error = document.createElement("div");
					error.classList.add("error_data");
					error.id = "error" + field;
					error.innerText = msg;
					document.getElementById("zmiana_hasła_button").before(error);
				}
				else{
					let field = document.getElementById(error_field);
					field.innerText = msg;
					field.style.visibility = "visible";
				}
			}
		} 
		else {
			this.classList.remove("field-error");
			if(document.getElementById(button)){
				let enabled = true;
				pole.style.border = "0px";
				pole.style.borderBottom = "1px solid white";

				if(fields){
					for(var item of fields){
						let check = document.querySelector(item);
							if(check.classList.contains("field-error")){
								enabled = false;
							}
					}
				}
			
				if(enabled == true ){
					document.getElementById(button).removeAttribute("disabled", false);
				}	
			}
		
			if(document.getElementById("error" + field)){
				let formularz = document.getElementById("formularz");
				document.getElementById("error" + field).remove();
			}
			else if(document.getElementById(error_field)){
				let field = document.getElementById(error_field);
				field.style.visibility = "hidden";
			}
		}
	});
}


function writeCookie(cookieName, cookieValue, expires, domain,
	path, secureFlag) {
	if (cookieName) {
		var cookieDetails = cookieName + "=" + 
			escape(cookieValue);
		
		cookieDetails += (expires ? "; expires=" +
			expires.toGMTString(): '');

		cookieDetails += (domain ? "; domain=" + domain: '');
		cookieDetails += (path ? "; path=" + path: '');
		cookieDetails += (secureFlag ? "; secure": '');
		document.cookie = cookieDetails;
	}
}

function readUnescapedCookie(cookieName) {
	var cookieValue = document.cookie;
	var cookieRegExp = new RegExp("\\b" + cookieName 
		+ "=([^;]*)");
		
	cookieValue = cookieRegExp.exec(cookieValue);
	
	if (cookieValue != null) {
		cookieValue = cookieValue[1];
	}
	return cookieValue;
}

function readCookie(cookieName) {
	cookieValue = readUnescapedCookie(cookieName)
	
	if (cookieValue != null) {
		cookieValue = unescape(cookieValue);
	}
	return cookieValue;
}

function deleteCookie(cookieName) {
	var expiredDate = new Date();
	expiredDate.setMonth(-1);
	writeCookie(cookieName, "", expiredDate);
}