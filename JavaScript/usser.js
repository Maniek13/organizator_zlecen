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

var stan = true;

async function php(name, params, ofset, file){
	if(typeof file != 'undefined'){
		let element = document.getElementById(file);
		var formData = new FormData();

		if(element.files[0] == undefined){
			var ofset = 2500;
		}
		else{
			if(element.files[0].size > 5242880){
				return "Maksymalna wielkość pliku to 5MB";
			}
	
			if(element.files[0].size < 1048576){
				var ofset = 10000;
			}
	
			if(element.files[0].size < 104857){
				var ofset = 5000;
			}
		}

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

	if(name == 'send_mail.php'){
		params += '&timeout=' + ofset;
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

function checkCookie(cookie){
    const loginTemp = readCookie(cookie);
    
    var checkCookie = function() {
    return function() {
        var currentCookie = readCookie(cookie);
        if(currentCookie != loginTemp) {
            logout();
        }
    };
    }();
    window.setInterval(checkCookie, 100);
}
    
function logout(){
    deleteCookie("usser");
    deleteCookie("name");
    let temat = "Logowanie";
    notifications(temat, 'Wylogowano');
    location.href= "index.html";
}

function cancel(){
    btnShow();
}

function deletingForm(){
	let x = document.getElementById("placeholder");
	if( document.getElementById( "formularz") ){
		let child = document.getElementById("formularz");
		x.removeChild(child);
	}
}


function unfinished() {
	if(stan == true){
		stan = false;

		deletingForm();

		let form = document.createElement("div");
		form.id = "formularz";
		form.innerHTML = '<header><h1>Do zrobienia</h1></header>';
		
		let url = 'unfinished_task.php';
		let params = 'id=' + readCookie("login");

		let odp = php(url, params);
		odp.then(odp => taskList(form, odp, '0'));	

		placeholder.appendChild(form);	
	}	
}

function finished() {
	if(stan == true){
	stan = false;
	deletingForm();

	let form = document.createElement("div");
	form.id = "formularz";
	form.innerHTML = '<header><h1>Zrobione</h1></header>';
	
	let url = 'finished_task.php';
	let params = 'id=' + readCookie("login");

	let odp = php(url, params);
	odp.then(odp => taskList(form, odp, '1'));	

	placeholder.appendChild(form);
	}	
}


function taskList(form, odp, status){
	let t1 = "";
	if(odp){
	t1  = odp.toString();
	}

	if(t1.startsWith('Błąd')){
		notifications("Błąd serwera", "Proszę spróbowac jeszcze raz", 'error');
	}
	else{
	let sekcja = document.createElement("section");
	sekcja.id = "ogloszenia";

	if(odp == ''){
		let msg = "Brak zadań do wykonania";
		if(status == 1){
			msg = "Brak zakończonych zadań";
		}
	
		let komunikat = document.createElement("div");
		komunikat.id = "task_msg";

		let p_msg = document.createElement("p");
		p_msg.innerText = msg;

		komunikat.appendChild(p_msg);
		form.appendChild(komunikat);
	}
	else{
		for(let i = 0; i < odp.length; i++){
		var ogloszenie = document.createElement("article");
		ogloszenie.id = odp[i][0];
		let placeholder = document.createElement("div");
		placeholder.id = "task";
		let tytuł = document.createElement("p");
		tytuł.id = "tytuł";
		tytuł.innerText = odp[i][1];

		let adres = document.createElement("p");
		adres.style.backgroundImage = 'url("icons/tool.png")';
		adres.innerText = odp[i][6] + " ul. " + odp[i][3] + " " + odp[i][4] + "/" + odp[i][5];

		let data = document.createElement("p");
	
		let nrKontaktowy = document.createElement("p");
		nrKontaktowy. style.backgroundImage = 'url("icons/call.png")';
		nrKontaktowy.innerText =  odp[i][7];

		let pracownik = document.createElement("p");
		pracownik. style.backgroundImage = 'url("icons/user.png")';
		pracownik.innerText = odp[i][16] + " " + odp[i][17];

		let podglad = document.createElement("button");
		podglad.id = "schow_info";
		podglad.setAttribute("onclick", 'podgląd(' + odp[i][0] + ')');
		podglad.style.backgroundImage = 'url("icons/button/info.png")';
		tooltip(podglad, "Informacje");
		
		
		if(status == "0"){
			let temp2 = 'btnUserCompleteTask(' + odp[i][0] + ')';
			var btn2 = document.createElement("button");
			btn2.id = "zakoncz";
			btn2.innerHTML = "<a>Zrobiono</a>";
			btn2.setAttribute("onclick", temp2);
			var temp = 'btnUsserTaskInformation(' + odp[i][0] + ', 0)';
			btn2.style.backgroundImage = 'url("icons/button/check.png")';
			data.innerText = odp[i][10];
			data. style.backgroundImage = 'url("icons/calendar.png")';
		}
		if(status == "1"){
			let temp2 = 'btnUserCancelTask(' + odp[i][0] + ')';
			var btn2 = document.createElement("button");
			btn2.id = "anuluj";
			btn2.innerHTML = "<a>Anuluj</a>";
			btn2.setAttribute("onclick", temp2);
			var temp = 'btnUsserTaskInformation(' + odp[i][0] + ', 1)';
			btn2.style.backgroundImage = 'url("icons/button/cancel.png")';
			data.innerText = odp[i][11];
			data. style.backgroundImage = 'url("icons/date.png")';
		}
		
		var btn = document.createElement("button");
		btn.id = "edytuj";
		btn.innerHTML = "<a>Edytuj</a>";
		btn.style.backgroundImage = 'url("icons/button/pencil.png")';
		btn.setAttribute("onclick", temp);
		
		
		placeholder.appendChild(tytuł);
		placeholder.appendChild(podglad);
		placeholder.appendChild(adres);
		placeholder.appendChild(data);
		placeholder.appendChild(nrKontaktowy);
		placeholder.appendChild(pracownik);
		ogloszenie.appendChild(placeholder);

		let kontener_button = document.createElement("div");
		kontener_button.id = "task_btns";
		kontener_button.appendChild(btn);
		kontener_button.appendChild(btn2);
		
		ogloszenie.appendChild(kontener_button);
		sekcja.appendChild(ogloszenie);
		}
	}

	form.appendChild(sekcja);
	}
	stan = true;
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
	
function email(){
	if(stan == true){
		stan = false;
		deletingForm();
		emailForm();
	}	
}

async function emailForm(){
	let dodawanie = document.createElement("div");
	dodawanie.id = "formularz";

	let etykieta = document.createElement("header");
	let h1 = document.createElement("h1");
	h1.innerHTML = "Formularz kontaktowy";

	let tematLab = document.createElement("label");
	tematLab.setAttribute("for", "temat");
	tematLab.innerText = "Temat:";

	let temat = document.createElement("input");
	temat.name = "temat";
	temat.type = "text";
	temat.id = "temat";

	let msgLab = document.createElement("label");
	msgLab.setAttribute("for", "msg");
	msgLab.innerText = "Wiadomość:";

	let msg = document.createElement("textarea");
	msg.name = "msg";
	msg.type = "text";
	msg.id = "msg";

	let adminLab = document.createElement("label");
	adminLab.setAttribute("for", "admin");
	adminLab.innerText = "Administrator:";

	let admin = document.createElement("select");
	admin.name = "admin";
	admin.id = "admin";

	let resultIm = await admins();
	
	for(let i = 0; i<resultIm.length; ++i){
		if(resultIm[i][2] != ""){
			let select = document.createElement("option");
			select.text = resultIm[i][4] + " " +  resultIm[i][3];
			select.value = resultIm[i][2];
			admin.add(select);
		}
	}


	let dUp = document.createElement("div");
	dUp.classList.add("upload");

	let fileLab = document.createElement("label");
	fileLab.id = 'upload-label';
	fileLab.innerHTML = "Wybierz plik z komputera";

	let file = document.createElement("input");
	file.type = "file";
	file.id = "file";
	file.name = "file";

	let btn = document.createElement("button");
	btn.id = "send";
	btn.innerText = "Wyślij email";
	btn.setAttribute("onclick", "sendEmail()");
	
	etykieta.appendChild(h1);

	let f1 = document.createElement("div");
	f1.id = "folder";

	f1.appendChild(etykieta);
	dodawanie.appendChild(f1);

	let f = document.createElement('div');
	f.id = "form";

	f.appendChild(tematLab);
	f.appendChild(temat);
	przerwa(f);
	f.appendChild(msgLab);
	f.appendChild(msg);
	przerwa(f);
	f.appendChild(adminLab);
	f.appendChild(admin);
	przerwa(f);
	dUp.appendChild(fileLab);
	dUp.appendChild(file);
	f.appendChild(dUp);
	f.appendChild(btn);

	let folder = document.createElement("div");
	folder.id = "folder";

	folder.appendChild(f);
	dodawanie.appendChild(folder);
	placeholder.appendChild(dodawanie);

	let button = "send";
	let tematMsg = "Prosze wpisać poprawny temat, bez znaków specjalnych";
	let teamtField = "#temat";
	let tematReg = /^[a-zA-ZąćęłńóśóżźĄĆĘŁŃÓŚŹŻ0-9 ]{1,}$/; 

	let msgMsg = "Prosze wpisać poprawną wiadomość. Wiadomość może zawierać cyfry, litery bądź spacje oraz znaki specjalne: :@!#$%^&*(),.-, enter i składać się conajmniej z pięciu znaków";
	let msgField = "#msg";
	let msgReg = /^[\na-zA-ZąćęłńóśóżźĄĆĘŁŃÓŚŹŻ0-9 :@!#$%^&*(),.-]{2,}$/; 

	let fields = [ teamtField, msg_field];

	błąd(teamtField, tematReg, tematMsg, fields, button);
	błąd(msgField, msgReg, msgMsg, fields, button);

	document.getElementById("file").onchange = function () {
		if(this.value.split(/(\\|\/)/g).pop()=='') {
			document.getElementById("upload-label").innerHTML = 'Wybierz plik z komputera';
		}
		else {
			document.getElementById("upload-label").innerHTML = this.value.split(/(\\|\/)/g).pop();
		}
	};

	$("input").attr("autocomplete", "off");

	stan = true;
}


async function admins(){
	let url = 'admins.php';
	let params;
	let wynik = await php(url, params);
	let temp  = wynik.toString();

	if(temp.startsWith('Błąd')){
		notifications("Błąd serwera", "Proszę spróbowac jeszcze raz", 'error');
		return;
	}
	return wynik;
}

async function sendEmail(){
	document.getElementById("send").disabled = true;

	let from = readCookie("login");
	let temat = document.getElementById("temat").value;
	let msg = document.getElementById("msg").value;
	let usser = readCookie('name');
	let to = document.getElementById("admin").value;

	let temat1 = "Wysyłanie emaila";

	let wczytywanie = document.createElement("div");
	wczytywanie.id = "wczytywanie";
	wczytywanie.innerHTML = "<div></div><div></div><div></div><div></div>";

	document.getElementById("form").appendChild(wczytywanie);

	document.getElementById("wczytywanie").classList.add("lds-ring");

	let mail_check = 'mail_check.php';
	let params_check = 'from=' + from;
	let odp = await php(mail_check, params_check);

	let temp  = odp.toString();

	if(temp.startsWith('Błąd')){
		document.getElementById("wczytywanie").remove();
		notifications("Błąd serwera", "Proszę spróbowac jeszcze raz", 'error');
		document.getElementById("send").disabled = false;
	}
	else{
		if(odp != "0" && odp != "420"){
			let url = 'send_mail.php';
			let params = 'from=' + odp + '&temat=' + temat + '&msg=' + msg + '&usser=' + usser + '&to=' + to;
			let file = 'file';

			let odp_wysyłanie = await php(url, params, 20000, file);
		
			document.getElementById("send").disabled = false;
		
			
			if(odp_wysyłanie == '1'){
				document.getElementById("wczytywanie").remove();
				notifications(temat1, "wysłano");	
				document.getElementById("temat").value = "";
				document.getElementById("msg").value = "";
				document.getElementById("file").value = "";
				document.getElementById("upload-label").innerText = "Wybierz plik z komputera";
			}
			else if(odp_wysyłanie[0] == 'Błąd'){
				notifications("Błąd serwera", "Proszę spróbowac jeszcze raz", 'error');
			}
			else{
				document.getElementById("wczytywanie").remove();
				notifications(temat1, odp_wysyłanie, 'error');
			}
		}
		else{
			if(odp != "420"){
				document.getElementById("wczytywanie").remove();
				notifications(temat1, "Proszę wpisać adres email w konfiguracji konta", 'error');
			}
			else{
				document.getElementById("wczytywanie").remove();
				notifications(temat1, "Błąd komunikacji", 'error');
				document.getElementById("send").disabled = false;
			}
		}
	}
}

function settings(){
	if(stan == true){
	stan = false;
	deletingForm();
	settingsForm();
	}	
}

function settingsForm(){
	let formularz = document.createElement("div");
	formularz.id = "formularz";

	let etykieta = document.createElement("header");
	let h1 = document.createElement("h1");
	h1.innerHTML = "Zmiana hasła";
	
	let oldPassLab = document.createElement("label");
	oldPassLab.setAttribute("for", "old_password");
	oldPassLab.innerText = "Stare hasło:";

	let oldPass = document.createElement("input");
	oldPass.name = "old_password";
	oldPass.type = "password";
	oldPass.id = "old_password";

	let show3 = document.createElement("button");
	show3.id = "password_show";
	show3.style.backgroundImage = "url('icons/password.svg')";
	show3.setAttribute("onclick", 'schowPassword("old_password")');

	let newPassLab = document.createElement("label");
	newPassLab.setAttribute("for", "new_password");
	newPassLab.innerText = "Nowe hasło:";

	let newPass = document.createElement("input");
	newPass.name = "new_password";
	newPass.type = "password";
	newPass.id = "new_password";

	let show = document.createElement("button");
	show.id = "password_show";
	show.style.backgroundImage = "url('icons/password.svg')";
	show.setAttribute("onclick", 'schowPassword("new_password")');

	let newPassLab2 = document.createElement("label");
	newPassLab2.setAttribute("for", "new_password2");
	newPassLab2.innerText = "Powtórz nowe hasło:";

	let newPass2 = document.createElement("input");
	newPass2.name = "new_password2";
	newPass2.type = "password";
	newPass2.id = "new_password2";

	let show2 = document.createElement("button");
	show2.id = "password_show";
	show2.style.backgroundImage = "url('icons/password.svg')";
	show2.setAttribute("onclick", 'schowPassword("new_password2")');


	let btn = document.createElement("button");
	btn.id = "change_password";
	btn.innerText = "Zmień";
	btn.setAttribute("onclick", "changePassword()");

	etykieta.appendChild(h1);

	let folder = document.createElement("div");
	folder.id = "folder";

	folder.appendChild(etykieta);
	formularz.appendChild(folder);

	let f = document.createElement('div');
	f.id = "form";

	let div = document.createElement("div");
	div.id = "pass_kont";

	let div2 = document.createElement("div");
	div2.id = "pass_kont";

	let div3 = document.createElement("div");
	div3.id = "pass_kont";

	div.appendChild(oldPassLab);
	div.appendChild(oldPass);
	div.appendChild(show3);
	f.appendChild(div);
	div2.appendChild(newPassLab);
	div2.appendChild(newPass);
	div2.appendChild(show);
	f.appendChild(div2);
	div3.appendChild(newPassLab2);
	div3.appendChild(newPass2);
	div3.appendChild(show2);
	f.appendChild(div3);
	f.appendChild(btn);

	let etykietaEmail = document.createElement("header");
	let h1Email = document.createElement("h1");
	h1Email.innerHTML = "Adres email";

	etykietaEmail.appendChild(h1Email);
	
	let emailLab = document.createElement("label");
	emailLab.setAttribute("for", "email");
	emailLab.innerText = "Adres email:";

	let email = document.createElement("input");
	email.name = "email";
	email.type = "text";
	email.id = "email";

	let setEmail = document.createElement("button");
	setEmail.id = "set_email";
	setEmail.innerText = "Ustaw";
	setEmail.setAttribute("onclick", "setEmail()");

	let f1 = document.createElement('div');
	f1.id = "form";

	
	f1.appendChild(emailLab);
	f1.appendChild(email);
	przerwa(f1);
	f1.appendChild(setEmail);

	let f3 = document.createElement("div");
	f3.id = "folder";

	f3.appendChild(f);
	formularz.appendChild(f3);

	let f4 = document.createElement("div");
	f4.id = "folder";

	let f5 = document.createElement("div");
	f5.id = "folder";

	f5.appendChild(etykietaEmail);
	formularz.appendChild(f5);

	let f6 = document.createElement("div");
	f6.id = "folder";

	f6.appendChild(f1);
	formularz.appendChild(f6);

	placeholder.appendChild(formularz);

	let msg = "Hasło może zawierać cyfry, litery oraz znaki: :@!$%#^&*()";
	let button = "change_password";

	let oldPassword = "#old_password";
	let regOld = /^[a-zA-ZąćęłńóśóżźĄĆĘŁŃÓŚŹŻ0-9:@!$%#^&*()]{5,}$/; 
	
	let newPassword = "#new_password";
	let regNew = /^[a-zA-ZąćęłńóśóżźĄĆĘŁŃÓŚŹŻ0-9:@!$%#^&*()]{5,}$/; 

	let newPassword2 = "#new_password2";
	let regNew2 = /^[a-zA-ZąćęłńóśóżźĄĆĘŁŃÓŚŹŻ0-9:@!$%#^&*()]{5,}$/; 

	let fields = [oldPassword, newPassword, newPassword2];

	błąd(oldPassword, regOld, msg, fields, button);
	błąd(newPassword, regNew, msg, fields, button);
	błąd(newPassword2, regNew2, msg, fields, button);

	let button2 = "set_email";

	let emailMsg = "Prosze wpisać poprawnie adres email";
	let emailField = "#email";
	let emailReg = /^[_a-zA-ZZąćęłńóśżźĄĆĘŁŃÓŚŻŹ0-9-]+(\.[_a-zA-ZZąćęłńóśżźĄĆĘŁŃÓŚŻŹ0-9-]+)*@[a-zA-ZZąćęłńóśżźĄĆĘŁŃÓŚŻŹ0-9-]+(\.[a-zA-ZZąćęłńóśżźĄĆĘŁŃÓŚŻŹ0-9-]+)*(\.[a-zA-Z]{2,3})$/; 
	

	błąd(emailField, emailReg, emailMsg, '', button2);
	
	$("input").attr("autocomplete", "off");

	let fieldsOnEnter =['old_password', 'new_password', 'new_password2'];
	onEnter(fieldsOnEnter, button);

	onEnter(['email'], button2);
	stan = true;
}

function btnUserCompleteTask(id){
	let pole = document.getElementById(id);
	let tytuł = pole.childNodes[0].childNodes[0].textContent;
	oknoPotwierdzenia("btnUserCompleteTaskAction", id, "Czy napewno chcesz dodać zlecenie " + tytuł +" jako zakończone? ", id);
}

async function btnUserCompleteTaskAction(id){
	let url = 'complete_task.php';

	let usserId = readCookie("login");
	let params = 'taskId=' + id + '&usserId=' + usserId;

	let wynik = await php(url, params);
	let temat = "Zlecenie o numerze: " + id;
	
	if(wynik == '1'){
		notifications(temat, 'zlecenie zostało dodane jako ukończone');
		unfinished();
	}
	else{
		notifications(temat, wynik, 'error');
	}
}

function btnUserCancelTask(id){
	let pole = document.getElementById(id);
	let tytuł = pole.childNodes[0].childNodes[0].textContent;
	oknoPotwierdzenia("btnUserCancelTaskAction", id, "Czy napewno chcesz cofnąć ukończenie zlecenie: " + tytuł +"? ", id);
}


async function btnUserCancelTaskAction(id){
	let url = 'cancel_task.php';

	let usserId = readCookie("login");
	let params = 'taskId=' + id + '&usserId=' + usserId;

	let wynik = await php(url, params);
	let temat = "Zlecenia o numerze " + id;
	if(wynik == '1'){
		notifications(temat, 'zlecenie zostało anulowane');
		finished();
	}
	else{
		notifications(temat, wynik, 'error');
	}
}

function btnUsserTaskInformation(id, status){
	if(stan == true){
	stan = false;
	deletingForm();
	taskInformation(id, status);	
	}
}

async function taskInformation(id, status){
	let url = 'task_information.php';

	let usserId = readCookie("login");
	let params = 'taskId=' + id + '&usserId=' + usserId;

	let wynik = await php(url, params)

	temp  = wynik.toString();

	if(temp.startsWith('Błąd') == false && temp.startsWith('Nie ma') == false ){
		taskInformationForm(wynik, status);
	}
	else{
		notifications("Error", wynik, 'error');
	}
	stan = true;
}

function taskInformationForm(wynik, status){
	let formularz = document.createElement("div");
	formularz.id = "formularz";

	let etykieta = document.createElement("header");
	etykieta.id = "task_t";
	let h1 = document.createElement("h1");
	h1.id = "title_tasks";
	h1.innerHTML = wynik[1];
	
	let kategoria = document.createElement("p");
	kategoria.style.backgroundImage = 'url("icons/list.png")';
	kategoria.innerText = wynik[14];

	let adres = document.createElement("p");
	let temp = '';
	if(wynik[5] != ''){
		temp = wynik[6] + " ul. " + wynik[3] + ' ' + wynik[4] + "/" + wynik[5];
	}
	else{
		temp = wynik[6] + " ul. " + wynik[3] + ' ' + wynik[4];
	}
	adres.style.backgroundImage = 'url("icons/tool.png")';
	adres.innerText = temp;

	let nrTelefonu = document.createElement("p");
	nrTelefonu.style.backgroundImage = 'url("icons/call.png")';
	nrTelefonu.innerText = wynik[7];

	let data = document.createElement("p");
	data.style.backgroundImage = 'url("icons/calendar.png")';
	data.innerText =wynik[10];

	etykieta.appendChild(h1);

	let f1 = document.createElement("div");
	f1.id = "folder";

	f1.appendChild(etykieta);
	formularz.appendChild(f1);

	let f = document.createElement('div');
	f.id = 'form';

	f.appendChild(kategoria);;
	f.appendChild(adres);
	f.appendChild(nrTelefonu);
	f.appendChild(data);

	if(status == '0'){
		let wykonano = document.createElement("input");
		wykonano.name = "wykonano";
		wykonano.type = "text";
		wykonano.id = "wykonano";
		wykonano.placeholder = wynik[11];
	
		wykonano.setAttribute("class", "datepicker-here");
		wykonano.setAttribute("data-timepicker", "true");
		wykonano.setAttribute("data-time-format", 'hh:ii');
		wykonano.setAttribute("data-position",'top left');
		
		let wykonanoLab = document.createElement("div");
		wykonanoLab.id = "div_wykonano";

		let ikona = document.createElement("div");
		ikona.id = "ikona_t";
		ikona.style.backgroundImage = 'url("icons/date.png")';

		wykonanoLab.appendChild(ikona);
		wykonanoLab.appendChild(wykonano);
		f.appendChild(wykonanoLab);
	}
	else if(status == '1'){
		let wykonano = document.createElement("p");
		wykonano.style.backgroundImage = 'url("icons/date.png")';
		wykonano.innerText = wynik[11];
		f.appendChild(wykonano);
	}

	let opis_lab = document.createElement("div");
	opis_lab.id = "div_opis";

	let ikona = document.createElement("div");
	ikona.id = "ikona_t";
	ikona.style.backgroundImage = 'url("icons/paper.png")';

	let opis = document.createElement("textarea");
	opis.name = "opis";
	opis.setAttribute("rows", "5");
	opis.setAttribute("cols", "50");
	opis.id = "opis";
	opis.placeholder = wynik[8];
	opis.value = wynik[8];

	opis_lab.appendChild(ikona);
	opis_lab.appendChild(opis);
	f.appendChild(opis_lab);
	przerwa(f);

	let btn = document.createElement("button");

	let btn2 = document.createElement("button");
	btn2.id = "inf_cancel";
	tooltip(btn2, "Cofnij");
	btn2.style.backgroundImage = 'url("icons/button/back.png")';

	let button = '';

	if(status == '0'){
		btn.id = "inf_incomplete_task";
		tooltip(btn, "Zakończ");
		btn.setAttribute("onclick", 'infIncompleteTask(' +  wynik[0] +')');
		button = "inf_incomplete_task";
		btn2.setAttribute("onclick", "userInfCancelIncomplete()");
	}
	else if(status == '1'){
		btn.id = "inf_complete_task";
		tooltip(btn2, "Wyedytuj");
		btn.setAttribute("onclick", 'infCompleteTask(' +  wynik[0] +')');
		button = "inf_complete_task";
		btn2.setAttribute("onclick", "userInfCancelComplete()");
	}

	btn.style.backgroundImage = 'url("icons/button/check.png")';

	f.appendChild(btn2);
	f.appendChild(btn);

	let f2 = document.createElement("div");
	f2.id = "folder";

	f2.appendChild(f);
	formularz.appendChild(f2);

	placeholder.appendChild(formularz);

	let opisField = "#opis";
	let opisReg =  /^[\na-zA-ZąćęłńóśóżźĄĆĘŁŃÓŚŹŻ0-9:@!#$%^&*(),. -]{3,}$/; 
	let opisMsg = "Prosze wpisać poprawnie opis. Dozwolone litery, cyfry, spacja oraz znaki: :@!#$%^&*(),.- i enter.";

	let fields = [opis_field];
	
	if(status == '0'){
		let wykonanoField = "#wykonano";
		let wykonanoReg = /^[0-9 :-]{16,16}$/;
		let wykonanoMsg = "Wybierz datę";
	
		fields = [opisField, wykonanoField];

		błąd(wykonanoField, wykonanoReg, wykonanoMsg, fields, button);
	}
	
	błąd(opisField, opisReg, opisMsg, fields, button);
	
	if(status == '0'){
		$(function(){
			$("#wykonano").datepicker();
		});	
	}
	
	$("input").attr("autocomplete", "off");
	
}

function userInfCancelIncomplete(){
	unfinished();
}

function userInfCancelComplete(){
	finished();
}

async function infIncompleteTask(id){
	let url = 'usser_task_edit_incomplete.php';

	let opis = document.getElementById("opis").value;
	let data = document.getElementById("wykonano").value;

	let usserId = readCookie("login");
	let params = 'taskId=' + id + '&usserId=' + usserId + '&opis=' + opis

	if(data != ""){
		params = params  + '&data=' + data;
	}

	let wynik = await php(url, params);

	let temat = "Zlecenie: " + document.getElementById("title_tasks").innerText;

	if(wynik == '1'){
		notifications(temat, 'zlecenie zostało dodane jako ukończone');
		unfinished();
	}
	else if(wynik == '2'){
		notifications(temat, 'zlecenie zostało edytowane');
		unfinished();
	}
	else{
		notifications(temat, wynik, 'error');
	}
}

async function infCompleteTask(id){
	let url = 'usser_task_edit_complete.php';

	let opis = document.getElementById("opis").value;

	let usserId = readCookie("login");
	let params = 'taskId=' + id + '&usserId=' + usserId + '&opis=' + opis;


	let wynik = await php(url, params);

	let temat = "Zlecenie: " + document.getElementById("title_tasks").innerText;

	if(wynik == '1'){
		notifications(temat, 'Opis zlecenia został edytowany');
		finished();
	}
	else{
		notifications(temat, wynik, 'error');
	}
}

function usser(){
	let myCookie = readCookie("usser");
	if (myCookie == null) {
		location.href= "index.html";
	}
	else {
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

function przerwa(element){
	element.append(document.createElement("p"));
}


function błąd(field, reg, msg, fields, button, error_field){
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
					let error = document.createElement("a");
					error.id = "error" + field;
					error.classList.add("error_data");
					error.innerText = msg;
					this.after(error);
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


async function setEmail(){
	var login = readCookie("login");
	var email = document.getElementById("email").value;

	let url = 'set_email.php';
	let params = '&login=' + login + '&email=' + email;

	let zmieniono = await php(url, params);

	if(zmieniono == 'zmodyfikowano' || zmieniono == 'dodano' ){
		settings();
		let temat = "Zmiana adresu email";
		notifications(temat, zmieniono);
	}
	else{
		let temat = "Zmiana adresu email";
		notifications(temat, zmieniono, 'error');
	}

}

async function changePassword(){
	var hasło = document.getElementById("old_password").value;
	var hasło1 = document.getElementById("new_password").value;
	var hasło2 = document.getElementById("new_password2").value;
	var login = readCookie("login");
	
	if(hasło == hasło2){
		notifications("Zmian hasła", 'Nowe hasło nie może być takie jak stare');
		return;
	}

    if(hasło1 == hasło2){
        let password = CryptoJS.MD5(hasło);
        let url = 'corect.php';

        let params = '&workersId=' + login + '&password=' + password;
    
        let result2 = await php(url, params);
    
        let temat = "Edycja hasła";
    
        if(result2 == "ok"){
            let password2 = CryptoJS.MD5(hasło1);
            let url = 'change.php';
            let params = '&workersId=' + login + '&password=' + password2;
    
            let zmieniono = await php(url, params);
    
            if(zmieniono == "1"){
                    notifications(temat, 'zmieniono');
                    settings();
            }
            else{
                notifications(temat, zmiana, 'error');
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

function tooltip(field, text){
	let podpowiedz = document.createElement("span");
	podpowiedz.classList.add("tooltip");
	podpowiedz.innerText = text;
	field.appendChild(podpowiedz);
}



function podgląd(id){
	if(stan == true){
		stan = false;

		podglądForm(id);

		let url = 'edit_task.php';
		let params = 'taskId='+id;
		let odp2 = php(url, params);
		odp2.then(odp => podglądFormOdp(odp, id));
	}	
}


function podglądForm(id){
	let ogl = document.getElementById(id);

	let podglad = document.createElement("div");
	podglad.id = "podglad" + id;
	podglad.classList.add("podglad");
	podglad.style.display = "block";

	let wyłącz = document.createElement("button");
	wyłącz.id = "wyłącz";
	wyłącz.style.backgroundImage = "url('icons/button/cancel.png')";

	let ogloszenie = document.createElement("div");
	ogloszenie.id = "ogloszenie";
	ogloszenie.style.backgroundImage = "url('icons/paper.png')";
	let kategorie = document.createElement("div");
	kategorie.id = "kategorie1";
	kategorie.style.backgroundImage = "url('icons/category.png')";
	let miasto = document.createElement("div");
	miasto.id = "miasto";
	miasto.style.backgroundImage = "url('icons/neighborhood.png')";
	let ulica = document.createElement("div");
	ulica.id = "ulica";
	ulica.style.backgroundImage = "url('icons/placeholder.png')";
	let nrTelefonu = document.createElement("div");
	nrTelefonu.id = "nrTelefonu";
	nrTelefonu.style.backgroundImage = "url('icons/call.png')";
	let data = document.createElement("div");
	data.id = "data1";
	data.style.backgroundImage = "url('icons/calendar.png')";
	let opis = document.createElement("div");
	opis.id = "opis";
	opis.style.backgroundImage = "url('icons/information.png')";

	podglad.appendChild(wyłącz);
	podglad.appendChild(ogloszenie);
	podglad.appendChild(kategorie);
	podglad.appendChild(miasto);
	podglad.appendChild(ulica);
	podglad.appendChild(nrTelefonu);
	podglad.appendChild(data);
	podglad.appendChild(opis);
	

	ogl.appendChild(podglad);

}

function podglądFormOdp(odp, id){

	if(Array.isArray(odp)){
		let rozmazane = document.createElement("div");
		rozmazane.id = "rozmazanie";
		document.body.appendChild(rozmazane);

		document.getElementById("ogloszenie").innerText = odp[0][1];
		document.getElementById("kategorie1").innerText = odp[0][14];
		document.getElementById("miasto").innerText = odp[0][6];

		let ulica = "ul: " + odp[0][3] + odp[0][4];

		if(odp[0][5] != ""){
			ulica += "/" +odp[0][5];
		}

		document.getElementById("ulica").innerText = ulica;
		document.getElementById("nrTelefonu").innerText = odp[0][7];

		let dt = odp[0][10].replace("T", " ");


		if(odp[0][11].replace("T", " ") != "0000-00-00 00:00:00"){
			dt = odp[0][11].replace("T", " ");
			document.getElementById("data1").style.backgroundImage = "url('icons/date.png')";
		}

		document.getElementById("data1").innerText = dt;
		document.getElementById("opis").innerText = odp[0][8];
	}
	else{
		notifications("Podgląd zlecenia", odp, 'error');
	}
	stan = true;
	podgladOgl(id);
	onEscape(id);

}

function podgladOgl(id){
	var modal = document.getElementById("podglad" + id);
	var rozmazanie = document.getElementById("rozmazanie");

	window.onclick = function(event) {
    if(event.target !=  modal && event.target != document.getElementById("ogloszenie") && event.target != document.getElementById("ogloszenie") &&
		event.target != document.getElementById("kategorie") && event.target != document.getElementById("ulica") &&
		event.target != document.getElementById("nrBudynku") && event.target != document.getElementById("nrLokalu") && 
		event.target != document.getElementById("miasto") && event.target != document.getElementById("nrTelefonu") && 
		event.target != document.getElementById("opis")  && event.target != document.getElementById("data")){
		modal.remove();
		rozmazanie.remove();
		}
	}
}

function onEscape(id){
	document.body.addEventListener("keyup", function(event) {
		if (event.keyCode === 27) {
			var rozmazanie = document.getElementById("rozmazanie");
			var modal = document.getElementById("podglad" + id);
			modal.remove();
			rozmazanie.remove();
		}
	});
	
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


async function oknoPotwierdzenia(funkcja, id, tekst, kontener){
	if(stan == true){
	stan = false;

	let pole = document.createElement("div");
	pole.id = "okno_potwierdzenia";

	let text = document.createElement("div");
	text.id = "tekst_potw";
	text.innerText = tekst;

	let tak = document.createElement("button");
	tak.id = "tak_potw";
	tak.style.backgroundImage = "url('icons/button/check.png')";

	funkcja = funkcja + '("' + id +'")';
	tak.setAttribute("onclick", funkcja);

	let nie = document.createElement("button");
	nie.id = "nie_potw";
	nie.style.backgroundImage = "url('icons/button/cancel.png')";

	pole.appendChild(text);
	pole.appendChild(nie);
	pole.appendChild(tak);

	document.getElementById(kontener).appendChild(pole);

	let promise = new Promise((resolve, reject) => {
		setTimeout(() => resolve("ok"), 500)
	});

	let z = await promise;
	}

	stan = true;
	
	oknoPotwZnikanie();
}


function oknoPotwZnikanie(){
	var modal = document.getElementById("okno_potwierdzenia");

	window.onclick = function(event) {
    	if(event.target !=  modal && event.target != document.getElementById("tekst_potw")){
			modal.remove();
		}
	}

	document.body.addEventListener("keyup", function(event) {
		if (event.keyCode === 27) {
			modal.remove();
		}
	});
}
