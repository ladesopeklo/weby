<?php 
require_once  '../config.php';
require_once  'libs.php';
require_once  'GDataClientFactory.php';
//ini_set('display_errors', '0');
error_reporting(E_ALL^E_STRICT);

session_start();

//$data = json_decode(file_get_contents('php://input'));
//$location = $data->{"location"};

function getThumb($thumb) { 
  $x["url"] = $thumb->getUrl();
  $x["width"] = $thumb->getWidth();
  $x["height"] = $thumb->getHeight();
  return $x;
}

function getAlbums($category) {
  $gdata = new GDataClientFactory();
  $gp = $gdata->getClient();

  try {
    $userFeed = $gp->getUserFeed("default");

    $albums; 
    foreach ($userFeed as $item) {

      $itemCategory = strtolower($item->getGphotoLocation()->getText());
      if ($itemCategory == strtolower($category)) {
        $media = $item->getMediaGroup();
        $thumbs = $media->getThumbnail();

        $album["title"] = $item->getTitle()->getText();
        $album["description"] = json_decode($media->getDescription()->getText());
        $album["thumbnail"] = getThumb($thumbs[0]);
        $album["category"] = $itemCategory;

        $albums[] = $album;

        echo $item->title->text . "<br />\n";
      }
    }
   // $xx = $userFeed[0];
    //preprint($xx);
    return $albums;


  } catch (Zend_Gdata_App_HttpException $e) {
    echo "Error: " . $e->getMessage() . "<br />\n";
    if ($e->getResponse() != null) {
      echo "Body: <br />\n" . $e->getResponse()->getBody() . 
      "<br />\n"; 
    }
  } catch (Zend_Gdata_App_Exception $e) {
    echo "Error: " . $e->getMessage() . "<br />\n"; 
  }

}

$albums = getAlbums("masparti");
preprint($albums);
echo json_encode($albums);

?>