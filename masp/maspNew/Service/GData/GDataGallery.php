<?php 

class GDataGallery {

	private $gp;


	function __construct($gdataPhotos) {
		$this->gp = $gdataPhotos;
		$settings["small"]["w"] = 48;
		$settings["medium"]["w"] = 48;
		$settings["large"]["w"] = 48;
		$settings["xlarge"]["w"] = 48;
	}

	private function getThumb($thumb) { 
		$x["url"] = $thumb->getUrl();
		$x["width"] = $thumb->getWidth();
		$x["height"] = $thumb->getHeight();
		return $x;
	}


	public function chuj($location)
	{
		$query = $this->gp->newAlbumQuery();

		$query->setUser("default");
		$query->setAlbumName($location);

		$albumFeed = $this->gp->getAlbumFeed($query);

		$image;
		$imagesList;

		$thumbs;

		foreach ($albumFeed as $albumEntry) {
			$image["id"] = $albumEntry->getGphotoId()->getText();
			$image["albumId"] = $albumEntry->getGphotoAlbumId()->getText();
			$image["version"] = $albumEntry->getGphotoVersion()->getText();
			$image["title"] = $albumEntry->getTitle()->getText();
			$image["keywords"] = $albumEntry->getMediaGroup()->getKeywords()->getText();
			$image["description"] = $albumEntry->getMediaGroup()->getDescription()->getText();

			$thumbs = $albumEntry->getMediaGroup()->getThumbnail();
			$content = $albumEntry->getMediaGroup()->getContent();

			$image["small"] = $this->getThumb($thumbs[0]);
			$image["medium"] = $this->getThumb($thumbs[1]);
			$image["large"] = $this->getThumb($thumbs[2]);
			$image["xlarge"] = $this->getThumb($content[0]);
			$image["fullsize"]["width"] = $albumEntry->getGphotoWidth()->getText();
			$image["fullsize"]["height"] = $albumEntry->getGphotoHeight()->getText();
    //udelat replacovani url
			$image["fullsize"]["url"] = $image["large"]["url"];

			$imagesList[] = $image;
    //echo $albumEntry->getGphotoId()->getText(); "<br />\n";
 //   echo json_encode($image);
//    preprint($albumEntry->getMediaGroup());
		}

		preprint($imagesList);
		return $imagesList;

	}
}


?>