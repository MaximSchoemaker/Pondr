Voel je niet bezwaard om elke vraag in te vullen, ik ben meer dan blij met wat voor feedback je bereid bent om te geven. Maar als je geinteresseerd ben zou ik je graag uitnodigen om mee te doen met deze discussie ✨

---

1 - Vertaling

Origineel heb ik deze workshop in het Engels geschreven. Met de vertaling heb ik echter besloten de code in het Engels te houden. Hoewel het mogelijk is om de Flower Garden API in het Engels aan te bieden kan ik ingebouwde keywords als `function` niet aanpassen. Laat me weten of dit verstorend is in de les, en of er nut zit in een `stengel()` , `knop()` , `blaadje()` , etc.

---

2 - Case voorkeur

Ik heb besloten om snake_case te gebruiken ipv cammelCase. Mijn redenering is dat snake_case meer toegankelijk is wat betreft leesbaarheid. Dit komt overeen met mijn eigen dyslexie ervaring.

Het nadeel is dat dit kennis vergt van hoe je een underscore typt. Ik denk dat dit compromis het waard is gegeven dat haakjes en krulhaakjes zowiezo vereist zijn.

Ik ben erg geinteresseerd in jouw case voorkeur en de rede hiervoor.

---

3 - Fracties vs decimalen vs percentages

Ik ben van mening dat het binnen creative coding ontzetten nuttig is om met genormalizeerde waardes te werken (tussen 0 - 1). Vermenigvuldiging van fracties blijven genormalizeerd, terwijl percentages de neiging hebben uit de hand te lopen. Hoewel ik denk dat percentages intuitiever zijn voor beginners, lijkt mij dat het opbouwen van een intuitie rond ratios zeer waardevol is in de lange termijn.

Wat betreft fracties vs decimalen heb ik besloten om fracties te gebruiken. Hoewel `0.5` makelijk te zien is als een half, denk ik dat met `0.125` vs `1 / 8` fracties een stuk duidelijker zijn voor beginners.

---

4 - Code complexiteit

Het gros van de code in Flower Garden is gestroomlijnd om zo klein mogelijk te zijn. Ik heb een uitzondering gemaakt voor de slides [Kleuren](/bloemen-tuin/het-tuin-assortiment/kleuren) and [Interactie](/bloemen-tuin/het-tuin-assortiment/interactie). Mijn idee is om studenten aan te moedigen te interacteren met code die ze niet compleet begrijpen door te focussen op syntax highlighting en herkenbare variabele namen. Hoewel dit een belangrijke vaardigheid is om te ontwikkelen is het potentieel iets te vroeg om dit voor te leggen aan beginners. Laat me weten als je denkt dat deze slides te ingewikkeld zijn.

---

5 t & f vs time & ???

Ik heb besloten om enkele letter variabelen te gebruiken voor `t` en `f`. Dit zorgt ervoor dat ingewikkelde berekeningen er behapbaarder uitzien (bijv. `t + f * 1 / 2`) net als hoe we dit met wiskundige formules doen. Ik ben echter van mening dat `time` duidelijker zou kunnen zijn, maar `fraction` of `fract` komt mij minder logisch over. Ik zou graag weten of je een beter woord kent voor `f`. Het staat voor `index / count`, de fractie van de index over de count in een loop.

---

6 - Toegankelijkheid vs waarheidsgetrouwheid

Flower Garden is geoptimaliseerd in termen van syntax en concepten. Een van de manieren waarop ik dit heb geprobeerd uit te voeren is door stijl variabelen zoals `bud_size`, `stem_bend`, `petal_color`, etc te laten werken met een stack context wanneer deze binnen een `repeat`, `ring`, `fork` of `branch` aanroep worden gebruikt. Wanneer een variabele binnen een controle functie wordt aangepast, wordt deze teruggezet naar de vorige waarde wanneer de functie aanroep eindigt. Dit zorgt ervoor dat stijl veranderingen alleen effect hebben op `bud`, `stem` en `petal` aanroepen binnen diezelfde controle functie. Dit voorkomt dat stijl verandering effect hebben op aangrenzende functies.

Hoewel dit makkelijker is om mee te werken, is dit niet hoe normaliter variabelen aanpassing werkt in JavaScript. Ik probeer de toegangeklijk op te wegen tegen het introduceren van niet-overdraagbare intuitie. In dit geval denk ik dat dat het waard is, maar ik hoor graag hoe je hierover denkt.

---

7 - Omgedraaide y-as

Het omdraaien van de y-as (oorsprong = linksonder vs linksboven) is een zelfde soort overweging. Ik heb gekozen dit te doen omdat het `mouse_y` op een intuitive manier bruikbaar maakt. Ik maak mij echter zorgen over het introduceren van intuitie die later binnen andere programmeer contexts weer ontleert moet worden.

---

Bedankt voor je hulp! 🤗