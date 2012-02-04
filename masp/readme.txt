webeditor: http://daringfireball.net/projects/markdown/dingus

#nastaveni#

/config.php

#format url#

hostname.com/#controller/action

## controllery ##

### \#galery ###

generuje galeriffic galerii, **action** je jmeno slozky v adresari/Content/action

takze napr.: /#gallery/exalt vygeneruje galerii z obrazku ve slozce /Content/exalt

obrazky ve slozce musi musi mit nasledujici strukturu: 

*Content/action/slides*

-  full size obrazky jpg|jpeg|png
-  popisek galerie  
soubor *{culture}_figure.html* kde *culture* je **en** nebo **cz**



*Content/action/thumbs*

> nahledy obrazku, propojeni s fullsize obrazkem je na zaklade jmena (slides/aaa.jpg odpovida thums/aaa.jpg)


### \#content ###

nacte html z content/action.html

### \#menu  - private controller ###
private znamena ze se na neho neda odkazat z url

vygeneruje menu z JSON souboru *content/menu.json* viz. [json format](http://en.wikipedia.org/wiki/JSON)



