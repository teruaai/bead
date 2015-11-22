
# bead Dokumentáció

## Követelményanalízis
---
### Követelmények

Az alkalmazás tantárgyak felvételét biztosítja. Regisztráció és bejelentkezés után a felhasználónak lehetősége van tárgyak felvételére,leadására.
  
Funkcionális követelméynek:
- csak regisztrált felhasználók használhatják az alkalmazást:
- bejelentkezett felhasnálóknak lehetőségük van:
   - tárgyak felvétele
   - tárgyak leadása
   - tárgyak listázása
- admin számára admin funkciók (hozzásadás,szerkesztés,törlés) :
    - tantárgyak
    - tanárok 
    - kurzusok 
  
 Nem funkcionális követlemények
  -  Gyors, intuitív kezelhetőség
  -  karbantartható kód, fejleszthető kód
  
###  Használati-esetmodel
![Használati eset diagram](/docs/hesmodel.png)
#### Szerepkörök

Szerepkör: Regisztrált felhasználó, admin

Leírás: Az alkalmazás teljes funkcionalitása elérhető az ebben a csoportba tartozó felhasználók számára.

Jogok:
felhasználók számára: kurzus felvétel, kurzus törlés, listázás,
admin számára: tantárgyhozzáadása /törlése /szerkesztése, tanár hozzáadása/törlése/szerkesztése, kurzus hozzáadása/törlése /szerkesztése

### Állapotdiagram
![Állapot diagram](/docs/allapot-diagram.png)
## Tervezés
---
### Architektúra terv
#### Oldaltérkép

- Bejelentkezés
- Regisztráció
- Felhasználói menü
 - Admin-Listázás (admin részére)
   - Tantárgyak szerkesztés/törlés
   - Tanárok szerkesztés/törlés
   - Kurzusok szerkesztés/törlés
 - Admin-Felvétel (admin részére)
   - Tantárgyak felvétel
   - Tanárok felvétel
   - Kurzusok felvétel
 - Kijelentkezés
- Tárgyaim
- Tárgyfelvétel
  - Kurzus felvétel

#### Végpontok

felhasználók számára elérhető végpontok:
* [/auth/login](https://bead-yvylso.herokuapp.com/auth/login) (GET,POST) Bejelentkezés
* [/auth/singup](https://bead-yvylso.herokuapp.com/auth/singup) (GET,POST) Regisztráció
* [/auth/logout](https://bead-yvylso.herokuapp.com/auth/logout) (GET) Kijelentkezés

* [/schedule/](https://bead-yvylso.herokuapp.com/schedule/)  (GET) - Tantárgyaim
* [/schedule/delete:id](https://bead-yvylso.herokuapp.com/schedule/delete:id)  (GET) -Kurzus törlés
* [/schedule/new](https://bead-yvylso.herokuapp.com/schedule/new)  (GET,POST) -Kurzus felvétel

admin számára elérhető végpontok:

* [/admin/](https://bead-yvylso.herokuapp.com/admin/) (GET) Listázás
* [/admin/add](https://bead-yvylso.herokuapp.com/admin/add) (GET,POST) Entitás hozzáadása
* [/admin/delete/subject/:id](https://bead-yvylso.herokuapp.com/admin/delete/subject/:id) (GET) Tárgy törlése
* [/admin/delete/teacher/:id](https://bead-yvylso.herokuapp.com/admin/delete/teacher/:id) (GET) Tanár törlése
* [/admin/delete/course/:id](https://bead-yvylso.herokuapp.com/admin/delete/course/:id) (GET) Kuzus törlése

* [/admin/edit/subject/:id](https://bead-yvylso.herokuapp.com/admin/edit/subject/:id)  (GET,POST) Tárgy szerkesztése
* [/admin/delete/teacher/:id](https://bead-yvylso.herokuapp.com/admin/edit/teacher/:id)  (GET,POST) Tanár szerkesztése
* [/admin/delete/course/:id](https://bead-yvylso.herokuapp.com/admin/edit/course/:id)  (GET,POST) Kurzus szerkesztése



#### Felhasználói felület
##### Oldalvázlat
![Oldalvázlat](/docs/oldal-vazlat.png)
##### Designterv
###### Bejelentkezési felület
![Bejelentkezési felület](/docs/bejelentkezesif.png)
##### Regisztrációs felület
![Regisztrációs felület](/docs/regisztraciosf.png)
##### Admin felület - Felvétel
![Admin-felvétel](/docs/admin_felvétel.png)
##### Admin felület - Lista
![Admin-lista](/docs/admin_lista.png)

#### Osztálymodel
##### Adatmodel
![Adatmodel](/docs/adatb-model.png)

##### Adatbázis terv
![Adatbázis terv](/docs/adatbazis.png)
### Implementáció
---
#### Fejlesztői környezet bemutatása

  - Az alkalmazás Node.js szerveroldali JavaScript környezetben készül. A projekt függőségeit a Node.js saját csomagkezelője tartja számon a ```package.json``` fájlban.

- Az alkalmazás vázát az Express webes keretrendszer adja, ez egy aszinkron HTTP szervert rejt magában, amelyhez elegáns és tiszta interfészt biztosít. Router objektuma segítségével a végpontok felsorolhatók és azok logikája tömören és könnyedén leírhatók.

- Az adatbáziseléréshez szükséges kódok a ```Waterline``` ORM segítségével vannak absztraktálva, az alkalmazás adatbázismotorjának kicserélése néhány sor módosításával elérhető. Alapértelmezetten szöveges fájlokba kerülnek mentésre az adatok.

- Az authentikációhoz szükséges munkamenetkezelést a Passport valósítja meg, a jelszavak hashelését a bcryptjs csomag végzi.

- A weboldal felületét a Handlebars.js sablonrendszer rendereli ki.

- Az alkalmazáshoz készülő unit tesztek futtatását Mocha JavaScript test framework végzi, amely elindítható a ```node_modules/mocha/bin/mocha --watch **/*.test.js``` vagy a ```npm``` test parancs futtatásával.



#### Könyvtár struktúra
```
.
├── README.md
├── config
│   └── waterline.js
├── controllers
│   ├── admin.js
│   ├── auth.js
│   └── schedule.js
├── docs
│   ├── adatb-model.png
│   ├── adatbazis.png
│   ├── admin_felvétel.png
│   ├── admin_lista.png
│   ├── allapot-diagram.png
│   ├── bejelentkezesif.png
│   ├── hesmodel.png
│   ├── oldal-vazlat.png
│   └── regisztraciosf.png
├── models
│   ├── course.js
│   ├── subject.js
│   ├── teacher.js
│   └── user.js
├── package.json
├── public
│   └── style.css
├── server.js
├── tests
│   ├── subject.test.js
│   └── user.test.js
└── views
    ├── add.hbs
    ├── admin-add.hbs
    ├── admin-edit.hbs
    ├── admin-list.hbs
    ├── error.hbs
    ├── layout.hbs
    ├── list.hbs
    ├── login.hbs
    └── signup.hbs
```
 A könyvtárstruktúra követi az MVC architektúra felépítését.

 A ```models``` mappában találhatók az alkalmazás adatmodelljeit megvalósító fájlok, a ```controllers``` mappa tartalmazza a végpontok működésének logikáját, a ```views``` pedig a Handlebars nézeteket.

A ```config```, ```node_modules``` mappák a konfigurációs állományokat és az alkalmazás függőségeit tartalmazzák, a ```docs```-ban a dokumentációhoz szükséges képek helyezkednek el. A ```tests``` az adatmodelleket és a alkalmazáslogikát ellenőrző tesztfájlokat foglalja magában.

### Tesztelés
---
#### Unit tesztek
A unit tesztelés Mocha keretrendszerrel lett megvalósítva a Chai Assertion Library segítségével. A tesztek a ```tests``` mappában találhatók, modellenként csoportosítva. A függőségek telepítése után (```npm install```) ezek automatikusan lefuttathatók az ```npm``` test parancs kiadásával.

Tesztesetek
User model (user.test.js):
- Felhasználó létrehozása
- Felhasználó keresése
- Regisztráció elenőrzése felhasználónév nélkül
- Jelszóellenörző függvény működésének tesztelése
Subject model (subject.test.js):
 - Tantárgy létrehozása
 - Tantárgy keresése
 - Tantárgy keresése, kurzussal való feltöltés tesztelése

#### Funkcionális felületi tesztek
A funkcionális tesztelés Selenium IDE böngészőplugin segítségével lett elvégezve. Néhány konkrét eset táblázatos formában:

Regisztrációs felületi teszt

| register | param1 | param2 |
| --- | --- | --- |
| open | /auth/login |
| clickAndWait | link=Regisztráció |
| type | id=username | elek |
| type | id=password | abcdefg |
| type | id=password-confirm | abcdefg |
| type | id=firstname | Teszt |
| type | id=lastname | Elek |
| clickAndWait | //button[@type='submit'] |
| assertLocation | https://bead-yvylso.herokuapp.com/schedule |

Admin felület -tantárgy hozzáadása teszt

| subject_add | param1 | param2 |
| --- | --- | --- |
| open | /auth/login |
| type | id=username | admin |
| type | id=password | admin |
| clickAndWait | //button[@type='submit'] |
| clickAndWait | link=Felvétel |
| type | id=subject-s | Fizika |
| type | id=credits | 2 |
| clickAndWait | css=button.btn.btn-primary |
| clickAndWait | link=Lista |
| assertText | //table[1]//tbody//tr[last()]//td[1] | Fizika |
### Felhasználói dokumentáció
---
Függőségek: git, node.js, npm

A fenti függőségek az adott Linux-disztribúció csomagkezelőjével telepíthetők (pl.: apt, yum, dnf, pacman). Windows rendszer esetén a https://git-scm.com/ és a https://nodejs.org/ weboldalról letölthetők a szükséges futtatható állományok.

 - Alkalmazás letöltése

``` git clone https://github.com/teruaai/bead.git
cd bead ```
 - lépés: Alkalmazás további függőségeinek telepítése

```npm install```

 - lépés (opcionális): Unit tesztek futtatása

```npm test```

 - lépés: Alkalmazás elindítása

```npm start```

#### A program használata

Az alkalmazás elindítása után elérhető a szolgáltatás az alapértelmezetten beállított TCP 3000 porton. A felület az intuitív kezelhetőségre törekedve készült.

A szolgáltatások használatához regisztráció szükséges, amit a Regisztráció linkre kattintva érhetünk el. A bejelentkezés után a felső menüsávon (tárgyaim tárgyfelvétel) menüpontokkal érhető el a felvett kurzusok listája, kurzusok felvétele.

Bejelentkezést követően a listázó felület jelenik meg. Ha voltak korábban felvéve kurzusok itt törölni a felvételt.

A tárgyfelvétel menüpontra kattintva egy legördülő listából kiválasztható a felvenni kívánt tárgy, amit a felvétel gombra kattintva rögziteni lehet a felvett tárgyak listájában.

A felület jobb felső sarkában a felhasználónévre kattintva az alkalmazásból kijelentkezhetünk, amely az aktív munkamenet-azonosítónk törlését vonja maga után.


