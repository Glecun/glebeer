<?php
ini_set('display_errors',1);
if (isset($_GET['name'])){
    $name=$_GET['name'];

    $url='https://data.opendatasoft.com/api/records/1.0/search/?dataset=open-beer-database%40public-us&facet=style_name&facet=cat_name&facet=name_breweries&facet=country&q='.$name;

    $response = json_decode(file_get_contents($url), true);
    $biereFromApi = $response["records"][0]["fields"];

    $biere = array();
    $biere['name'] = $biereFromApi['name'];
    $biere['color'] = "";
    $biere['type'] = $biereFromApi['style_name'];
    $biere['alcohol'] = substr(str_replace(",", ".",trim($biereFromApi['abv'])),0,3);
    $biere['rate'] = "";
    $biere['from'] = $biereFromApi['country'];
    $biere['brand'] = $biereFromApi['name_breweries'];
    $biere['content'] = $biereFromApi['descript'];
    $biere['ibu'] = $biereFromApi['ibu'];
    $biere['img'] = "";

    //Encodage Utf-8
    foreach ($biere as &$champ){
        $champ = utf8_decode($champ);
    }
    echo json_encode($biere);
}