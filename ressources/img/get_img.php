<?php
$imageName = $_GET["img"];
header('content-disposition: attachment');
header('Content-Type: image/jpeg');
readfile($imageName.'.jpg');