<?php
ini_set('display_errors',1);
if (isset($_GET['name'])){
	$name=$_GET['name'];
	$url='https://www.saveur-biere.com/fr/search-result/';

	libxml_use_internal_errors(true);
	$dom = new DomDocument;
	$dom->loadHTMLFile($url.$name);
	$xpath = new DomXPath($dom);

	$biere = array();

	$infosPrincipal = $xpath->query("//div[@class='gtm-product-list']/ul/li[1]/div/div[1]/div[2]/div/*");
	foreach ($infosPrincipal as $i => $node) {
	   if ($i==0) $biere['rate']=substr(preg_replace("/[^0-9]/","",$node->nodeValue), 0, -3);; 
	   if ($i==1) $biere['name']=trim($node->nodeValue);
	   if ($i==2) $biere['brand']=trim($node->nodeValue);
	}

	$infosSecondaire = $xpath->query("//div[@class='gtm-product-list']/ul/li[1]/div/div[1]/div[3]/*");
	foreach ($infosSecondaire as $i => $node) {
	   if ($i==0) $biere['from']=trim($node->nodeValue);
	   if ($i==1) $biere['type']=trim($node->nodeValue);
	   if ($i==2) $biere['color']=trim($node->nodeValue);
	   if ($i==3) $biere['alcohol']=str_replace(",", ".", trim(trim($node->nodeValue),'°'));
	   if ($i==4) $biere['content']=trim($node->nodeValue);
	}

	//Encodage Utf-8
	foreach ($biere as &$champ){
		$champ = utf8_decode($champ);
	}
	echo json_encode($biere);
}

