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

	private function updateUrl($sizeDefinition) {
		$split = explode("/", $this->urlTemplate);
		$index = count($split) - 2;
		if ($index > 0) {
			$split[$index] = $sizeDefinition;
		} 
		return implode("/", $split);
	}

	public function getImage($type, $value) {
		$width = 0;
		$height = 0;

		if ($type == "s") {
			if ($this->origWidth > $this->origHeight) { 
				$width = $value;
				$height = ceil($value / $this->ratio);
			} else {
				$height = $value;
				$width = ceil($value * $this->ratio);
			}
		}

		if ($type == "h") {
			$width = ceil($value * $this->ratio);
			$height = $value;
		}

		if ($type == "w") {
			$width = $value;
			$height = ceil($value / $this->ratio);
		}


		$x["url"] = $this->updateUrl($type.$value);
		$x["width"] = $width;
		$x["height"] = $height;
		return $x;
	}

	public function getFullsizeImage() {
		$sizeDefinition = "w".$this->origWidth;

		$x["url"] = $this->updateUrl($sizeDefinition);
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
		$this->settings["small"]["value"] = 89;
		$this->settings["small"]["type"] = "s";

		$this->settings["thumb"]["value"] = 89;
		$this->settings["thumb"]["type"] = "s";

		$this->settings["medium"]["value"] = 288;
		$this->settings["medium"]["type"] = "h";

		$this->settings["large"]["value"] = 512;
		$this->settings["large"]["type"] = "w";

		$this->settings["xlarge"]["value"] = 1024;
		$this->settings["xlarge"]["type"] = "s";
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
			$media = $albumEntry->getMediaGroup();

			$image["id"] = $albumEntry->getGphotoId()->getText();
			$image["albumId"] = $albumEntry->getGphotoAlbumId()->getText();
			$image["version"] = $albumEntry->getGphotoVersion()->getText();
			$image["title"] = $albumEntry->getTitle()->getText();
			$image["keywords"] = $media->getKeywords()->getText();
			$image["description"] = json_decode($media->getDescription()->getText());

			$thumbs = $media->getThumbnail();
			$content = $media->getContent();

			$thumb = $thumbs[0];
			$gdataImage = new GDataImage($thumb->getUrl(), $albumEntry->getGphotoWidth()->getText(), $albumEntry->getGphotoHeight()->getText());

			$image["small"] = $gdataImage->getImage($this->settings["small"]["type"], $this->settings["small"]["value"]);
			$image["medium"] = $gdataImage->getImage($this->settings["medium"]["type"], $this->settings["medium"]["value"]);
			$image["large"] = $gdataImage->getImage($this->settings["large"]["type"], $this->settings["large"]["value"]);
			$image["xlarge"] = $gdataImage->getImage($this->settings["xlarge"]["type"], $this->settings["xlarge"]["value"]);
			$image["fullsize"] = $gdataImage->getFullsizeImage();

			$imagesList[] = $image;
		}

		//preprint($imagesList);
		return $imagesList;

	}
}


?>