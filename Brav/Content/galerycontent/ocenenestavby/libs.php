<?php
if (!function_exists("preprint")) { 
    function preprint($s, $return=false) { 
        $x = "<pre>"; 
        $x .= print_r($s, 1); 
        $x .= "</pre>"; 
        if ($return) return $x; 
        else print $x; 
    } 
} 
function fatal($message){
	$list['error'] = $message; 
	echo json_encode($list);
	exit;

}

function isimage($file){
	$p = pathinfo($file);
	if (isset($p['extension']))
	{
		$e = strtolower($p['extension']);
		return 	($e == 'jpg'||$e == 'jpeg' || $e== 'gif' ||	$e == 'png');
	}
	return false;
}
?>