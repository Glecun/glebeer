<?php
	require_once '../donnees/jsonwrapper/jsonwrapper.php';
	if(htmlspecialchars($_GET["mdp"]=="foo")){ 
		session_start();
		$_SESSION['connected']=1;
		echo json_encode($_SESSION['previous']);
	} else {
		sleep(1);
		echo json_encode('0');
	}
?>