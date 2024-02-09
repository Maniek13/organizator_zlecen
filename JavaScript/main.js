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

var usun = 0;

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
	let odp = ["Błąd", "Błąd serwera, spróbój ponownie"];

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
	try{
		http.open('POST', url, true);
		http.send(formData);
	}
	catch (error) {
		console.error(error);
	}
	

	let promise = new Promise((resolve, reject) => {
		setTimeout(() => resolve(odp), ofset);
	});

	let result = await promise;
	
	return result;
}
  

function logout(){
	deleteCookie("admin_log");
	deleteCookie("usser");
	deleteCookie("name");
	let temat = "Logowanie";
	notifications(temat, 'Wylogowano');
	location.href= "index.html";
}

function cancel(from){
	if(from == "pracownik"){
		pracownicy();
	}
	else if(from == "kategorie"){
		categorys();
	}
	else{
		btnShow();
	}
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

function deletingForm(){
	let x = document.getElementById("placeholder");
	if( document.getElementById( "formularz") ){
		let child = document.getElementById("formularz");
		x.removeChild(child);
	}
}

function btnForm() {
	if(stan == true){
		stan = false;
		deletingForm();
		ad();
	}	
}

async function ad(odp){
	let temp = "";
	if(odp){
	temp  = odp.toString();
	}
	
	if(temp.startsWith('Błąd')){
		notifications("Błąd serwera", "Proszę spróbowac jeszcze raz", 'error');
	}
	else{
	let dodawanie = document.createElement("div");
	dodawanie.id = "formularz";

	let folder = document.createElement("div");
	folder.id = "ogloszenie_form";

	let kategorie = document.createElement("select");
	kategorie.name = "kategorie";
	kategorie.id = "kategorie_add";
	
	let katlab = document.createElement("label");
	katlab.setAttribute("for", "kategorie");
	katlab.innerText = "Kategoria zlecenia:";

	let ogloszenie = document.createElement("input");
	ogloszenie.name = "ogloszenie";
	ogloszenie.type = "text";
	ogloszenie.id = "ogloszenie";

	let olab = document.createElement("label");
	olab.setAttribute("for", "ogloszenie");
	olab.innerText = "Nazwa zlecenia:";

	let ulica = document.createElement("input");
	ulica.name = "ulica";
	ulica.type = "text";
	ulica.id = "ulica";

	let ullab = document.createElement("label");
	ullab.setAttribute("for", "ulica");
	ullab.innerText = "Ulica:";

	let nrBudynku = document.createElement("input");
	nrBudynku.name = "nrBudynku";
	nrBudynku.type = "text";
	nrBudynku.id = "nrBudynku";

	let budlab = document.createElement("label");
	budlab.setAttribute("for", "nrBudynku");
	budlab.innerText = "Nr budynku:";

	let nrLokalu = document.createElement("input");
	nrLokalu.name = "nrLokalu";
	nrLokalu.type = "text";
	nrLokalu.id = "nrLokalu";

	let loklab = document.createElement("label");
	loklab.setAttribute("for", "nrLokalu");
	loklab.innerText = "Nr lokalu:";

	let miasto = document.createElement("input");
	miasto.name = "miasto";
	miasto.type = "text";
	miasto.id = "miasto";

	let mlab = document.createElement("label");
	mlab.setAttribute("for", "miasto");
	mlab.innerText = "Miasto:";

	let nrTelefonu = document.createElement("input");
	nrTelefonu.name = "nrTelefonu";
	nrTelefonu.type = "text";
	nrTelefonu.id = "nrTelefonu";

	let telLab = document.createElement("label");
	telLab.setAttribute("for", "nrTelefonu");
	telLab.innerText = "Nr telefonu:";

	let opis = document.createElement("textarea");
	opis.name = "opis";
	opis.id = "opis";

	let temp = document.createElement("div");
	temp.id = "pomoc";

	let oplab = document.createElement("label");
	oplab.setAttribute("for", "opis");
	oplab.innerText = "Opis:";

	let pracownik = document.createElement("select");
	pracownik.id = "pracownik";

	let plab = document.createElement("label");
	plab.setAttribute("for", "pracownik");
	plab.innerText = "Pracownik:";
	
	let resultIm = await employee();;
	
	for(let i = 0; i<resultIm.length; ++i){
		employe = resultIm[i][1] + " " + resultIm[i][2];
		let select = document.createElement("option");
		select.text = employe;
		select.value = employe;
		pracownik.add(select);
	}

	let data = document.createElement("input");
	data.name = "data";
	data.type = "text";
	data.id = "data";

	data.setAttribute("class", "datepicker-here");
	data.setAttribute("data-timepicker", "true");
	data.setAttribute("data-time-format", 'hh:ii');
	data.setAttribute("data-position",'top left');

	data.autocomplete = "off";
	
	let dplab = document.createElement("label");
	dplab.setAttribute("for", "data");
	dplab.innerText = "Termin wykonania:";

	let dodaj = document.createElement("button");	
	let etykieta = document.createElement("div")
	etykieta.id = "ad_title";

	let resultCat = await listCat();

	for(let i = 0; i<resultCat.length; ++i){
		let categorys = document.createElement("option");
		categorys.text = resultCat[i];
		categorys.value = resultCat[i];
		kategorie.add(categorys);
	}
	let form = document.createElement('div');
	form.id = "ad_form";

	let btnOnEnter;

	if(typeof odp !== 'undefined'){	
		ogloszenie.setAttribute("value", odp[0][1]);
		kategorie.value = odp[0][14];
		ulica.setAttribute("value", odp[0][3]);
		nrBudynku.setAttribute("value", odp[0][4]);
		nrLokalu.setAttribute("value", odp[0][5]);
		miasto.setAttribute("value", odp[0][6]);
		nrTelefonu.setAttribute("value", odp[0][7]);
		opis.value = odp[0][8];
		pracownik.value =odp[0][16] + " " + odp[0][17];
		let dt = odp[0][10].replace("T", " ");
		data.setAttribute("value", dt);

		etykieta.innerHTML = "Edytuj zlecenie";
		dodaj.id = "edytuj";
		dodaj.style.backgroundImage = "url('icons/button/check.png')";
		tooltip(dodaj, "Edytuj");
		btnOnEnter = "edytuj";
		let nazwa = "btnEditTask("+odp[0][0]+")";
		dodaj.setAttribute("onclick", nazwa);
	}
	else{
		etykieta.innerHTML = "Dodaj zlecenie";
		dodaj.id = "dodaj";
		tooltip(dodaj, "Dodaj");
		dodaj.style.backgroundImage = "url('icons/button/plus.png')";
		btnOnEnter = "dodaj";
		dodaj.setAttribute("onclick", "btnAddTask()");
	}

	let anuluj = document.createElement("button");
	anuluj.id = "anuluj";
	tooltip(anuluj, "Anuluj");
	anuluj.setAttribute("onclick", 'cancel("zlecenia")');
	anuluj.style.backgroundImage = "url('icons/button/back.png')";

	form.appendChild(etykieta);

	let pole = document.createElement("div");
	pole.id = "pole";

	let tytuł = document.createElement("div");
	tytuł.id = "tytuł_form";

	tytuł.appendChild(etykieta);

	addToDiv([anuluj, dodaj], tytuł, 'ad_btns', "btn");
	form.appendChild(tytuł);

	let formularz = document.createElement("div");
	formularz.id = "form_form";

	addToDiv([olab, ogloszenie], formularz, "pole1", "form_input" ,"paper", "pole");
	addToDiv([katlab, kategorie], formularz, "pole2", "form_input" ,"category", "pole");
	addToDiv([ullab, ulica], formularz, "pole3", "form_input" ,"placeholder", "pole");
	addToDiv([budlab, nrBudynku], formularz, "pole4", "form_input" ,"bulding", "pole");
	addToDiv([loklab, nrLokalu], formularz, "pole5", "form_input" ,"123", "pole");
	addToDiv([mlab, miasto], formularz, "pole6", "form_input" ,"neighborhood", "pole");
	addToDiv([telLab, nrTelefonu], formularz, "pole7", "form_input" ,"call", "pole");
	addToDiv([oplab, opis], formularz, "pole8", "form_input" ,"information", "pole_opis");
	formularz.appendChild(temp);
	addToDiv([plab, pracownik], formularz, "pole9", "form_input" ,"user", "pole");
	addToDiv([dplab, data], formularz, "pole10", "form_input" ,"calendar", "pole");

	form.appendChild(formularz);
	dodawanie.appendChild(form);
	placeholder.appendChild(dodawanie);
	

	let inputOgloszenie = "#ogloszenie";
	let reg = /^[a-zA-ZąćęłńóśóżźĄĆĘŁŃÓŚŹŻ0-9 -]{3,}$/; 
	let msg = "Nazwa może zawierać cyfry, litery, spacje oraz -.";

	let inputUlica ="#ulica";
	let regIUL = /^[a-zA-ZąćęłńóśóżźĄĆĘŁŃÓŚŹŻ0-9 ]{3,}$/; 
	let msgUl = "Nazwa może zawierać cyfry bądź litery i spacja.";

	let inputNrBudynku = "#nrBudynku";
	let regINB = /^[a-zA-Z0-9]{1,}$/; 
	let msgINB = "Nazwa może zawierać cyfry bądź litery.";

	let inpNL = "#nrLokalu";
	let regNL = /^[0-9a-zA-Z]{1,}$/; 
	let msgNL = "Nazwa może zawierać cyfry bądź litery.";

	let inpM = "#miasto";
	let regM = /^[a-zA-ZąćęłńóśóżźĄĆĘŁŃÓŚŹŻ0-9 ]{3,}$/; 
	let msgM = "Nazwa może zawierać cyfry bądź litery i spacja.";
	
	let inpNrT = "#nrTelefonu";
	let regNrT = /^[0-9+ ]{9,}$/; 
	let msgNrT = "Wpisz poprawny numer telefonu, zawierajacy conajminej 9 cyfr. Moze zawierac cyfry i znak plus.";

	let inpO = "#opis";
	let regO = /^[\na-zA-ZąćęłńóśóżźĄĆĘŁŃÓŚŹŻ0-9:@!#$%^&*(),. -]{3,}$/; 
	let msgO = "Opis może zawierać cyfry, litery bądź spacje oraz znaki specjalne: :@!#$%^&*(),.-, w tym znak końca lini.";
	
	let inpD = "#data";
	let regD = /^[0-9 :-]{16,16}$/;
	let msgD = "Wybierz termin wykonania zlecenia";

	let inputs =[inputOgloszenie, inputUlica, inputNrBudynku, inpM, inpNL, inpNrT, inpO, inpD];

	if(odp){
		var button = "edytuj";
	}
	else{
		var button = "dodaj";
	}

	błąd(inputOgloszenie, reg, msg, inputs, button, "pole1", "1");
	błąd(inputUlica, regIUL, msgUl, inputs, button, "pole3", "1");
	błąd(inputNrBudynku, regINB, msgINB, inputs, button, "pole4", "1");
	błąd(inpM, regM, msgM, inputs, button, "pole6", "1");
	błąd(inpNL, regNL, msgNL, inputs, button, "pole5", "1");
	błąd(inpNrT, regNrT, msgNrT, inputs, button, "pole7", "1");
	błąd(inpO, regO, msgO, inputs, button, "pole8", "1");
	błąd(inpD, regD, msgD, inputs, button, "pole10", "1");

	$(function(){
		$("#data").datepicker();
	});

	$("input").attr("autocomplete", "off");
	let fields =['ogloszenie', 'ulica', 'nrBudynku', 'nrLokalu', 'miasto', 'nrTelefonu', 'data'];
	onEnter(fields, btnOnEnter);
	}
	stan = true;
}

async function btnEmployeeForm(){
	if(stan == true){
		stan = false;
		deletingForm();
		emp();
	}	
}

function emp(odp){
	let t1 = "";
	if(odp){
		t1  = odp.toString();
	}

	if(t1.startsWith('Błąd')){
		notifications("Błąd serwera", "Proszę spróbowac jeszcze raz", 'error');
	}
	else{
	let dodawanie = document.createElement("div");
	dodawanie.id = "formularz";
	
	let imie = document.createElement("input");
	imie.name = "imie";
	imie.type = "text";
	imie.id = "imie";

	let ilab = document.createElement("label");
	ilab.setAttribute("for", "tytuł");
	ilab.innerText = "Imię:";

	let nazwisko = document.createElement("input");
	nazwisko.name = "nazwisko";
	nazwisko.type = "text";
	nazwisko.id = "nazwisko";

	let nlab = document.createElement("label");
	nlab.setAttribute("for", "nazwisko");
	nlab.innerText = "Nazwisko:";

	let login = document.createElement("input");
	login.name = "login";
	login.type = "text";
	login.id = "login";

	let loginlab = document.createElement("label");
	loginlab.setAttribute("for", "login");
	loginlab.innerText = "Login:";

	let hasło = document.createElement("input");
	hasło.name = "hasło";
	hasło.type = "text";
	hasło.id = "hasło";

	let hlab = document.createElement("label");
	hlab.setAttribute("for", "hasło");
	hlab.innerText = "Hasło:";

	let nrTelefonu = document.createElement("input");
	nrTelefonu.name = "nrTelefonu";
	nrTelefonu.type = "text";
	nrTelefonu.id = "nrTelefonu";

	let ntlab = document.createElement("label");
	ntlab.setAttribute("for", "nrTelefonu");
	ntlab.innerText = "Nr telefonu:";

	let ulica = document.createElement("input");
	ulica.name = "ulica";
	ulica.type = "text";
	ulica.id = "ulica";

	let ulab = document.createElement("label");
	ulab.setAttribute("for", "ulica");
	ulab.innerText = "Ulica:";

	let nrBudynku = document.createElement("input");
	nrBudynku.name = "nrBudynku";
	nrBudynku.type = "text";
	nrBudynku.id = "nrBudynku";

	let nblab = document.createElement("label");
	nblab.setAttribute("for", "nrBudynku");
	nblab.innerText = "Nr budynku:";

	let nrLokalu = document.createElement("input");
	nrLokalu.name = "nrLokalu";
	nrLokalu.type = "text";
	nrLokalu.id = "nrLokalu";

	let nllab = document.createElement("label");
	nllab.setAttribute("for", "nrLokalu");
	nllab.innerText = "Nr lokalu:";
	
	let miasto = document.createElement("input");
	miasto.name = "miasto";
	miasto.type = "text";
	miasto.id = "miasto";

	let mlab = document.createElement("label");
	mlab.setAttribute("for", "miasto");
	mlab.innerText = "Miasto:";

	let dodaj = document.createElement("button");
	let etykieta = document.createElement("div");
	etykieta.id = "emp_title";

	let btn_on_enter;

	if(typeof odp === 'undefined'){	
		etykieta.innerHTML = "<a>Dodaj pracownika</a>";	
		dodaj.id = "dodaj";
		tooltip(dodaj, "Dodaj");
		dodaj.style.backgroundImage = "url('icons/button/plus.png')";
		btn_on_enter = "dodaj";
		dodaj.setAttribute("onclick", "btnAddEmployee()");
	}
	else{
		etykieta.innerHTML = "<a>Edytuj pracownika</a>";
		imie.setAttribute("value", odp[0][1]);
		nazwisko.setAttribute("value", odp[0][2]);
		login.setAttribute("value", "");
		hasło.setAttribute("value", "");
		nrTelefonu.setAttribute("value", odp[0][3]);
		ulica.setAttribute("value", odp[0][4]);
		nrBudynku.setAttribute("value", odp[0][5]);
		nrLokalu.setAttribute("value", odp[0][6]);
		miasto.setAttribute("value", odp[0][7]);

		let temp = "btnEditEmp(" + odp[0][0] + ")";
		dodaj.id = "edytuj";
		tooltip(dodaj, "Edytuj");
		dodaj.style.backgroundImage = "url('icons/button/check.png')";
		btn_on_enter = "edytuj";
		dodaj.setAttribute("onclick", temp);
	}
	let form = document.createElement('div');
	form.id = "emp_form";

	let tytuł = document.createElement("div");
	tytuł.id = "tytuł_form";

	tytuł.appendChild(etykieta);

	let anuluj = document.createElement("button");
	anuluj.id = "anuluj";
	tooltip(anuluj, "Anuluj");
	anuluj.setAttribute("onclick", 'cancel("pracownik")');
	anuluj.style.backgroundImage = "url('icons/button/back.png')";

	addToDiv([anuluj, dodaj], tytuł, 'emp_btns', "btn");
	form.appendChild(tytuł);

	let formularz = document.createElement("div");
	formularz.id = "form_form";
	
	addToDiv([ilab, imie], formularz, "pole1", "form_input" ,"user", "pole");
	addToDiv([nlab, nazwisko], formularz, "pole2", "form_input" ,"name", "pole");
	addToDiv([loginlab, login], formularz, "pole3", "form_input" ,"login", "pole");
	addToDiv([hlab, hasło], formularz, "pole4", "form_input" ,"password", "pole");
	addToDiv([ntlab, nrTelefonu], formularz, "pole5", "form_input" ,"call", "pole");
	addToDiv([ulab, ulica], formularz, "pole6", "form_input" ,"placeholder", "pole");
	addToDiv([nblab, nrBudynku], formularz, "pole7", "form_input" ,"bulding", "pole");
	addToDiv([nllab, nrLokalu], formularz, "pole8", "form_input" ,"123", "pole");
	addToDiv([mlab, miasto], formularz, "pole9", "form_input" ,"neighborhood", "pole");

	form.appendChild(formularz);
	dodawanie.appendChild(form);
	placeholder.appendChild(dodawanie);

	let inpI = "#imie";
	let regI = /^[a-zA-ZąćęłńóśóżźĄĆĘŁŃÓŚŹŻ]{3,}$/; 
	let msgI = "Nazwa może zawierać cyfry bądź litery.";

	let inpN = "#nazwisko";
	let regN = /^[a-zA-ZąćęłńóśóżźĄĆĘŁŃÓŚŹŻ-]{3,}$/;
	let msgN = "Nazwa może zawierać cyfry bądź litery oraz -.";

	let inpL = "#login";
	let regL = /^[a-zA-ZąćęłńóśóżźĄĆĘŁŃÓŚŹŻ0-9:!*&^%$#@]{3,}$/;
	let msgL = "Login może zawierać cyfry bądź litery araz znaki: :!*&^%$#@";

	let inpH = "#hasło";
	let regH = /^[a-zA-ZąćęłńóśóżźĄĆĘŁŃÓŚŹŻ0-9:!*&^%$#@]{3,}$/;
	let msgH = "Hasło może zawierać cyfry bądź litery araz znaki: :!*&^%$#@";

	let inpNrT = "#nrTelefonu";
	let regNrT = /^[0-9+ ]{9,}$/; 
	let msgNrT = "Wpisz poprawny numer telefonu, zawierajacy conajminej 9 cyfr. Moze zawierac cyfry i znak plus.";

	let inpUl = "#ulica";
	let regUl = /^[a-zA-Z0-9ąćęłńóśóżźĄĆĘŁŃÓŚŹŻ .]{3,}$/;
	let msgUl= "Nazwa może zawierać cyfry bądź litery oraz spacje i ..";

	let inpNrB = "#nrBudynku";
	let regNrB = /^[a-zA-Z0-9]{1,}$/;
	let msgNrB = "Nazwa może zawierać cyfry bądź litery.";

	let inpNrL = "#nrLokalu";
	let regNrL = /^[a-zA-Z0-9]{0,}$/;
	let msgNrL = "Nazwa może zawierać cyfry bądź litery.";

	let inpMi = "#miasto";
	let regMi = /^[a-zA-ZąćęłńóśóżźĄĆĘŁŃÓŚŹŻ0-9 ]{3,}$/;
	let msgMi = "Nazwa może zawierać cyfry bądź litery oraz spacje.";

	let fields = [inpI, inpN, inpL, inpH, inpNrT, inpUl, inpNrB, inpNrL, inpMi];

	if(odp){
		var button = "edytuj";
	}
	else{
		var button = "dodaj";
	}
	
	błąd(inpI, regI, msgI, fields, button, "pole1", "1");
	błąd(inpN, regN, msgN, fields, button, "pole2", "1");
	błąd(inpL, regL, msgL, fields, button, "pole3", "1");
	błąd(inpH, regH, msgH, fields, button, "pole4", "1");
	błąd(inpNrT, regNrT, msgNrT, fields, button, "pole5", "1");
	błąd(inpUl, regUl, msgUl, fields, button, "pole6", "1");
	błąd(inpNrB, regNrB, msgNrB, fields, button, "pole7", "1");
	błąd(inpNrL, regNrL, msgNrL, fields, button, "pole8", "1");	
	błąd(inpMi, regMi, msgMi, fields, button, "pole9", "1");

	$("input").attr("autocomplete", "off");

	let fieldsOnEnter =['imie', 'nazwisko', 'login', 'hasło', 'nrTelefonu', 'ulica', 'nrBudynku', 'nrLokalu', 'miasto'];
	onEnter(fieldsOnEnter, btn_on_enter);

	}
	stan = true;
}

function categorys(){
	if(stan == true){
		stan = false;
		deletingForm();
		cats();
	}
}

async function cats(){
	let dodawanie = document.createElement("div");
	dodawanie.id = "formularz";

	let przyciski = document.createElement("div");
	przyciski.id = "przyciski";

	let przycisk = document.createElement("button");
	przycisk.setAttribute("onclick", "categorysAdd()");
	przycisk.id = "add_cat";
	przycisk.innerHTML = "<div>Dodaj kategorie</div>";

	przyciski.appendChild(przycisk);
	dodawanie.appendChild(przyciski);


	let resultcat = await listCat();

	let t1  = resultcat.toString();

	if(t1.startsWith('Błąd')){
		notifications("Błąd serwera", "Proszę spróbowac jeszcze raz", 'error');
		return;
	}

	let lista = document.createElement("div");
	lista.id = "lista_kategorii";

	if(resultcat.length < 1){
		msg = "Brak kategorii do wyświetlenia"
		
		let komunikat = document.createElement("div");
		komunikat.id = "task_msg";

		let p_msg = document.createElement("p");
		p_msg.innerText = msg;

		komunikat.appendChild(p_msg);

		dodawanie.appendChild(komunikat);
	}
	else{
		for(let i = 0; i<resultcat.length; ++i){
			let element = document.createElement("div");
	
			element.id = "objekt" + resultcat[i];
			element.classList.add("objekt");
	
			let tekst = document.createElement("div");
			tekst.style.backgroundImage = "url('icons/list.png')";
			tekst.innerText = resultcat[i];
			tekst.id = "tekst"
	
			let button = document.createElement("div");
			button.id = "cat_btns";
	
			let guzik = document.createElement('button');
			let temp = 'delCategory("' + resultcat[i] +'")';
			guzik.style.backgroundImage = 'url("icons/button/delete.png")';
			guzik.setAttribute('onclick', temp);
			guzik.id = "usuń";
			tooltip(guzik, "Usuń");
	
	
			let guzik1 = document.createElement('button');
			temp = 'editCategoryForm("' + resultcat[i] +'")';
			guzik1.style.backgroundImage = 'url("icons/button/pencil.png")';
			guzik1.setAttribute('onclick', temp);
			guzik1.id = "usuń";
			tooltip(guzik1, "Edytuj");
	
			button.appendChild(guzik1);
			button.appendChild(guzik);
			element.appendChild(tekst);
			element.appendChild(button);
			lista.appendChild(element);
		}
	
		dodawanie.appendChild(lista);
	

	}
	placeholder.appendChild(dodawanie);

	stan = true;
}


function categorysAdd(name){
	if(stan == true){
		stan = false;
		deletingForm();
		catsAddForm(name);	
	}
}

function catsAddForm(name){
	let dodawanie = document.createElement("div");
	dodawanie.id = "formularz";

	let kategoria = document.createElement("input");
	kategoria.name = "kategorie";
	kategoria.type = "text";
	kategoria.id = "kategorie";

	if(typeof name != "undefined"){
		kategoria.value = name;
	}

	let klab = document.createElement("label");
	klab.setAttribute("for", "kategorie");
	klab.innerText = "Kategoria:";

	let addCat = document.createElement('div');
	addCat.id = "category_new";
	addCat.style.backgroundImage = 'url("icons/category.png")';

	let catForm = document.createElement("div");
	catForm.id = "cat_inp";

	catForm.appendChild(klab);
	catForm.appendChild(kategoria);
	addCat.appendChild(catForm);
	

	let btnCat = document.createElement('div');
	btnCat.id = "cat_btn_new";

	let dodaj = document.createElement("button");


	if(typeof name != "undefined"){
		dodaj.id = "edytuj";
		tooltip(dodaj, "Edytuj");
		dodaj.setAttribute("onclick", 'editCategory("' + name + '")');
		dodaj.style.backgroundImage = 'url("icons/button/check.png")';
	}
	else{
		dodaj.id = "dodaj";
		tooltip(dodaj, "Dodaj");
		dodaj.setAttribute("onclick", "addCategory()");
		dodaj.style.backgroundImage = 'url("icons/button/plus.png")';
	}
	
	let cofnij = document.createElement("button");
	cofnij.id = "cofnij";
	tooltip(cofnij, "Cofnij");
	cofnij.setAttribute("onclick", 'cancel("kategorie")');
	cofnij.style.backgroundImage = 'url("icons/button/back.png")';

	btnCat.appendChild(cofnij);
	btnCat.appendChild(dodaj);

	let form = document.createElement("div");
	form.id = "cat_form";

	let etykieta = document.createElement("div");
	etykieta.id = "cat_title";

	let t = document.createElement("div");
	t.innerHTML = "<a>Dodaj kategorie</a>";
	t.id = "cat_t_text";

	if(typeof name != "undefined"){
		t.innerHTML = "Edytuj kategorie";
	}


	etykieta.appendChild(t);
	etykieta.appendChild(btnCat);
	form.appendChild(etykieta);
	form.appendChild(addCat);
	dodawanie.appendChild(form);
	placeholder.appendChild(dodawanie);

	let inpI = "#kategorie";
	let regI = /^[a-zA-ZąćęłńóśóżźĄĆĘŁŃÓŚŹŻ0-9 -]{3,}$/; 
	let msgI= "Nazwa może zawierać cyfry bądź litery oraz spacje i -.";
	błąd(inpI, regI, msgI);	

	let kat = ['kategorie'];
	onEnter(kat, 'dodaj');

	stan = true;
}


async function addCategory(){
	let kategoria = document.getElementById("kategorie").value;
	let url = 'add_category.php';
	let params = 'kategoria=' + kategoria;
	let odp = php(url, params);

	odp.then(function (odp){
		let temat = "Dodawanie kategorii";

		if(odp != '1'){
				notifications(temat, odp, 'error');
		}
		else{
				notifications(temat, "Dodano kategorie: " + kategoria);
				categorys();
		}
	}); 
}

function delCategory(i){
	if(i){
		var kategoria = i;
	}
	else{
		var kategoria = document.getElementById("kategorie").value;
	}	
	pole = "objekt" + i;

	let temp = document.getElementById(pole);
	let nazwa = temp.childNodes[0].textContent;

	okno_potwierdzenia("delCat", kategoria, "Czy napewno chcesz usunąć kategorie " + nazwa + "?", pole);
}

function editCategoryForm(name){
	if(stan == true){
		stan = false;
		deletingForm();
		catsAddForm(name);	
	}
}

function editCategory(name){
	let kategoria = document.getElementById("kategorie").value;
	let url = 'edit_category.php';
	let params = 'kategoria=' + kategoria + '&stara=' + name;
	let odp = php(url, params);

	odp.then(function (odp){
		let temat = "Edycja kategorii";

		if(odp != '1'){
				notifications(temat, odp, 'error');
		}
		else{
				notifications(temat, "Zmieniono nazwę z " + name + " na " + kategoria );
				categorys();
		}
	}); 
}

async function delCat(kategoria){
	let url = 'del_category.php';
	let params = 'kategoria=' + kategoria;
	let odp = php(url, params);

	odp.then(function(odp){
		let temat = "Usuwanie kategori"
		if(odp != '1'){
			notifications(temat, odp, 'error');
		}
		else{
			notifications(temat, 'usunięto kategorie: ' + kategoria);
			categorys();
		}
	}); 	


}

function btnShow() {
	if(stan == true){
		stan = false;
		let url = 'show_task.php';
		let params;
		let odp2 = php(url, params);
		odp2.then(odp => dispAds(odp));	
	}	
}

async function dispAds(odp){
	let temp = "";
	if(odp){
	temp  = odp.toString();
	}

	if(temp.startsWith('Błąd')){
		notifications("Błąd serwera", "Proszę spróbowac jeszcze raz", 'error');
	}
	else{
		if(document.getElementById('ogloszenia') ){
			let x = document.getElementById("formularz");
			let child = document.getElementById("ogloszenia");
			x.removeChild(child);
			taskList(x, odp);
		}
		else{
			deletingForm();

			let wyswietlanie = document.createElement("div");
			wyswietlanie.id = "formularz";

			let przyciski = document.createElement("div");
			przyciski.id = "przyciski";
		
			let addTask = document.createElement("button");
			addTask.setAttribute("onclick", "btnForm()");
			addTask.id = "add_task";
			addTask.innerHTML = "<div>Dodaj zlecenie</div>"
			
			let belka = document.createElement("div");
			belka.id = "filtry";
		
			let status = document.createElement("select");
			status.id = "status";
			status.setAttribute("onchange", "filtr()");
		
			let opcja = document.createElement("option");
			opcja.innerText = "";
			opcja.value = "wszystkie";
		
			let opcja3  = document.createElement("option");
			opcja3.value = "wszystkie";
			opcja3.innerText = "Wszystkie";
			
			let opcja1  = document.createElement("option");
			opcja1.value = "zakończone";
			opcja1.innerText = "Zakończone";
		
			let opcja2  = document.createElement("option");
			opcja2.value = "niezakończone";
			opcja2.innerText = "Niezakończone";
		
		
			let kategorie_wynik = await listCat();
		
			let temp1  = kategorie_wynik.toString();
		
			if(temp1.startsWith('Błąd')){
				notifications("Błąd serwera", "Proszę spróbowac jeszcze raz", 'error');
			}
			
			var kategorie = document.createElement("select");
			kategorie.name = "kategorie";
			kategorie.id = "kategorie";
			kategorie.setAttribute("onchange", "filtr()");

			let c = document.createElement("option");
			c.text = '';
			c.value = '';	
			kategorie.appendChild(c);

			for(let i = 0; i<kategorie_wynik.length; ++i){
				let categorys = document.createElement("option");
				categorys.text = kategorie_wynik[i];
				kategorie.appendChild(categorys);
			}
		
			let pracownik = document.createElement("select");
			pracownik.id = "pracownik";
			pracownik.setAttribute("onchange", "filtr()");
		
			let resultIm = await employee();
		
			let t1  = resultIm.toString();
		
			if(t1.startsWith('Błąd')){
				notifications("Błąd serwera", "Proszę spróbowac jeszcze raz", 'error');
				return;
			}
			let def = document.createElement("option");
			def.innerText = "";
			def.value = "";
			pracownik.appendChild(def);
		
			for(let i = 0; i<resultIm.length; ++i){		
				let pracownik_tekst = resultIm[i][1] + " " + resultIm[i][2];
				let pracownik_dane = document.createElement("option");
				pracownik_dane.innerText = pracownik_tekst;
				pracownik.appendChild(pracownik_dane);
			}
		
		
			let data = document.createElement("input");
			data.style.backgroundImage = 'url("icons/calendar.png")';
			data.name = "";
			data.type = "text";
			data.id = "data";
		
			data.setAttribute("data-time-format", 'hh:ii');
			data.setAttribute("data-range", "true");
			data.setAttribute("data-multiple-dates-separator", ' : ');
			data.setAttribute("class", "datepicker-here");

			data.autocomplete  = "off";
		
			let reset = document.createElement("button");
			reset.innerText = "Wyczyśc wszystkie filtry";
			reset.setAttribute("onclick", "reset()");
			reset.id = "reset";
		
			let pracownikLabel = document.createElement("label");
			pracownikLabel.setAttribute("for", "praconik");
			pracownikLabel.innerText = "Pracownik:";
		
			let kategorieLabel = document.createElement("label");
			kategorieLabel.setAttribute("for", "kategorie");
			kategorieLabel.innerText = "Kategorie:";
		
			let dataLabel = document.createElement("label");
			dataLabel.setAttribute("for", "data");
			dataLabel.innerText = "Data:";
		
			let statusLabel = document.createElement("label");
			statusLabel.setAttribute("for", "status");
			statusLabel.innerText = "Status:";
		
			let d1 = document.createElement("div");
			d1.id = "filtr_div_f";
			d1.classList.add("f1");
			let d2 = document.createElement("div");
			d2.id = "filtr_div_f";
			d2.classList.add("f2");
			let d3 = document.createElement("div");
			d3.id = "filtr_div_f";
			d3.classList.add("f3");
			let d4 = document.createElement("div");
			d4.id = "filtr_div_f";
			d4.classList.add("f4");
		
			d1.appendChild(pracownikLabel);
			d1.appendChild(pracownik);
			belka.appendChild(d1);
			d2.appendChild(kategorieLabel);
			d2.appendChild(kategorie);
			belka.appendChild(d2);
			d3.appendChild(dataLabel);
			d3.appendChild(data);
			belka.appendChild(d3);
			status.appendChild(opcja);
			status.appendChild(opcja3);
			status.appendChild(opcja1);
			status.appendChild(opcja2);
			d4.appendChild(statusLabel);
			d4.appendChild(status);
			belka.appendChild(d4);
		
			let belka2 = document.createElement("div");
			belka2.id = "filtry_reset";
			belka2.appendChild(reset);
	
			przyciski.appendChild(addTask);
		
			wyswietlanie.appendChild(przyciski);
			wyswietlanie.appendChild(belka);
			wyswietlanie.appendChild(belka2);
		
			taskList(wyswietlanie, odp);
			
			placeholder.appendChild(wyswietlanie);
	}

	$(function(){
		$("#data").datepicker({
			onSelect: function(){
				filtr();
			}
		});
	});
	}
	stan = true;
}

function reset(){
	document.getElementById("kategorie").value = "";
	document.getElementById("pracownik").value = "";
	document.getElementById("data").value = "";
	document.getElementById("status").value = "wszystkie";
	filtr();
}

function taskList(form, odp){
	let t1 = "";
	if(odp){
	t1  = odp.toString();
	}

	if(t1.startsWith('Błąd')){
		notifications("Błąd serwera", "Proszę spróbowac jeszcze raz", 'error');
	}
	else{
	let sekcja = document.createElement("div");
	sekcja.id = "ogloszenia";

	if(odp == ''){
		msg = "Brak zadań do wyświetlenia"
		
		let komunikat = document.createElement("div");
		komunikat.id = "task_msg";

		let p_msg = document.createElement("p");
		p_msg.innerText = msg;

		komunikat.appendChild(p_msg);

		sekcja.appendChild(komunikat);
	}
	else{
		for(let i = 0; i < odp.length; i++){
			var ogloszenie = document.createElement("div");
			ogloszenie.classList.add("ogloszenie");
			ogloszenie.id = odp[i][0];
			let placeholder = document.createElement("div");
			placeholder.id = "task";
			let tytuł = document.createElement("h1");
			tytuł.id = "tytuł";
			tytuł.innerHTML = odp[i][1];

			let podglad = document.createElement("button");
			podglad.id = "schow_info";
			podglad.setAttribute("onclick", 'podgląd(' + odp[i][0] + ')');
			podglad.style.backgroundImage = 'url("icons/button/info.png")';
			tooltip(podglad, "Informacje");

	
			let adres = document.createElement("p");
			adres.style.backgroundImage = 'url("icons/tool.png")';
			adres.innerText = odp[i][6] + "\n ul. " + odp[i][3] + " " + odp[i][4] + "/" + odp[i][5];
	
			let data = document.createElement("p");
			data.innerText = odp[i][10];
			data. style.backgroundImage = 'url("icons/calendar.png")';
	
			let nrKontaktowy = document.createElement("p");
			nrKontaktowy. style.backgroundImage = 'url("icons/call.png")';
			nrKontaktowy.innerText =  odp[i][7];
	
			let pracownik = document.createElement("p");
			pracownik. style.backgroundImage = 'url("icons/user.png")';
			pracownik.innerText = odp[i][16] + " " + odp[i][17];
			
			let temp = 'btndel('+odp[i][0] +')';
			let temp2 = 'btnedit('+odp[i][0] +')';
			let temp3 = 'btncomplete('+odp[i][0] +')';
		
			var btn = document.createElement("button");
			btn.id = "usuń";
			btn.innerHTML = "<a>Usuń</a>";
			btn.setAttribute("onclick", temp);
			btn. style.backgroundImage = 'url("icons/button/delete.png")';
	
			var btn2 = document.createElement("button");
			btn2.innerHTML = "<a>Edytuj</a>";
			btn2.id = "edytuj";
			btn2.setAttribute("onclick", temp2);
			btn2. style.backgroundImage = 'url("icons/button/pencil.png")';

			var btn3 = document.createElement("button");
			btn3.innerHTML = "<a>Zakończ</a>";
			btn3.id = "zakoncz";
			btn3.setAttribute("onclick", temp3);
			btn3. style.backgroundImage = 'url("icons/button/check.png")';
			
			placeholder.appendChild(tytuł);
			placeholder.appendChild(podglad);
			placeholder.appendChild(adres);
			placeholder.appendChild(data);
			
			if(odp[i][11] != "0000-00-00 00:00:00"){
				let data2 = document.createElement("p");
				data2.innerText = odp[i][11];
				data2.style.backgroundImage = 'url("icons/date.png")';
				data2.id = "data_ukonczenia";
				placeholder.appendChild(data2);
			}
			
			placeholder.appendChild(nrKontaktowy);
			placeholder.appendChild(pracownik);

			ogloszenie.appendChild(placeholder);
	
			let kontenerButton = document.createElement("div");
			kontenerButton.id = "task_btns";
			kontenerButton.appendChild(btn2);
			kontenerButton.appendChild(btn);

			if(odp[i][9] == '0'){	
				kontenerButton.appendChild(btn3);
			}

			ogloszenie.appendChild(kontenerButton);
			sekcja.appendChild(ogloszenie);
		}

	}
	form.appendChild(sekcja);
	}	
}

async function employee(){
	let url = 'employee.php';
	let params;
	let wynik = await php(url, params);
	let temp  = wynik.toString();

	if(temp.startsWith('Błąd')){
		notifications("Błąd serwera", "Proszę spróbowac jeszcze raz", 'error');
		return;
	}
	return wynik;
}

async function listCat(){
	let url = 'category.php';
	let params;
	let wynik = await php(url, params);
	let temp  = wynik.toString();

	if(temp.startsWith('Błąd')){
		notifications("Błąd serwera", "Proszę spróbowac jeszcze raz", 'error');
		return;
	}
	return wynik;
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
	let tytuł = document.createElement('div');
	tytuł.innerHTML = "<a>" + temat + "</a>";
	tytuł.id = 'tytuł_msg';
	let wiadomość = document.createElement('div');
	wiadomość.innerHTML = "<div>" + tekst + "</div>";
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

async function btnAddTask() {
	let ogloszenie = document.getElementById("ogloszenie").value;
	let ulica = document.getElementById("ulica").value;
	let nrBudynku = document.getElementById("nrBudynku").value;
	let nrLokalu = document.getElementById("nrLokalu").value;
	let miasto = document.getElementById("miasto").value;
	let opis = document.getElementById("opis").value;
	let nrTelefonu = document.getElementById("nrTelefonu").value;
	let pracownik = document.getElementById("pracownik").value;
	let data = document.getElementById("data").value;
	let categorys = document.getElementById("kategorie_add").value;

	let params = 'tytuł=' + ogloszenie + '&ulica=' + ulica + '&nrBudynku=' + nrBudynku + '&nrLokalu=' + nrLokalu + 
	'&miasto=' + miasto + '&opis=' +opis + '&pracownik=' + pracownik + '&dataZlecenia=' + data + '&telefonZlecenie=' + nrTelefonu + '&kategoria=' + categorys;

	let result = await php('add_task.php', params)
	show(result);
}

async function btnEditTask(id) {
	let ogloszenie = document.getElementById("ogloszenie").value;
	let ulica = document.getElementById("ulica").value;
	let nrBudynku = document.getElementById("nrBudynku").value;
	let nrLokalu = document.getElementById("nrLokalu").value;
	let miasto = document.getElementById("miasto").value;
	let opis = document.getElementById("opis").value;
	let nrTelefonu = document.getElementById("nrTelefonu").value;
	let pracownik = document.getElementById("pracownik").value;
	let data = document.getElementById("data").value;
	let categorys = document.getElementById("kategorie_add").value;

	if(categorys == ""){
		let cat = document.getElementById("kategorie_add");
		cat.style.border = "1px solid red";
		notifications("Edycja zlecenia", "Wybierz kategorie", 'error');
		return;
	}
  
	let url = 'update_task.php';
	let params = 'idZlecenia=' + id + '&kategoria=' + categorys +'&tytuł=' + ogloszenie + '&ulica=' + ulica + '&nrBudynku=' + nrBudynku +
				'&nrLokalu=' + nrLokalu + '&miasto=' + miasto + '&opis=' + opis + '&pracownik=' + pracownik +
				'&dataZlecenia=' + data + '&telefonZlecenie=' + nrTelefonu;
	let result = await php(url, params)

	show(result);
}

function show(result){
	let temat = "Zlecenia";
	if(Array.isArray(result)){
		notifications(temat, result[1]);
		btnShow();
	}
	else{
		notifications(temat, result, 'error');
	}
}

async function btnAddEmployee() {
	let imie = document.getElementById("imie").value;
	let nazwisko = document.getElementById("nazwisko").value;
	let login = CryptoJS.MD5(document.getElementById("login").value);
	let nrTelefonu = document.getElementById("nrTelefonu").value;
	let ulica = document.getElementById("ulica").value;
	let nrBudynku = document.getElementById("nrBudynku").value;
	let nrLokalu = document.getElementById("nrLokalu").value;
	let miasto = document.getElementById("miasto").value;
	let password =  CryptoJS.MD5(document.getElementById("hasło").value);
	
	let url = 'add_employee.php';
	let params = 'imie=' + imie + '&nazwisko=' + nazwisko + '&login=' + login +
	'&nrTelefonu=' + nrTelefonu + '&ulica=' + ulica + '&nrBudynku=' + nrBudynku + '&nrLokalu=' + nrLokalu + '&miasto=' + miasto  + '&password=' + password;

	let result = await php(url, params);

	let temat = "Dodawanie procownika";
	if(Array.isArray(result)){
		notifications(temat, "Dodano pracownika: " + result[3] + " " + result[4]);
		pracownicy(); 
	}
	else{
		notifications(temat, result, 'error');
	}
}

function btndel(id){
	let pole = document.getElementById(id);
	let tytuł = pole.childNodes[0].childNodes[0].textContent;
	okno_potwierdzenia("delTask", id, "Czy napewno chcesz usunąć zlecenie " + tytuł +"?", id);
}

function delTask(id){
	let url = 'delete_task.php';
	let params = 'idZlecenia='+id;

	let odp2 = php(url, params);
	odp2.then(odp => notifications("Usuwanie zleceń", "Zlecenie o id: " + id + ".\nStatus: " + odp));

	let handle = document.getElementById("ogloszenia");
	let child = document.getElementById(id);
	handle.removeChild(child);
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
	funkcja = funkcja + '("' + id + '")';
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


function btnedit(id){
	let x = document.getElementById("placeholder");

	if( document.getElementById( "formularz") ){
		let child = document.getElementById("formularz");
		x.removeChild(child);
	}

	let url = 'edit_task.php';
	let params = 'taskId='+id;
	let odp2 = php(url, params);
	odp2.then(odp => ad(odp));
}

function btncomplete(id){
	let pole = document.getElementById(id);
	let tytuł = pole.childNodes[0].childNodes[0].textContent;
	oknoPotwierdzenia("completeTask", id, "Czy napewno chcesz zakończyć zlecenie " + tytuł +"?", id);
}

function completeTask(id){
	let url = 'complete_task_admin.php';
	let params = 'taskId='+id;

	let odp2 = php(url, params);
	odp2.then(odp => completeForm(odp));
}

async function completeForm(odp){
	let temat = "Edycja zlecenia";

	if(odp == '1'){
		notifications(temat, 'zlecenie zostało dodane jako ukończone');
		btnShow();
	}
	else{
		notifications(temat, wynik, 'error');
	}
}

function btnDelEmployee(id){
	pole = "e" + id;

	let temp = document.getElementById(pole);
	let nazwa = temp.childNodes[0].childNodes[0].textContent;

	oknoPotwierdzenia("delEmp", id, "Czy napewno chcesz usunąć pracownika " + nazwa + "?", pole);
}

function delEmp(id){
	let url = 'delete_employee.php';
	let params = 'idPracownika='+id;

	let odp2 = php(url, params);
	odp2.then(odp => {
		let temp  = odp.toString();
		if(temp.startsWith('Błąd')){
			notifications("Usuwanie pracownika", odp, 'error');
		}
		else{
			notifications("Usuwanie pracownika", "Usunięto pracownika o id: " + id);
		}
	});

	let handle = document.getElementById("lista");
	let child = document.getElementById("e" + id);
	handle.removeChild(child);
}



function btnEditEmployee(id){
	let handle = document.getElementById("placeholder");
	
	if( document.getElementById( "formularz") ){
		let child = document.getElementById("formularz");
		handle.removeChild(child);
	}

	let url = 'edit_employee.php';
	let params = 'idPracownika='+id;
	let odp2 = php(url, params);
	odp2.then(odp => emp(odp));
}

function btnEditEmp(id){
	let imie = document.getElementById("imie").value;
	let nazwisko = document.getElementById("nazwisko").value;
	let nrTelefonu = document.getElementById("nrTelefonu").value;
	let ulica = document.getElementById("ulica").value;
	let nrBudynku = document.getElementById("nrBudynku").value;
	let nrLokalu = document.getElementById("nrLokalu").value;
	let miasto = document.getElementById("miasto").value;

	let url = 'update_employee.php';
	let params = 'imie=' + imie + '&nazwisko=' + nazwisko + '&nrTelefonu=' + nrTelefonu + '&ulica=' + ulica +
	'&nrBudynku=' + nrBudynku + '&nrLokalu=' + nrLokalu + '&miasto=' + miasto + '&idPracownika=' + id;


	if(document.getElementById("login").value != ""){
		let login = document.getElementById("login").value;
		params+= '&login=' + CryptoJS.MD5(login);
	}


	if(document.getElementById("hasło").value != ""){
		let hasło = document.getElementById("hasło").value;
		params += '&password=' +  CryptoJS.MD5(hasło);;
	}

	let odp2 = php(url, params);
	odp2.then(odp => editEmp(odp, id, imie, nazwisko));	
} 

function editEmp(odp, id, imie, nazwisko){
	let temat = "Edycja procownika";

	if(Array.isArray(odp)){
		notifications(temat, "Edytowano pracownika: " + imie + " " + nazwisko);
		pracownicy();
	}
	else{
		notifications(temat, odp, 'error');
	}
}

function błąd(field, reg, msg, fields, button, error_field, nowe){
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
				let error = document.createElement("div");
				error.classList.add("error_data");
				error.id = "error" + field;
				error.innerHTML = "<div>" + msg + "</div>";

				if(error_field == null){
					this.after(error);
				}
				else if(nowe == "1"){
					document.getElementById(error_field).after(error);
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
			else if(document.getElementById(error_field) && nowe != "1"){
				let field = document.getElementById(error_field);
				field.style.visibility = "hidden";
			}
		}
	});
}

function addToDiv(elements_array, destination, id, second_div, icon, klasa){
	let div = document.createElement("div");
	let div2 = document.createElement("div");

	if(typeof second_div === 'undefined'){
		div2.id = "form_input";
	}
	else{
		div2.id = second_div;
	}
	
	if(typeof id !== 'undefined'){
		div.id = id;
	}

	if(typeof id !== 'undefined'){
		div.classList.add(klasa);
	}
	else{
		div.classList.add("nowa");
	}

	if(typeof icon !== 'undefined'){
		div.style.backgroundImage = "url('icons/" + icon + ".png')";
	}

	for(i=0; i<elements_array.length; ++i){
		div2.appendChild(elements_array[i]);
	}

	div.appendChild(div2);
	destination.appendChild(div);

}

function filtr(){
	if(stan == true){
	stan = false;
	deletingTaskMsg();
	filtrAction();	
	}
}

function deletingTaskMsg(){
	if(document.getElementById('task_msg')){
		let form = document.getElementById('ogloszenia');
		form.removeChild(document.getElementById('task_msg'));
	}
}

async function filtrAction(){
	let status = document.getElementById("status").value;
	let params = 'filtr=' + status;
	let pracownik = document.getElementById("pracownik").value;

	if(pracownik != "" ){
		params += "&pracownik=" + pracownik;
	}

	let data = document.getElementById("data").value;
	if(data != ""){
		params += "&data=" + data;
	}

	let kategorie = document.getElementById("kategorie").value;
	if(kategorie != ""){
		params += "&kategorie=" + kategorie;
	}

	let url = 'filter.php';
	let res = await php(url, params);
	let temp  = res.toString();

	if(temp.startsWith('Błąd')){
		let temat = "Filtry";
		notifications(temat, res[1], 'error');
	}
	else{
		let form = document.getElementById("formularz");
	
		let child = document.getElementById("ogloszenia");
		form.removeChild(child);
		
		taskList(form, res);
		placeholder.appendChild(form);
	}
	stan = true;
}

function pracownicy(){
	if(stan == true){
		stan = false;
		deletingForm();
		let url = 'show_employee.php';
		let params;
		let odp2 = php(url, params);
		odp2.then(odp => empList(odp));		
	}
}

function empList(odp){
let temp = "";
	if(odp){
	temp  = odp.toString();
	}


	if(temp.startsWith('Błąd')){
		notifications("Błąd serwera", "Proszę spróbować jeszcze raz", 'error');
	}
	else{
		let dodawanie = document.createElement("div");
		dodawanie.id = "formularz";

		let przyciski = document.createElement("div");
		przyciski.id = "przyciski";

		let przycisk = document.createElement("button");
		przycisk.setAttribute("onclick", "btnEmployeeForm()");
		przycisk.id = "add_emp";
		przycisk.innerHTML = "<div>Dodaj pracownika</div>";

		if(odp == "" ){
			msg = "Brak pracowników do wyświetlenia"
			
			let komunikat = document.createElement("div");
			komunikat.id = "task_msg";
	
			let p_msg = document.createElement("p");
			p_msg.innerText = msg;
	
			
			przyciski.appendChild(przycisk);
			dodawanie.appendChild(przyciski);
			
			komunikat.appendChild(p_msg);
			dodawanie.appendChild(komunikat);
			
		}
		else{
			let form = document.createElement("div");
			form.id = "lista";

			for(let i = 0; i < odp.length; i++){
			let akcja ="btnDelEmployee(" + odp[i][0] + ")";
			let akcja2 ="btnEditEmployee(" + odp[i][0] + ")";

			let pracownik = document.createElement("div");
			pracownik.id = "e" + odp[i][0];
			pracownik.classList.add("usser");
			
			let spanx = document.createElement("div");
			spanx.id = "usser_btn";

			let btn = document.createElement("button");
			btn.setAttribute("onclick", akcja2);
			btn.style.backgroundImage = "url('icons/button/pencil.png')";
			btn.classList.add("edit");
			btn.innerHTML = "<a>Edytuj</a>";
			spanx.appendChild(btn);

			let btn2 = document.createElement("button");
			btn2.setAttribute("onclick", akcja);
			btn2.style.backgroundImage = "url('icons/button/delete.png')";
			btn2.classList.add("delete");
			btn2.innerHTML = "<a>Usuń</a>";
			spanx.appendChild(btn2);
			
			let a = document.createElement("div");
			a.classList.add("usser_text");

			let prac = document.createElement("p");
			prac.innerText = odp[i][1] +" " + odp[i][2];
			prac.style.backgroundImage = "url('icons/user.png')";

			let adres = document.createElement("p");
			let nr = "";

			if(odp[i][6] != ""){
				nr = odp[i][5] + "/" + odp[i][6];
			}
			else{
				nr = odp[i][5];
			}
			adres.innerText = odp[i][7] + " ul. " + odp[i][4] +" " + nr;
			adres.style.backgroundImage = "url('icons/tool.png')";

			let nrTel = document.createElement("p");
			nrTel.innerText = odp[i][3];
			nrTel.style.backgroundImage = "url('icons/call.png')";

			a.appendChild(prac);
			a.appendChild(adres);
			a.appendChild(nrTel);
			pracownik.appendChild(a);
			pracownik.appendChild(spanx);
			form.appendChild(pracownik);	
			}

			przyciski.appendChild(przycisk);
			dodawanie.appendChild(przyciski);
			dodawanie.appendChild(form);
		
		}
		placeholder.appendChild(dodawanie);
		
	}	
	stan = true;	
}

function main(){
	let myCookie = readCookie("admin_log");
	if (myCookie == null) {
		location.href= "index.html";
	}
	else {
	}
}

function loged(){
	let myCookie = readCookie("admin_log");
	let myCookie2 = readCookie("usser");

	if (myCookie == null) {
		if (myCookie2 == null) {
			location.href= "login.html";
		}
		else {
			location.href= "usser.html";
		}	
	}
	else {
		location.href= "main.html";
	
	}
}

function settingsAdmin(){
	if(stan == true){
	stan = false;
	deletingForm();
	settingsAdminForm();
	}
}

function settingsAdminForm(){
	let formularz = document.createElement("div");
	formularz.id = "formularz";

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
	tooltip(btn, "Zmień");
	btn.setAttribute("onclick", "changePasswordAdmin()");
	btn.style.backgroundImage = "url('icons/button/check.png')";

	let cofnij = document.createElement("button");
	cofnij.id = "cofnij_pass";
	tooltip(cofnij, "Cofnij");
	cofnij.setAttribute("onclick", 'cancel()');
	cofnij.style.backgroundImage = 'url("icons/button/back.png")';

	let f = document.createElement('div');
	f.id = "settings_form";

	let kont = document.createElement("div");
	kont.id = "change_pass";

	let tytuł = document.createElement("div");
	tytuł.id = "settings_title";
	tytuł.innerHTML ="Zmiana hasła";


	kont.appendChild(tytuł);
	kont.appendChild(btn);
	kont.appendChild(cofnij);

	f.appendChild(kont);

	addToDiv([oldPassLab, oldPass, show3], f, "pole1", "form_input" ,"pass",  "pole");
	addToDiv([newPassLab, newPass, show], f, "pole2", "form_input" ,"pass",  "pole");
	addToDiv([newPassLab2, newPass2, show2], f, "pole3", "form_input" ,"pass",  "pole");
	formularz.appendChild(f);

	let email_label = document.createElement("label");
	email_label.setAttribute("for", "email");
	email_label.innerText = "Adres email:";

	let email = document.createElement("input");
	email.name = "email";
	email.type = "text";
	email.id = "email";

	let btn2 = document.createElement("button");
	btn2.id = "change_email";
	tooltip(btn2, "Zmień");
	btn2.setAttribute("onclick", "changeEmailAdmin()");
	btn2.style.backgroundImage = "url('icons/button/check.png')";

	let cofnij2 = document.createElement("button");
	cofnij2.id = "cofnij_pass";
	tooltip(cofnij2, "Cofnij");
	cofnij2.setAttribute("onclick", 'cancel()');
	cofnij2.style.backgroundImage = 'url("icons/button/back.png")';

	let f2 = document.createElement('div');
	f2.id = "settings_form";

	let kont2 = document.createElement("div");
	kont2.id = "change_pass";

	let tytuł2 = document.createElement("div");
	tytuł2.id = "settings_title";
	tytuł2.innerHTML ="Adres email";

	kont2.appendChild(tytuł2);
	kont2.appendChild(btn2);
	kont2.appendChild(cofnij2);

	f2.appendChild(kont2);

	addToDiv([email_label, email], f2, "pole4", "form_input" ,"email-settings",  "pole");
	
	formularz.appendChild(f2);
	placeholder.appendChild(formularz);

	let msg = "Hasło może zawierać cyfry, litery oraz znaki: :@!$%#^&*(). Musi składać się minumum z pięciu znaków.";
	let button = "change_password";

	let oldPassword = "#old_password";
	let regOld = /^[a-zA-ZąćęłńóśóżźĄĆĘŁŃÓŚŹŻ0-9:@!$%#^&*()]{5,}$/; 
	
	let newPassword = "#new_password";
	let regNew = /^[a-zA-ZąćęłńóśóżźĄĆĘŁŃÓŚŹŻ0-9:@!$%#^&*()]{5,}$/; 

	let newPassword2 = "#new_password2";
	let regNew2 = /^[a-zA-ZąćęłńóśóżźĄĆĘŁŃÓŚŹŻ0-9:@!$%#^&*()]{5,}$/; 

	let fields = [oldPassword, newPassword, newPassword2];

	błąd(oldPassword, regOld, msg, fields, button, "pole1", "1");
	błąd(newPassword, regNew, msg, fields, button, "pole2", "1");
	błąd(newPassword2, regNew2, msg, fields, button, "pole3", "1");

	let fields_on_enter =['old_password', 'new_password', 'new_password2'];
	onEnter(fields_on_enter, 'change_password');

	let button2 = "change_email";

	let emailMsg = "Prosze wpisać poprawnie adres email";
	let emailField = "#email";
	let emailReg =/^[_a-zA-ZZąćęłńóśżźĄĆĘŁŃÓŚŻŹ0-9-]+(\.[_a-zA-ZZąćęłńóśżźĄĆĘŁŃÓŚŻŹ0-9-]+)*@[a-zA-ZZąćęłńóśżźĄĆĘŁŃÓŚŻŹ0-9-]+(\.[a-zA-ZZąćęłńóśżźĄĆĘŁŃÓŚŻŹ0-9-]+)*(\.[a-zA-Z]{2,3})$/; 

	błąd(emailField, emailReg, emailMsg, [emailField], button2, "pole4", "1" );

	onEnter(['email'], button2);

	$("input").attr("autocomplete", "off");
	$("email").attr("autocomplete", "on");

	stan = true;
}

async function changeEmailAdmin(){
	var login = readCookie("admin_login");
	var email = document.getElementById("email").value;

	let url = 'set_admin_email.php';
	let params = '&login=' + login + '&email=' + email;

	let zmieniono = await php(url, params);

	if(zmieniono == 'zmodyfikowano'){
		settingsAdmin();
		let temat = "Zmiana adresu email";
		notifications(temat, zmieniono);
	}
	else{
		let temat = "Zmiana adresu email";
		notifications(temat, zmieniono, 'error');
	}

}

async function changePasswordAdmin(){
	var hasło = document.getElementById("old_password").value;
	var hasło1 = document.getElementById("new_password").value;
	var hasło2 = document.getElementById("new_password2").value;
	var login = readCookie("admin_login");
	let temat = "Edycja hasła";

	if(hasło == hasło2){
		notifications(temat, 'Nowe hasło nie może być takie jak stare');
		return;
	}
		
	if(hasło1 == hasło2){
		let password = CryptoJS.MD5(hasło1);
		let oldPassword = CryptoJS.MD5(hasło);
		let url = 'change_pass_admin.php';
		let params = 'oldpass=' + oldPassword + '&password=' + password + '&login=' + login;
	
		let result = await php(url, params);
		
		if(result == "1"){
			notifications(temat, 'zmieniono');
			settingsAdmin();
		}
		else{
			notifications(temat, result, 'error');
		}
	}
	else{
		notifications(temat, "podane hasła nie są identyczne", 'error');
	}
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
	
function writeCookie(cookieName, cookieValue, expires, domain, path, secureFlag) {
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

	let edytuj = document.createElement("button");
	edytuj.id = "edytuj1";

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
	let pracownik = document.createElement("div");
	pracownik.id = "pracownik1";
	pracownik.style.backgroundImage = "url('icons/user.png')";
	let opis = document.createElement("div");
	opis.id = "opis";
	opis.style.backgroundImage = "url('icons/information.png')";

	podglad.appendChild(wyłącz);
	podglad.appendChild(edytuj);
	podglad.appendChild(ogloszenie);
	podglad.appendChild(kategorie);
	podglad.appendChild(miasto);
	podglad.appendChild(ulica);
	podglad.appendChild(nrTelefonu);
	podglad.appendChild(data);
	
	if(ogl.children[0].children.length == 7){
		let data2 = document.createElement("div");
		data2.style.backgroundImage = 'url("icons/date.png")';
		data2.id = "data_ukonczenia_podglad";
		podglad.appendChild(data2);
	}

	podglad.appendChild(pracownik);
	podglad.appendChild(opis);
	

	ogl.appendChild(podglad);

}

function podglądFormOdp(odp, id){

	if(Array.isArray(odp)){
		let rozmazane = document.createElement("div");
		rozmazane.id = "rozmazanie";
		document.body.appendChild(rozmazane);

		document.getElementById("edytuj1").setAttribute("onclick", "btnedit("+odp[0][0]+")");
		document.getElementById("ogloszenie").innerText = odp[0][1];
		document.getElementById("kategorie1").innerText = odp[0][14];
		document.getElementById("miasto").innerText = odp[0][6];

		let ulica = "ul: " + odp[0][3] + odp[0][4];

		if(odp[0][5] != ""){
			ulica += "/" +odp[0][5];
		}

		document.getElementById("ulica").innerText = ulica;
		document.getElementById("nrTelefonu").innerText = odp[0][7];
		document.getElementById("pracownik1").innerText = odp[0][16] + " " + odp[0][17];

		let dt = odp[0][10].replace("T", " ");
		document.getElementById("data1").innerText = dt;
		
		if(document.getElementById("data_ukonczenia_podglad")){
			let dt2 = odp[0][11].replace("T", " ");
			document.getElementById("data_ukonczenia_podglad").innerText = dt2;
		}

		document.getElementById("opis").innerText = odp[0][8];
	}
	else{
		notifications("Podgląd zlecenia", odp, 'error');
	}
	stan = true;
	podgladOgl(id);
	onEscape(id);

}

function podgladPgl(id){
	var modal = document.getElementById("podglad" + id);
	var rozmazanie = document.getElementById("rozmazanie");

	window.onclick = function(event) {
    if(event.target !=  modal && event.target != document.getElementById("ogloszenie") && event.target != document.getElementById("ogloszenie") &&
		event.target != document.getElementById("kategorie") && event.target != document.getElementById("ulica") &&
		event.target != document.getElementById("nrBudynku") && event.target != document.getElementById("nrLokalu") && 
		event.target != document.getElementById("miasto") && event.target != document.getElementById("nrTelefonu") && 
		event.target != document.getElementById("opis") && event.target != document.getElementById("pracownik") && 
		event.target != document.getElementById("data") && event.target != document.getElementById("edytuj")){
		modal.remove();
		rozmazanie.remove();
		}
	}
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

function tooltip(field, text){
	let podpowiedz = document.createElement("span");
	podpowiedz.classList.add("tooltip");
	podpowiedz.innerText = text;
	field.appendChild(podpowiedz);
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
	adminLab.innerText = "Pracownik:";

	let admin = document.createElement("select");
	admin.name = "admin";
	admin.id = "admin";

	let resultIm = await listEmail();
	
	for(let i = 0; i<resultIm.length; ++i){
		if(resultIm[i][2] != ""){
			let select = document.createElement("option");
			select.text = resultIm[i][1] + " " +  resultIm[i][2];
			select.value = resultIm[i][12];
			admin.add(select);
		}
	}


	let dUp = document.createElement("div");
	dUp.classList.add("upload");
	dUp.style.backgroundImage = 'url("icons/button/paper-clip.png")';

	let fileLab = document.createElement("label");
	fileLab.id = 'upload-label';
	fileLab.innerHTML = "Wybierz plik z komputera";

	let file = document.createElement("input");
	file.type = "file";
	file.id = "file";
	file.name = "file";

	let btn = document.createElement("button");
	btn.id = "send";
	btn.style.backgroundImage = 'url("icons/button/paper-plane.png")';
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
	dUp.appendChild(fileLab);
	dUp.appendChild(file);
	f.appendChild(dUp);
	f.appendChild(btn);

	f1.appendChild(f);
	dodawanie.appendChild(f1);
	placeholder.appendChild(dodawanie);

	let button = "send";
	let tematMsg = "Prosze wpisać poprawny temat, bez znaków specjalnych";
	let teamtField = "#temat";
	let tematReg = /^[a-zA-ZąćęłńóśóżźĄĆĘŁŃÓŚŹŻ0-9 ]{1,}$/; 

	let msgMsg = "Prosze wpisać poprawną wiadomość. Wiadomość może zawierać cyfry, litery bądź spacje oraz znaki specjalne: :@!#$%^&*(),.-, enter i składać się conajmniej z pięciu znaków";
	let msgField = "#msg";
	let msgReg = /^[\na-zA-ZąćęłńóśóżźĄĆĘŁŃÓŚŹŻ0-9 :@!#$%^&*(),.-]{2,}$/; 

	let fields = [ teamtField, msgField];

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

	tooltip(document.getElementById('send'), 'Wyślij');
}


async function sendEmail(){
	document.getElementById("send").disabled = true;

	let from = readCookie("admin_login");
	let temat = document.getElementById("temat").value;
	let msg = document.getElementById("msg").value;
	let usser = "administrator";
	let to = document.getElementById("admin").value;

	let temat1 = "Wysyłanie emaila";

	let wczytywanie = document.createElement("div");
	wczytywanie.id = "wczytywanie";
	wczytywanie.innerHTML = "<div></div><div></div><div></div><div></div>";

	document.getElementById("form").appendChild(wczytywanie);

	document.getElementById("wczytywanie").classList.add("lds-ring");

	let mail_check = 'admin_mail_check.php';
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
				document.getElementById("wczytywanie").remove();
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


async function listEmail(){
	let url = 'usser_email_list.php';
	let params;
	let wynik = await php(url, params);
	let temp  = wynik.toString();

	if(temp.startsWith('Błąd')){
		notifications("Błąd serwera", "Proszę spróbowac jeszcze raz", 'error');
		return;
	}
	return wynik;
}

function przerwa(element){
	element.append(document.createElement("p"));
}