<?php
try{
	require_once "connection.php";

	$polaczenie = new mysqli($db_servername, $db_username, $db_password, $db_name);

	if ($polaczenie->connect_errno!=0) 
	{
		$status = "Błąd: ".$polaczenie->connect_errno;
	}
	else
	{
		$url_components = parse_url($_SERVER['REQUEST_URI']); 
		parse_str($url_components['query'], $params);
			
		$login = $params['login'];

		if(preg_match('/^[a-zA-Ząćęłńóśóżź0-9]+$/', $login) == false ){
			echo json_encode("Proszę wpisać poprawny logim"); die();
		}

		$haslo = $params['password'];

		if(preg_match('/^[a-zA-Ząćęłńóśóżź0-9:@!$%#^&*()]+$/', $haslo) == false ){
			echo json_encode("Proszę wpisać poprawne hasło"); die();
		}


		$sql = "SELECT login FROM administrators WHERE login =  '$login' AND password = '$haslo'";
		$sql1 = "SELECT name, surname, workersId FROM workers WHERE login =  '$login' AND password = '$haslo'";
		
		if($wyniki = $polaczenie->query($sql))
		{
			$ilu_userow = $wyniki->num_rows;
			if($ilu_userow>0)
			{ 			
				$status = "main.html";
			
			}
			else if($wyniki2 = $polaczenie->query($sql1))	
			{
				
			
				$ilu_userow2 = $wyniki2->num_rows;

			
				if($ilu_userow2>0)
				{ 		
					$wynik = $wyniki2->fetch_array();
					$status = ["usser.html", $wynik[0], $wynik[1], $wynik[2]];
				}
				else{
					$status = "Niepoprawne dane logowania";
				}
				
			}
		}
		
	}
	$polaczenie->close();	
	echo json_encode($status);
}
catch(Exception $e){
	echo json_encode($e->getMessage()); die();
}
?> 