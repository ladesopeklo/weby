<?php 
require_once 'OAuth2/src/Google_Client.php';

if (!function_exists("preprint")) { 
	function preprint($s, $return=false) { 
		$x = "<pre>"; 
		$x .= print_r($s, 1); 
		$x .= "</pre>"; 
		if ($return) return $x; 
		else print $x; 
	} 
} 


class GoogleClientWrapper extends Google_Client
{

	function __construct()
	{
		parent::__construct(); 
		$this->setApplicationName("AAAAAAAAAAAAAa");
		$this->setClientId("568637062174-4s9b1pohf5p0hkk8o4frvesnhj8na7ug.apps.googleusercontent.com");
		$this->setDeveloperKey('568637062174-4s9b1pohf5p0hkk8o4frvesnhj8na7ug@developer.gserviceaccount.com');
		$this->setClientSecret('YxM0MTKCTSBV5vGlU05Yj63h');
		$this->setRedirectUri('http://127.0.0.1:85/masp/maspNew/service/validate.php');
		
		$this->setScopes('https://picasaweb.google.com/data');
	}

	public function isAuthorized() {
		return $this->getAccessTokenJson() != null;
	}

	public function authenticateAndSave($code = null) {
		$this->authenticate($code);
		$this->setAccessTokenJson();
	}

	public function getRefreshTokenId() {
		return self::$auth->token["refresh_token"];
	}

	public function getAccessTokenId()
	{
		$json = $this->getAccessTokenJson();
		
		if ($json == null) {
			throw new Exception("Account is not registered", 1);
		}

		$this->setAccessToken($json);
		$refreshToken = $this->getRefreshTokenId();

		if ($this->isAccessTokenExpired()) {
			$this->refreshToken($refreshToken);
			$this->setAccessTokenJson();
		}

		return self::$auth->token["access_token"];
	}

	private function getAccessTokenJson()
	{
		$json = $this->load("access_token.json");
		return $json;
	}

	private function setAccessTokenJson()
	{
		$this->save("access_token.json", $this->getAccessToken());
	}

	private function save($key, $content)
	{
		file_put_contents($key, $content);
	}

	private function load($key)
	{
		if (file_exists($key)) {
			return file_get_contents($key);
		}
		return null;
	}
}

?>