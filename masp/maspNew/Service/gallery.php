<?php 


require  '../config.php';
require  'gallery.lib.php';

$x = new ClassName($baseurl);

$location = isset($_POST["location"]) ? $_POST["location"] : "exalt" ;
$culture = isset($_POST["culture"]) ? $_POST["culture"] : "cz" ;

$data = json_decode(file_get_contents('php://input'));

$location = $data->{"location"};


echo json_encode($x->getGallery($location, $culture));

?>