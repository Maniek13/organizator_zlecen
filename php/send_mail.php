<?php
try{
  require_once 'vendor/autoload.php';
  require_once 'emailconfig.php';
  require_once "connection.php";
  $polaczenie = new mysqli($db_servername, $db_username, $db_password, $db_name);


  $url_components = parse_url($_SERVER['REQUEST_URI']); 
  parse_str($url_components['query'], $params); 

  $from = $params['from'];
  $usser  = $params['usser'];
  $temat  = $params['temat'];
  $msg  = $params['msg'];
  $to  = $params['to'];
  $timeout  = $params['timeout'];


  if(preg_match('/^[a-zA-ZąćęłńóśóżźĄĆĘŁŃÓŚŹŻ0-9 ]+$/', $temat) == false ){
    echo json_encode("Prosze wpisać temat wiadomości."); die();
  }


  if(preg_match('/^[\na-zA-ZąćęłńóśóżźĄĆĘŁŃÓŚŹŻ0-9 :@!#$%^&*(),.-]+$/', $msg) == false ){
    echo json_encode("Tekst wiadomości nie może być pusty."); die();
  }


  $transport = (new Swift_SmtpTransport(SMTP, PORT, 'tls'))
    ->setUsername(EMAIL)
    ->setPassword(PASS)
    ->setTimeout($timeout)
  ;

  $mailer = new Swift_Mailer($transport);

  $message = (new Swift_Message())
    ->setSubject($temat)
    ->setFrom([$from => $usser])
    ->setTo($to)
    ->setBody($msg)
    ->setReplyTo($from)
    ;

    if(isset($_FILES['file'])){
      if($size = $_FILES["file"]["size"]/1024 >  5120){
        unlink($path_of_uploaded_file);
        echo json_encode("Maksymalna wielkość pliku to 5MB"); 
        die();
      }

    $name = basename($_FILES['file']['name']);
    $type = substr($name, strrpos($name, '.') + 1);
    
    $upload_folder = 'files/';
      
    $path_of_uploaded_file = $upload_folder . $name;
    $tmp_path = $_FILES["file"]["tmp_name"];

    if(is_uploaded_file($tmp_path)){
        if(!copy($tmp_path,$path_of_uploaded_file)){
          $errors .= '\n error while copying the uploaded file';
          echo json_encode($errors); die();
        }
      }

    $message->attach(Swift_Attachment::fromPath($path_of_uploaded_file));
    }
  

  if($mailer->send($message) == "1"){
    $status = "1";
  }
  else{
    $status = "Błąd wysyłania";
  }

  if(isset($_FILES['file'])){
  unlink($path_of_uploaded_file);
  }

  echo json_encode($status);
}
catch(Exception $e){
	echo json_encode($e->getMessage()); die();
}
?>