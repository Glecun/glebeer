<?php
ini_set('display_errors',1);
if (isset($_GET['name'])){
    $name=$_GET['name'];

    $url='https://data.opendatasoft.com/api/records/1.0/search/?dataset=open-beer-database%40public&facet=style_name&facet=cat_name&facet=name_breweries&facet=country&q='.$name;

    $response = json_decode(file_get_contents($url), true);
    $biereFromApi = $response["records"][0]["fields"];

    $biere = array();
    $biere['name'] = $biereFromApi['name'] != null ? $biereFromApi['name'] : "";
    $biere['color'] = "";
    $biere['type'] = $biereFromApi['style_name'] != null ? $biereFromApi['style_name'] : "";
    $biere['alcohol'] = $biereFromApi['abv'] != null ? substr(str_replace(",", ".",trim($biereFromApi['abv'])),0,3) : "";
    $biere['rate'] = "";
    $biere['from'] = $biereFromApi['country'] != null ? $biereFromApi['country'] : "";
    $biere['brand'] = $biereFromApi['name_breweries'] != null ? $biereFromApi['name_breweries'] : "";
    $biere['content'] = $biereFromApi['descript'] != null ? $biereFromApi['descript'] : "";
    $biere['ibu'] = $biereFromApi['ibu'] != null ? $biereFromApi['ibu'] : "";
    $biere['img'] = "";

    echo json_encode($biere);
}