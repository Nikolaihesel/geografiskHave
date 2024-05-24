# geografiskHave
 2. semester eksamensprojekt 

<a name="readme-top"></a>

<!-- TABLE OF CONTENTS -->
## Indholdsfortegnelse
<details>
  <summary>Indholdsfortegnelse</summary>
  <ol>
    <li>
      <a href="#about-the-project">Om Projektet</a>
      <ul>
        <li><a href="#built-with">Bygget Med</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Opstart</a>
      <ul>
        <li><a href="#prerequisites">Krav</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Brug</a></li>
    <li><a href="#contact">Kontakt</a></li>
    <li><a href="#referances">Referancer</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## Om Projektet

[![Product Name Screen Shot][product-screenshot]](link til projekt site)

Dette projekt er en del af Modern Frontend Development faget på webudviklings uddannelsen 2 semester hos UCL erhvervsakademi og professionshøjskole. 

Der er til dette fag og denne opgave blevet opsat et tværfagligt samarbejde mellem webudvikling, Digital koncept udvikling samt, IT Og Økonomi studerende, og klienten Geografisk Have Kolding. 

Klienten Geografisk Have Kolding, er kommet med et problem som Digital Koncept udvikling har lavet en løsning til, hvoefter det er blevet overleveret til webudviklerne som skal sørge for at kode løsningen. Paralelt med at Digital Koncept Udvikling har skabt design og løsning har IT og Økonomi været inde og kortlægge opgaverne i projektet, samt lavet regnskaberne for løsningen.

Denne readme er en del af det repository som webudvikler studerende har lavet i forbindelse med dette projekt og indeholder den kode der er lavet til at oprette den overleverede løsning. 

<p align="left">(<a href="#readme-top">Til Toppen</a>)</p>

### Built With

Til dette projekt er der gjort brug af følgende frameworks og libararies:

* [![Leaflet][Leaflet.js]][Leaflet-url]
* [![React][React.js]][React-url]
* [![Firebase][Firebase]][Firebase-url]
* [![Sass][Sass]][Sass-url]
* [![Vite][Vite.js]][Vite-url]

<p align="left">(<a href="#readme-top">Til Toppen</a>)</p>

<!-- GETTING STARTED -->
## Opstart

For at kunne køre applikationen som de Webudviklings studerende har lavet er der en række trin og krav der skal opfyldes før man kan få det op og køre. Dette involvere at downloade og opsætte nødvendige dependencies, samt skal der hvis man vil lave sin egen firebase collection sørges for man har en konto på firebase, og at man retter de informationer der står inde i config filen. 

### Før du begynder

For at applikationen kan køre korrekt skal der i config mappen i firebase.js filen tjekkes at den korrekte informaiton er opstillet. Når dette projekt bliver afleveret er de nødvendige informationer til firabase opsat på en af de webudviklings studerende. Hvis man ønsker at bruge denne applikation til eget brug, skal man derfor sørge for at man har en konto på firebase, og dermed ændre informationerne i firebase.js filen til det der tilhøre egen konto.

Bemærk dette er kun hvis man selv ønsker adgang til firebase databasen direkte. 

### Installation

For at applikationen kan køre korrekt skal de følgende kommandoer køres i terminalen:
* npm 
  ```sh
  npm install
  ```
Dette er for at installere alle de dependencies der er nævnt i package.json filen, og som derved er krav for at applikationen kan køre. 

<p align="left">(<a href="#readme-top">Til Toppen</a>)</p>

<!-- USAGE EXAMPLES -->
## Brug

Dette projekt omahndler et geografisk kort og en audio player med historier, som kan bruges når man går rundt i Geografisk Have. Der er derved i dette projekt opsat et kort gennem leaflet, som med brug af geolocation viser hvor brugeren befinder sig. Derudover er der også lavet en tilhørende audio player, som kan afspille lydfilerne der tilhøre en given historie.

<p align="left">(<a href="#readme-top">Til Toppen</a>)</p>

<!-- CONTACT -->
## Kontakt
Nedenfor står kontakt opysningerne for de webudviklings studerende der har været en del af dette projekt:

Emilie <br>
Email:
Github:

Nikolaj <br>
Email:
Github:

Nicole <br>
Email:
Github:

Maria <br>
Email:
Github:
<p align="left">(<a href="#readme-top">Til Toppen</a>)</p>



<!-- Referances -->
## Referencer

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

* [Choose an Open Source License](https://choosealicense.com)
* [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
* [Malven's Flexbox Cheatsheet](https://flexbox.malven.co/)
* [Malven's Grid Cheatsheet](https://grid.malven.co/)
* [Img Shields](https://shields.io)
* [GitHub Pages](https://pages.github.com)
* [Font Awesome](https://fontawesome.com)
* [React Icons](https://react-icons.github.io/react-icons/search)

<p align="left">(<a href="#readme-top">Til Toppen</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/Nikolaihesel/geografiskHave/graphs/contributors
[product-screenshot]: images/screenshot.png
[Leaflet.js]: https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=Leaflet
[Leaflet-url]: https://leafletjs.com/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Firebase]: https://img.shields.io/badge/Firebase-F6820D?style=for-the-badge&logo=Firebase
[Firebase-url]: https://firebase.google.com/
[Sass]: https://img.shields.io/badge/Sass-f1f1f1?style=for-the-badge&logo=SASS
[Sass-url]: https://sass-lang.com/
[Vite.js]: https://img.shields.io/badge/vite-646CFF?style=for-the-badge
[Vite-url]: https://vitejs.dev/
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
