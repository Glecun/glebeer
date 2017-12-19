<?php
require_once 'jsonwrapper/jsonwrapper.php';
//Get Data Csv
$row=0;
$all=array();
$all[0]=array();
$all[1]=array();
$all[2]=array();
$all[3]=array();
$all[4]=array();
if (($handle = fopen("listebiere.csv", "r")) !== FALSE) {
	while (($ligne = fgetcsv($handle, 280, ";")) !== FALSE) {
		//Encodage Utf-8
		foreach ($ligne as &$champ){
			$champ = utf8_encode($champ);
		}

		if($row!=0 && $ligne[0]!=""){
			if(!in_array($ligne[1], $all[0]) && $ligne[1]!=""){
				array_push($all[0],$ligne[1]);
			}
			if(!in_array($ligne[2], $all[1]) && $ligne[2]!=""){
				array_push($all[1],$ligne[2]);
			}
			if(!in_array($ligne[3], $all[2]) && $ligne[3]!=""){
				array_push($all[2],$ligne[3]);
			}
			if(!in_array($ligne[4], $all[3]) && $ligne[4]!=""){
				array_push($all[3],$ligne[4]);
			}
			if(!in_array($ligne[9], $all[4]) && $ligne[9]!=""){
				array_push($all[4],$ligne[9]);
			}
		}
		$row++;
	}
	fclose($handle);
}

rsort($all[2]);

echo json_encode($all);
?>