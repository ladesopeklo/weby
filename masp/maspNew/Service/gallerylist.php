<?php 
require  '../config.php';
require  'gallery.lib.php';

$x = new ClassName($baseurl);

$location = isset($_POST["location"]) ? $_POST["location"] : "exalt" ;
$culture = isset($_POST["culture"]) ? $_POST["culture"] : "cz" ;

$data = json_decode(file_get_contents('php://input'));

$location = $data->{"location"};

$xxx; 
foreach ($location as $key => $value) {
	$xxx[$value] = $x->getGallery($value, $culture);
}

echo json_encode($xxx);

?>