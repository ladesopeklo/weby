<?php 

class GDataImage {

	private $origWidth;
	private $origHeight;
	private $urlTemplate;
	private $ratio;

	function __construct($urlTemplate, $origWidth, $origHeight) {
		$this->origHeight = $origHeight;
		$this->origWidth = $origWidth;
		$this->urlTemplate = $urlTemplate;
		$this->ratio = $origWidth / $origHeight;
	}

	private function getSizeNotation($width, $height) {
		if ($width == $height) {
			return "s".$width;
		}
		if ($height == 0) {
			return "w".$height;
		}
		if ($width == 0) {
			return "h".$width;
		}
		return "s".$width;
	}
	
	private function updateUrl($width, $height) {

		$split = explode("/", $this->urlTemplate);
		$index = count($split) - 2;
		if ($index > 0) {
			$split[$index] = $this->getSizeNotation($width, $height);
		} 
		return implode("/", $split);
	}

	public function getImage($dimensions) {
		$x["url"] = $this->updateUrl($dimensions["w"], $dimensions["h"]);
		$x["width"] = $dimensions["w"];
		$x["height"] = ceil( $dimensions["w"] / $this->ratio);
		return $x;
	}

	public function getFullsizeImage() {
		$x["url"] = $this->updateUrl($this->origWidth, $this->origHeight);
		$x["width"] = $this->origWidth;
		$x["height"] = $this->origHeight;
		return $x;
	}
}


class GDataGallery {

	private $gp;
	private $settings;

	function __construct($gdataPhotos) {
		$this->gp = $gdataPhotos;
		$this->settings["small"]["w"] = 144;
		$this->settings["small"]["h"] = 48;
		
		$this->settings["medium"]["w"] = 48;
		$this->settings["medium"]["h"] = 48;
		
		$this->settings["large"]["w"] = 48;
		$this->settings["large"]["h"] = 48;
		
		$this->settings["xlarge"]["w"] = 48;
		$this->settings["xlarge"]["h"] = 48;
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

			$thumb = $thumbs[0];
			$gdataImage = new GDataImage($thumb->getUrl(), $albumEntry->getGphotoWidth()->getText(), $albumEntry->getGphotoHeight()->getText());


			$image["small"] = $gdataImage->getImage($this->settings["small"]);
			$image["medium"] = $this->getThumb($thumbs[1]);
			$image["large"] = $this->getThumb($thumbs[2]);
			$image["xlarge"] = $this->getThumb($content[0]);
			$image["fullsize"] = $gdataImage->getFullsizeImage();


			$imagesList[] = $image;
    //echo $albumEntry->getGphotoId()->getText(); "<br />\n";
 //   echo json_encode($image);
//    preprint($albumEntry->getMediaGroup());
		}

		//preprint($imagesList);
		return $imagesList;

	}
}


?>