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

	private function getImage($key, $albumEntry)
	{
		$gdataImage = $this->gDataImageFactory($albumEntry);

		$image = $gdataImage->getImage(
			$this->settings[$key]["type"], 
			$this->settings[$key]["value"]
			);

		return $image;
	}

	private function gDataImageFactory($albumEntry) {
		$media = $albumEntry->getMediaGroup();

		$thumbs = $media->getThumbnail();
		$thumb = $thumbs[0];

		return new GDataImage(
			$thumb->getUrl(), 
			$albumEntry->getGphotoWidth()->getText(), 
			$albumEntry->getGphotoHeight()->getText()
			);
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

			$content = $media->getContent();

			$image["small"] = $this->getImage("small", $albumEntry);
			$image["medium"] = $this->getImage("medium", $albumEntry);
			$image["large"] = $this->getImage("large", $albumEntry);
			$image["xlarge"] = $this->getImage("xlarge", $albumEntry);

			$gdataImage = $this->gDataImageFactory($albumEntry);
			$image["fullsize"] = $gdataImage->getFullsizeImage();

			$imagesList[] = $image;
		}

		//preprint($imagesList);
		return $imagesList;

	}
}


?>