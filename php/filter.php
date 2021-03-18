<?php
require_once 'functions_filters.php';

$url_components = parse_url($_SERVER['REQUEST_URI']); 
parse_str($url_components['query'], $params); 
        
$filtr = $params['filtr'];

if(isset($params['data'])){
    if(isset($params['pracownik'])){
        if(isset($params['kategorie']) ){

            if($filtr == "wszystkie"){
                wszystkie_pracownik_czas_kat();
            }
            else if($filtr == "zakończone"){
                zakończone_pracownik_czas_kat();
            }
            else if($filtr == "niezakończone"){
                niezakończone_pracownik_czas_kat();
            }
        }
        else{
            if($filtr == "wszystkie"){
                wszystkie_pracownik_czas();
            }
            else if($filtr == "zakończone"){
                zakończone_pracownik_czas();
            }
            else if($filtr == "niezakończone"){
                niezakończone_pracownik_czas();
            }
        }
    }
    else if(isset($params['kategorie']) ){
        if($filtr == "wszystkie"){
            wszystkie_czas_kat();
        }
        else if($filtr == "zakończone"){
            zakończone_czas_kat();
        }
        else if($filtr == "niezakończone"){
            niezakończone_czas_kat();
        }
    }
    else{
        if($filtr == "wszystkie"){
            wszystkie_czas();
        }
        else if($filtr == "zakończone"){
            zakończone_czas();
        }
        else if($filtr == "niezakończone"){
         niezakończone_czas();
        }
    }
}
else if(isset($params['pracownik'])){
    if(isset($params['kategorie']) ){
        if($filtr == "wszystkie"){
            wszystkie_pracownik_kat();
        }
        else if($filtr == "zakończone"){
            zakończone_pracownik_kat();
        }
        else if($filtr == "niezakończone"){
            niezakończone_pracownik_kat();
        }
    }
    else{
        if($filtr == "wszystkie"){
            wszystkie_pracownik();
        }
        else if($filtr == "zakończone"){
            zakończone_pracownik();
        }
        else if($filtr == "niezakończone"){
            niezakończone_pracownik();
        }
    }
}
else if(isset($params['kategorie']) ){
    if($filtr == "wszystkie"){
        wszystkie_kat();
    }
    else if($filtr == "zakończone"){
        zakończone_kat();
    }
    else if($filtr == "niezakończone"){
        niezakończone_kat();
    }
}
else{
    if($filtr == "wszystkie"){
        wszystkie();
    }
    else if($filtr == "zakończone"){
        zakończone();
    }
    else if($filtr == "niezakończone"){
        niezakończone();
    }
}


?>