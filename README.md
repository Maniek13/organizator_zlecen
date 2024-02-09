# Organizator zleceń

1.	Skopiować zawartość repozytorium na serwer np używając XAMPP lub IIS (folder instalacja mozna usunąć po skonfigurowaniu bazy danych, badz skopiowac w inne miejsce w razie potrzeby utworzenia kolejnego administratora)
2.  Utworzyć plik connection.php w następujących lokacjach:
        - instalacja/bazadanych
        - instalacja/admin_account_create
        - php

    Zawartość pliku connection.php:

    <?php
        $db_servername="localhost";
        $db_username = "root";
        $db_password = "PhpMy@dmin127";
        $db_name = "my_job";
    ?>

4.	Uruchomić skrypt o nazwie “make_database.Php”, tworzący bazę danych. Plik znajkduje się w folderze instalacja/bazadanych
5.	Utworzyć konto administratora, poprzez uruchomienie pliku “create_admin_acount.Html”. Plik znajduje się w folderze instalacja/admin_account_create
6.	Założyć konto w serwisie Google: “http://gmail.com”, będzie ono służyło, jako serwer
7.	Zezwolić na dostęp mniej bezpiecznym aplikacją. Można to zrobić korzystając z tego linku: “https://myaccount.google.com/lesssecureapps”
8.	 Zmienić w pliku “emailconfig.php” odpowiednie wartości, według instrukcji i wkleić go do głównego katalogu z aplikacją


Administracja

<img width="414" alt="image" src="https://user-images.githubusercontent.com/47826375/155571125-b1a15e2f-f2d9-41e1-834c-664db861a0f3.png">
<img width="420" alt="image" src="https://user-images.githubusercontent.com/47826375/155571194-e2267741-9e61-414d-bb91-3833ef7038f4.png">
<img width="414" alt="image" src="https://user-images.githubusercontent.com/47826375/155571235-5266e030-c178-4acd-aaca-0a3fdcf34c1a.png">
<img width="418" alt="image" src="https://user-images.githubusercontent.com/47826375/155571258-8a055e00-a9ad-407a-964c-6f8d91f0482a.png">
<img width="410" alt="image" src="https://user-images.githubusercontent.com/47826375/155571309-86dccd50-cdcc-4d83-b2e6-d55b9bda1450.png">


Użytkownik

<img width="408" alt="image" src="https://user-images.githubusercontent.com/47826375/155571432-4fd82d9c-71c2-44fa-8264-ba6469974d49.png">
<img width="238" alt="image" src="https://user-images.githubusercontent.com/47826375/155571484-2215d5ea-17a3-4065-ada5-33881b68ed4d.png">
<img width="411" alt="image" src="https://user-images.githubusercontent.com/47826375/155571556-8d20f2bb-f5a1-4f79-aba6-b3df236253e2.png">
