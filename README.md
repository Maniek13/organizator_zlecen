# Organizator zleceń

1.	Install XAMPP (https://www.apachefriends.org/pl/index.html)
2.	Create folder in htdocs, in xampp instalk location. Default “C:\xampp\htdocs”. And copy content to it.
3.	Start XAMPP and after start Apache and MySQL in XAMPP.
4.	Run script “make_database.php” to create database, by entering the address: “http://localhost/<nazwa folderu>/instalacja/baza_danych/make_database.php”.
5.	Create administration account. Run script “create_admin_acount.Html”, by entering the address: “http://localhost/praca/<nazwa folderu>/instalacja/admin_acconut_create/create_admin_acount.html”. Complete the fields and click “Załóż konto”.
6.	Create Google account: “http://gmail.com”, to email provider.
7.	Allow access to less secure applications. You can do this using this link: “https://myaccount.google.com/lesssecureapps”.
8.	Complete “emailconfig.php” located in "instalacja\email_config" and copy it to (“C:\xampp\htdocs\<nazwa folderu>\php).
9.	The website will operate at: “http://localhost/<nazwa folderu>”.
10.	If necessary, you can enter the following line in the Windows CMD command line:
“netsh interface portproxy add v4tov4 listenport=4422 listenaddress=0.0.0.0 connectport=80 connectaddress=127.0.0.1”, 
changing “listenaddress=0.0.0.0” to the external IP, if we have one. This allows access to the website from an external computer after entering the IP address of the website instead of localhost. If the website is still unavailable, you need to add an exception to the firewall or disable it. You also can crete your domain or host it on web server.

Preview page:
http://178.235.60.107:4422/TaskOrganization/main.html


Administration

<img width="414" alt="image" src="https://user-images.githubusercontent.com/47826375/155571125-b1a15e2f-f2d9-41e1-834c-664db861a0f3.png">
<img width="420" alt="image" src="https://user-images.githubusercontent.com/47826375/155571194-e2267741-9e61-414d-bb91-3833ef7038f4.png">
<img width="414" alt="image" src="https://user-images.githubusercontent.com/47826375/155571235-5266e030-c178-4acd-aaca-0a3fdcf34c1a.png">
<img width="418" alt="image" src="https://user-images.githubusercontent.com/47826375/155571258-8a055e00-a9ad-407a-964c-6f8d91f0482a.png">
<img width="410" alt="image" src="https://user-images.githubusercontent.com/47826375/155571309-86dccd50-cdcc-4d83-b2e6-d55b9bda1450.png">


User

<img width="408" alt="image" src="https://user-images.githubusercontent.com/47826375/155571432-4fd82d9c-71c2-44fa-8264-ba6469974d49.png">
<img width="238" alt="image" src="https://user-images.githubusercontent.com/47826375/155571484-2215d5ea-17a3-4065-ada5-33881b68ed4d.png">
<img width="411" alt="image" src="https://user-images.githubusercontent.com/47826375/155571556-8d20f2bb-f5a1-4f79-aba6-b3df236253e2.png">
