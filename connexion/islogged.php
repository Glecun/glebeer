<?php
session_start();
if (!isset($_SESSION['connected'])){
	$_SESSION['previous']= 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF'];
	header('Location: /connexion/connexion.php');  
	exit;    
}
