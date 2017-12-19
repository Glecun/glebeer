<?php

session_start();
include "../connexion/islogged.php"; 

if ( isset ($_POST["biere"]) ){
	require_once 'jsonwrapper/jsonwrapper.php';
	$file = 'listebiere.csv';
	$sep = ';';

	$biere = json_decode($_POST["biere"]);

	$current = file_get_contents($file);
	$current .= utf8_decode($biere->name.$sep.$biere->color.$sep.$biere->type.$sep.$biere->alcohol.$sep.$biere->date.$sep.$biere->rate.$sep.$biere->description.$sep.$biere->tags.$sep.$biere->photo.$sep.$biere->from.$sep)."\n";

	file_put_contents($file, $current);

	echo json_encode('file saved');
}



