<?php
require_once 'jsonwrapper/jsonwrapper.php';
$get = $_GET["q"];
$checkedfiltres = $_GET["checkedfiltres"]; 
$stringcheckedfiltres=explode(",", $checkedfiltres);
//Get Data Csv
$row=0;$row2=0;
$all=array();
if (($handle = fopen("listebiere.csv", "r")) !== FALSE) {
	while (($ligne = fgetcsv($handle, 280, ";")) !== FALSE) {
		//Encodage Utf-8
		foreach ($ligne as &$champ){
			$champ = utf8_encode($champ);
		}
		
		if($row!=0 && $ligne[0]!=""){
			if($get=="" || strpos(strtolower($ligne[0]), strtolower($get)) !== false ) {
				//pour les filtres
				$testsfiltre=true;
				if ( !count($stringcheckedfiltres)==0){
					foreach ($stringcheckedfiltres as $filtre){
						if ($filtre !="" && ($ligne[1]!=$filtre && $ligne[2]!=$filtre && $ligne[3]!=$filtre && $ligne[4]!=$filtre && $ligne[9]!=$filtre)){
								$testsfiltre=false;
						}
					}
				} else {
					$testsfiltre=true;
				}
				
				if ($testsfiltre){
					$all[$row2]["nom"] = $ligne[0];
					$all[$row2]["couleur"] = $ligne[1];
					$all[$row2]["variete"] = $ligne[2];
					$all[$row2]["degre"] = $ligne[3];
					$all[$row2]["date"] = $ligne[4];
					$all[$row2]["note"] = $ligne[5];
					$all[$row2]["description"] = $ligne[6];
					$all[$row2]["tags"] = $ligne[7];
					$all[$row2]["photo"] = $ligne[8];
					$all[$row2]["pays"] = $ligne[9];
					$row2++;
				}
			}
		}
		$row++;
	}
	fclose($handle);
}

function compareByName($a, $b) {
  return strcmp($a["nom"], $b["nom"]);
}
usort($all, 'compareByName');


echo json_encode($all);
?>