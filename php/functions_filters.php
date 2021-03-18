<?php

function zakończone(){
    $sql = "SELECT * FROM tasks LEFT JOIN taskCategory ON categoryId  = catId LEFT JOIN workers ON workersId  = workerId WHERE status = '1' ORDER BY taskId ASC";
    Sql($sql);
}

function niezakończone(){
    $sql = "SELECT * FROM tasks LEFT JOIN taskCategory ON categoryId  = catId LEFT JOIN workers ON workersId  = workerId WHERE status = '0' ORDER BY taskId ASC";
    Sql($sql);   
}

function wszystkie(){
    $sql = "SELECT * FROM tasks LEFT JOIN taskCategory ON categoryId  = catId LEFT JOIN workers ON workersId  = workerId ORDER BY taskId ASC";
    Sql($sql);
}

function wszystkie_pracownik(){
    $pracownik = employee();
    Sql_employe($pracownik);
    
    $sql = "SELECT * FROM tasks LEFT JOIN taskCategory ON categoryId  = catId LEFT JOIN workers ON workersId  = workerId WHERE workerId = '$pracownik' ORDER BY taskId ASC";
    Sql($sql);  
}

function zakończone_pracownik(){
    $pracownik = employee();
    Sql_employe($pracownik);

    $sql = "SELECT * FROM tasks LEFT JOIN taskCategory ON categoryId  = catId LEFT JOIN workers ON workersId  = workerId WHERE workerId = '$pracownik' and status = '1' ORDER BY taskId ASC";
    Sql($sql);       
}

function niezakończone_pracownik(){
    $pracownik = employee();
    Sql_employe($pracownik);
    
    $sql = "SELECT * FROM tasks LEFT JOIN taskCategory ON categoryId  = catId LEFT JOIN workers ON workersId  = workerId WHERE workerId = '$pracownik' and status = '0' ORDER BY taskId ASC";
    Sql($sql);
}

function wszystkie_pracownik_czas(){
    $pracownik = employee();
    Sql_employe($pracownik);
    $czas = czas();
    
    $sql = "SELECT * FROM tasks LEFT JOIN taskCategory ON categoryId  = catId LEFT JOIN workers ON workersId  = workerId WHERE workerId = '$pracownik' and taskDate <= '$czas[1]' and taskDate >= '$czas[0]' ORDER BY taskId ASC";
    Sql($sql);
}

function zakończone_pracownik_czas(){
    $pracownik = employee();
    Sql_employe($pracownik);
    $czas = czas();

    $sql = "SELECT * FROM tasks LEFT JOIN taskCategory ON categoryId  = catId LEFT JOIN workers ON workersId  = workerId WHERE workerId = '$pracownik' and taskDate <= '$czas[1]' and taskDate >= '$czas[0]' and status = '1' ORDER BY taskId ASC";
    Sql($sql);
}


function niezakończone_pracownik_czas(){
    $pracownik = employee();
    Sql_employe($pracownik);
    $czas = czas();
    
    $sql = "SELECT * FROM tasks LEFT JOIN taskCategory ON categoryId  = catId LEFT JOIN workers ON workersId  = workerId WHERE workerId = '$pracownik' and taskDate <= '$czas[1]' and taskDate >= '$czas[0]' and status = '0' ORDER BY taskId ASC";
    Sql($sql);
}

function niezakończone_czas(){
    $czas = czas();
    
    $sql = "SELECT * FROM tasks LEFT JOIN taskCategory ON categoryId  = catId LEFT JOIN workers ON workersId  = workerId WHERE taskDate <= '$czas[1]' and taskDate >= '$czas[0]' and status = '0' ORDER BY taskId ASC";
    Sql($sql);
}

function zakończone_czas(){
    $czas = czas();
    
    $sql = "SELECT * FROM tasks LEFT JOIN taskCategory ON categoryId  = catId LEFT JOIN workers ON workersId  = workerId WHERE taskDate <= '$czas[1]' and taskDate >= '$czas[0]' and status = '1' ORDER BY taskId ASC";
    Sql($sql);
}

function wszystkie_czas(){
    $czas = czas();

    
    $sql = "SELECT * FROM tasks LEFT JOIN taskCategory ON categoryId  = catId LEFT JOIN workers ON workersId  = workerId WHERE taskDate <= '$czas[1]' and taskDate >= '$czas[0]' ORDER BY taskId ASC";
    Sql($sql);
}


function niezakończone_pracownik_czas_kat(){
    $pracownik = employee();
    Sql_employe($pracownik[0], $pracownik[1]);
    $kategorie = category();
    $czas = czas();
    
    $sql = "SELECT * FROM tasks LEFT JOIN taskCategory ON categoryId  = catId LEFT JOIN workers ON workersId  = workerId WHERE workerId = '$pracownik' and catId = '$kategorie' and taskDate <= '$czas[1]' and taskDate >= '$czas[0]' and status = '0' ORDER BY taskId ASC";
    Sql($sql);
}

function zakończone_pracownik_czas_kat(){
    $pracownik = employee();
    Sql_employe($pracownik);
    $kategorie = category();
    $czas = czas();
    
    $sql = "SELECT * FROM tasks LEFT JOIN taskCategory ON categoryId  = catId LEFT JOIN workers ON workersId  = workerId WHERE workerId = '$pracownik' and catId = '$kategorie' and taskDate <= '$czas[1]' and taskDate >= '$czas[0]' and status = '1' ORDER BY taskId ASC";
    Sql($sql);
}

function wszystkie_pracownik_czas_kat(){
    $pracownik = Employee();
    Sql_employe($pracownik);
    $kategorie = category();
    $czas = czas();

    $sql = "SELECT * FROM tasks LEFT JOIN taskCategory ON categoryId  = catId LEFT JOIN workers ON workersId  = workerId WHERE workerId = '$pracownik' and catId = '$kategorie' and taskDate <= '$czas[1]' and taskDate >= '$czas[0]' ORDER BY taskId ASC";
    Sql($sql);
}


function wszystkie_pracownik_kat(){
    $pracownik = employee();
    Sql_employe($pracownik);
    $kategorie = category();
    
    $sql = "SELECT * FROM tasks LEFT JOIN taskCategory ON categoryId  = catId LEFT JOIN workers ON workersId  = workerId WHERE  workerId = '$pracownik' and catId = '$kategorie' ORDER BY taskId ASC";
    Sql($sql);
}

function zakończone_pracownik_kat(){
    $pracownik = employee();
    Sql_employe($pracownik);
    $kategorie = category();
    
    $sql = "SELECT * FROM tasks LEFT JOIN taskCategory ON categoryId  = catId LEFT JOIN workers ON workersId  = workerId WHERE workerId = '$pracownik' and catId = '$kategorie' and status = '1' ORDER BY taskId ASC";
    Sql($sql);
}

function niezakończone_pracownik_kat(){
    $pracownik = employee();
    Sql_employe($pracownik);
    $kategorie = category();

    $sql = "SELECT * FROM tasks LEFT JOIN taskCategory ON categoryId  = catId LEFT JOIN workers ON workersId  = workerId WHERE workerId = '$pracownik' and catId = '$kategorie' and status = '0' ORDER BY taskId ASC";
    Sql($sql);
}


function wszystkie_kat(){
    $kategorie = category();
    
    $sql = "SELECT * FROM tasks LEFT JOIN taskCategory ON categoryId  = catId LEFT JOIN workers ON workersId  = workerId WHERE catId = '$kategorie' ORDER BY taskId ASC";
    Sql($sql);
}

function zakończone_kat(){
    $kategorie = category();

    $sql = "SELECT * FROM tasks LEFT JOIN taskCategory ON categoryId  = catId LEFT JOIN workers ON workersId  = workerId WHERE catId = '$kategorie' and status = '1' ORDER BY taskId ASC";
    Sql($sql);
}


function niezakończone_kat(){
    $kategorie = category();
    
    $sql = "SELECT * FROM tasks LEFT JOIN taskCategory ON categoryId  = catId LEFT JOIN workers ON workersId  = workerId WHERE catId = '$kategorie' and status = '0' ORDER BY taskId ASC";
    Sql($sql);
}

function zakończone_czas_kat(){
    $kategorie = category();
    $czas = czas();

    $sql = "SELECT * FROM tasks LEFT JOIN taskCategory ON categoryId  = catId LEFT JOIN workers ON workersId  = workerId WHERE catId = '$kategorie' and taskDate <= '$czas[1]' and taskDate >= '$czas[0]' and status = '1' ORDER BY taskId ASC";
    Sql($sql);
}

function niezakończone_czas_kat(){
    $kategorie = category();
    $czas = czas();

    $sql = "SELECT * FROM tasks LEFT JOIN taskCategory ON categoryId  = catId LEFT JOIN workers ON workersId  = workerId WHERE catId = '$kategorie' and taskDate <= '$czas[1]' and taskDate >= '$czas[0]' and status = '0' ORDER BY taskId ASC";
    Sql($sql);
}

function wszystkie_czas_kat(){  
    $kategorie = category();
    $czas = czas();

    $sql = "SELECT * FROM tasks LEFT JOIN taskCategory ON categoryId  = catId LEFT JOIN workers ON workersId  = workerId WHERE catId = '$kategorie' and taskDate <= '$czas[1]' and taskDate >= '$czas[0]' ORDER BY taskId ASC";
    Sql($sql);
}

function czas(){
    $url_components = parse_url($_SERVER['REQUEST_URI']); 
    parse_str($url_components['query'], $params);

    $czas = $params['data'];

    if(strpos($czas, ':')){
    $index2 = strpos($czas, ':');
    $od = substr($czas, 0, $index2-1);
    $do = substr($czas, $index2+2, strlen($czas));
    $do=  date('Y-m-d', strtotime($do. ' + 1 days'));
    }
    else{
        $od = $czas;
        $do=  date('Y-m-d', strtotime($czas. ' + 1 days'));
    }
  

    $czas2 = [$od, $do];
  
    return $czas2;
}


function Sql($sql){
    include "connection.php";
    $polaczenie = new mysqli($db_servername, $db_username, $db_password, $db_name);

    if ($polaczenie->connect_errno!=0) {
        $status = "Błąd: ".$polaczenie->connect_errno;
    }
    else{
        if($wynik = $polaczenie->query($sql)){
            $status = $wynik->fetch_all();
        }
        else{
            $status = ['Błąd', 'błąd połączenia'];
        }

    }   
    $polaczenie->close();	
    $myJSON = json_encode($status);
    echo $myJSON;
}

function Sql_employe($id){ 
    include "connection.php";
    $polaczenie = new mysqli($db_servername, $db_username, $db_password, $db_name);
    
    if ($polaczenie->connect_errno!=0) {
       echo "Bład: ".$polaczenie->connect_errno;
    }
    else{ 
        if($wynik = $polaczenie->query("SELECT workersId FROM workers WHERE workersId = '$id' ")){
			$ilu = $wynik->num_rows;
			if($ilu == 0){
				echo json_encode(['Błąd', 'Podany pracownik nie istnieje.']); die();
			}
			
        }
    }
}


function Sql_emp_id($imie, $nazwisko){ 
    include "connection.php";
    $polaczenie = new mysqli($db_servername, $db_username, $db_password, $db_name);
    
    if ($polaczenie->connect_errno!=0) {
       echo "Bład: ".$polaczenie->connect_errno;
    }
    else{ 
        if($wynik = $polaczenie->query("SELECT workersId FROM workers WHERE name = '$imie' || surname = '$nazwisko' ")){
            $ilu = $wynik->num_rows;
			if($ilu == 0){
				echo json_encode(['Błąd', 'Podany pracownik nie istnieje.']); die();
            }
            else{
                $wynik = $wynik->fetch_row();
                return $wynik[0];
            }	
        }
    }
}

function employee(){
    $url_components = parse_url($_SERVER['REQUEST_URI']); 
    parse_str($url_components['query'], $params);

    $pracownik = $params['pracownik'];

    $index1 = strpos($pracownik, ' ');
    $imie = substr($pracownik, 0, $index1);
    $nazwisko = substr($pracownik, $index1+1);
    $id = Sql_emp_id($imie, $nazwisko);

    return $id;
}

function category(){
    $url_components = parse_url($_SERVER['REQUEST_URI']); 
    parse_str($url_components['query'], $params);
    $kategorie = $params['kategorie'];

    include "connection.php";
    $polaczenie = new mysqli($db_servername, $db_username, $db_password, $db_name);
    
    if ($polaczenie->connect_errno!=0) {
       echo "Bład: ".$polaczenie->connect_errno;
    }
    else{ 
        $sql = "SELECT categoryId FROM taskCategory WHERE category = '$kategorie' ";
     
        if($wynik = $polaczenie->query($sql)){
            $ilu = $wynik->num_rows;
            
			if($ilu > 0){
                $catId = $wynik->fetch_array();
                $kategorie = $catId[0];
                
			}
			else{
				$status = ['Błąd', 'błąd połączenia'];
			}	
		}
    }

    return $kategorie;
}
?>