<?php 

class GDataImage {

	private $origWidth;
	private $origHeight;
	private $urlTemplate;
	private $ratio;
	private $keywordsMap;
	private $settings;

	function __construct($albumEntry, $settings) {
		$this->settings = $settings;
		$this->loadData($albumEntry);
	}

	private function loadData($albumEntry) {
		$media = $albumEntry->getMediaGroup();

		$thumbs = $media->getThumbnail();
		$thumb = $thumbs[0];

		$this->origHeight = $albumEntry->getGphotoHeight()->getText();
		$this->origWidth = $albumEntry->getGphotoWidth()->getText();
		
		$this->urlTemplate = $thumb->getUrl();
		$this->ratio = $this->origWidth / $this->origHeight;
		
		$keywordsArray = explode(",", $media->getKeywords()->getText());
		$this->keywordsMap = $this->keywordsToMap($keywordsArray);
	}
	
	private function keywordsToMap($keywordsArray) {
		$xxx = array();
		foreach ($keywordsArray as $value) {
			$ok = preg_match('/^(small|medium|large|xlarge):([s|w|h])(\d+)([-c]*)$/i', $value, $matches);
			if ($ok) {
				$key = strtolower($matches[1]); 
				$xxx[$key]["type"] = strtolower($matches[2]);				
				$xxx[$key]["value"] = strtolower($matches[3]);				
				$xxx[$key]["suffix"] = strtolower($matches[4]);				
			}
		}
		return $xxx;
	}

	private function updateUrl($sizeDefinition) {
		$split = explode("/", $this->urlTemplate);
		$index = count($split) - 2;
		if ($index > 0) {
			$split[$index] = $sizeDefinition;
		} 
		return implode("/", $split);
	}

	public function getImage($key) {
		
		if (isset($this->keywordsMap[$key])) {
			$k = $this->keywordsMap[$key];
			$type = $k["type"];
			$value = $k["value"];
		} else {
			$type = $this->settings[$key]["type"];
			$value = $this->settings[$key]["value"];
		}

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


	private function getImage($key, $gdataImage)
	{
		$image = $gdataImage->getImage(
			$this->settings[$key]["type"], 
			$this->settings[$key]["value"]
			);

		return $image;
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
			$gdataImage = new GDataImage($albumEntry, $this->settings);

			$image["small"] = $gdataImage->getImage("small");
			$image["medium"] = $gdataImage->getImage("medium");
			$image["large"] = $gdataImage->getImage("large");
			$image["xlarge"] = $gdataImage->getImage("xlarge");

			//$image["fullsize"] = $gdataImage->getFullsizeImage($gdataImage);

			$imagesList[] = $image;
		}

		//preprint($imagesList);
		return $imagesList;

	}
}


?>