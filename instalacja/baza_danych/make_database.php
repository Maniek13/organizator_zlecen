<?php

$db_servername="localhost";
$db_username = "root";
$db_password = "";
$status = "";
$db = "my_job";

$polaczenie = new mysqli($db_servername, $db_username, $db_password);

if ($polaczenie->connect_errno!=0) 
{
   echo "Error: ".$polaczenie->connect_errno;
}
else
{
    $sql = "CREATE DATABASE IF NOT EXISTS $db CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci ";

	if($wynik = $polaczenie->query($sql)){
        $polaczenie = new mysqli($db_servername, $db_username, $db_password, $db);

        if($polaczenie->connect_errno==0)
        {
            $sql = "CREATE TABLE IF NOT EXISTS administrators (
                password TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci NOT NULL,
                login TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci NOT NULL,
                email TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci NOT NULL,
                name TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci NOT NULL,
                surname TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci NOT NULL
                )";

            $sql2 = "CREATE TABLE IF NOT EXISTS workers (
                workersId INT(11) NOT NULL,
                name TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci NOT NULL,
                surname TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci NOT NULL,
                phoneNr TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci NOT NULL,
                street TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci NOT NULL,
                buldingNr TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci NOT NULL,
                localNr TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci NOT NULL,
                city TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci NOT NULL,
                password TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci NOT NULL,
                changed tinyint(1) NOT NULL,
                login TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci NOT NULL
            )";

            $sql3 = "CREATE TABLE IF NOT EXISTS tasks (
                taskId INT(11) NOT NULL,
                title TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci NOT NULL,
                catId INT(11) NOT NULL,
                street TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci NOT NULL,
                buldingNr TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci NOT NULL,
                localNr TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci NOT NULL,
                city TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci NOT NULL,
                telephonNr TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci NOT NULL,
                description TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci NOT NULL,
                status TINYINT(1) NOT NULL,
                taskDate DATETIME NOT NULL,
                taskEndDate DATETIME NOT NULL,
                workerId INT(11) NOT NULL
            )";

            $sql4 = "CREATE TABLE IF NOT EXISTS taskCategory (
                categoryId INT(11) NOT NULL,
                category TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci NOT NULL
            )";

            $sql5 = "CREATE TABLE IF NOT EXISTS ussersEmails (
                workersId_email INT(11) NOT NULL,
                email TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci NOT NULL
            )";
                        
            if($wynik = $polaczenie->query($sql)){
                if($wynik = $polaczenie->query($sql2)){
                    if($wynik = $polaczenie->query($sql3)){
                        if($wynik = $polaczenie->query($sql4)){
                            if($wynik = $polaczenie->query($sql5)){
                                $status = "ok";
                            }
                            else{
                                $status = "blad przy tworzeniu tabeli ussers emails";
                            }
                        }
                        else{
                            $status = "blad przy tworzeniu tabeli kategori";
                        } 
                    }
                    else{
                        $status = "blad przy tworzeniu tabeli zlecenia";
                    }
                }
                else{
                    $status = "blad przy tworzeniu tabeli pracownicy";
                }
            }
            else{
                $status = "blad przy tworzeniu tabeli administratorzy";
            }
        }
        else{
            $status =  "Error: ".$polaczenie->connect_errno;
        }
    }
    else{
        $status = "blad przy tworzeniu bazy danych";
    }
}

$polaczenie->close();
echo $status;
?>