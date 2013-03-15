<?php
/*
 * Copyright 2011 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 https://accounts.google.com/ServiceLogin?service=lso&passive=1209600&
 continue=https://accounts.google.com/o/oauth2/auth?
 scope%3Dhttps://www.googleapis.com/auth/plus.login%26
 response_type%3Dcode%26access_type%3Doffline%26redirect_uri%3Dhttp://localhost:85/weby/masp/maspnew/service/plus%26approval_prompt%3Dforce%26client_id%3D19888929621-9fhsprfeeaiclt42k8oomadlv7en6874.apps.googleusercontent.com%26hl%3Dcs%26from_login%3D1%26as%3D-215b727a0fb24026&ltmpl=popup&shdf=Cm4LEhF0aGlyZFBhcnR5TG9nb1VybBoADAsSFXRoaXJkUGFydHlEaXNwbGF5TmFtZRoHeHh4dGVzdAwLEgZkb21haW4aB3h4eHRlc3QMCxIVdGhpcmRQYXJ0eURpc3BsYXlUeXBlGgdERUZBVUxUDBIDbHNvIhSAgDessqOftvBKowE0iMrkynqq0CgBMhTY-fW2u-3bbPX9RveUkmqi6JaKxg&sarp=1&scc=1* 
 See the License for the specific language governing permissions and
 * limitations under the License.
 */
if (!function_exists("preprint")) { 
  function preprint($s, $return=false) { 
    $x = "<pre>"; 
    $x .= print_r($s, 1); 
    $x .= "</pre>"; 
    if ($return) return $x; 
    else print $x; 
  } 
} 

require_once '../OAuth2/src/Google_Client.php';
require_once '../OAuth2/src/contrib/Google_PlusService.php';

session_start();


$client = new Google_Client();
$client->setApplicationName("Google+ PHP Starter Application");
// Visit https://code.google.com/apis/console to generate your
// oauth2_client_id, oauth2_client_secret, and to register your oauth2_redirect_uri.
$client->setClientId("1015812464150.apps.googleusercontent.com");
$client->setClientSecret('cdA5DZrJhMXGpv6MkNP_kHmv');
$client->setRedirectUri('http://localhost:85/weby/masp/maspnew/service/plus');
$client->setDeveloperKey('1015812464150@developer.gserviceaccount.com');

$client->setScopes('https://picasaweb.google.com/data');

echo   $client->createAuthUrl();

preprint($client->createAuthUrl());

echo "sdd";
//$client->setAccessToken("ya29.AHES6ZQWbCycGSXo1TRB6hgVc1DQDyAWg_bHrJouzWWhXWF1U_AGogs");

preprint($client->isAccessTokenExpired());
preprint($client->getAccessToken());


/*
$plus = new Google_PlusService($client);

if (isset($_REQUEST['logout'])) {
  unset($_SESSION['access_token']);
}
*/
echo " asasd";
echo $client->getAccessToken();


if (isset($_GET['code'])) {
  echo "code token";
  preprint($_GET['code']);

  $client->authenticate($_GET['code']);
  $_SESSION['access_token'] = $client->getAccessToken();
 
  header('Location: http://' . $_SERVER['HTTP_HOST'] . $_SERVER['PHP_SELF']);
}

if (isset($_SESSION['access_token'])) {
  echo "acces token ...";
  preprint($_SESSION['access_token']);

  $client->setAccessToken($_SESSION['access_token']);
}
/*
if ($client->getAccessToken()) {
  $me = $plus->people->get('me');

  // These fields are currently filtered through the PHP sanitize filters.
  // See http://www.php.net/manual/en/filter.filters.sanitize.php
  $url = filter_var($me['url'], FILTER_VALIDATE_URL);
  $img = filter_var($me['image']['url'], FILTER_VALIDATE_URL);
  $name = filter_var($me['displayName'], FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_HIGH);
  $personMarkup = "<a rel='me' href='$url'>$name</a><div><img src='$img'></div>";

  $optParams = array('maxResults' => 100);
  $activities = $plus->activities->listActivities('me', 'public', $optParams);
  $activityMarkup = '';
  foreach($activities['items'] as $activity) {
    // These fields are currently filtered through the PHP sanitize filters.
    // See http://www.php.net/manual/en/filter.filters.sanitize.php
    $url = filter_var($activity['url'], FILTER_VALIDATE_URL);
    $title = filter_var($activity['title'], FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_HIGH);
    $content = filter_var($activity['object']['content'], FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_HIGH);
    $activityMarkup .= "<div class='activity'><a href='$url'>$title</a><div>$content</div></div>";
  }

  // The access token may have been updated lazily.
  $_SESSION['access_token'] = $client->getAccessToken();
} else {
  $authUrl = $client->createAuthUrl();
}
*/
?>
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <link rel='stylesheet' href='style.css' />
</head>
<body>
<header><h1>Google+ Sample App</h1></header>
<div class="box">

<?php if(isset($personMarkup)): ?>
<div class="me"><?php print $personMarkup ?></div>
<?php endif ?>

<?php if(isset($activityMarkup)): ?>
<div class="activities">Your Activities: <?php print $activityMarkup ?></div>
<?php endif ?>

<?php
  if(isset($authUrl)) {
    print "<a class='login' href='$authUrl'>Connect Me!</a>";
  } else {
   print "<a class='logout' href='?logout'>Logout</a>";
    print "<a class='login' href='$client->createAuthUrl();'>Connect Me!</a>";
  }
?>
</div>
</body>
</html>