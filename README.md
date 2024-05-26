# geografiskHave
 2. semester eksamensprojekt 

<a name="readme-top"></a>

<!-- TABLE OF CONTENTS -->
## Table of Contents
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]][page-link]

This project is a part of the final exam for the Modern Frontend Development class, for the seccond semester of the webdevelopment course at UCL Erhvervsakademi & Professionshøjskole in Odense. 

For this class exam project, there has been a multi-course collaboration between the students in Webdevelopment, Digital Concept Development, as well as the IT and Ecconomi course, all of whom have worked towards creating a solution for the client Geografisk Have Kolding. 

The client Geografisk Have Kolding, has presented a problem which the Digital Concept Development students has created a prototype solution for, which has then been handed off to the Webdevelopers, whom are tasked with creating the actual application following the design and material from the handoff. During this process the IT and Ecconomi students have been tasked with overseeing the process, while working on creating detailed buissines proposals and calculating the cost of the project.

This readme is a part of the repository which the Webdevelopment team has made in connection to this project, and contains the finished product, which they have created from the handoff material. 

<p align="left">(<a href="#readme-top">To the Top</a>)</p>

### Built With

For this project the following libararies, frameworks and languages have been used:

* [![Leaflet][Leaflet.js]][Leaflet-url]
* [![React][React.js]][React-url]
* [![Firebase][Firebase]][Firebase-url]
* [![Sass][Sass]][Sass-url]
* [![Vite][Vite.js]][Vite-url]

<p align="left">(<a href="#readme-top">To the Top</a>)</p>

<!-- GETTING STARTED -->
### Prerequisites

In order to be able to use the solution which the Webdevelopment students have created, you need to run a series of commands in the terminal. These are to insure the nessesary documents and dependencies are installed and working. If these are not correctly installed the solution will not be able to function as intenced. 

### Installation

Before one can use the solution one must first ensure the nessesary dependencies have been installed, to do this you write the following command in the terminal:
* npm
 ```sh
 npm install
 ```
This will install all the dependencies which are described in the package.json file. Once these are installed you then need to write the following command to setup the actual solution and thus make it "live"
* npm
 ```sh
 npm run dev
 ```
This command will start up the application and will in the terminal also give a link which you can click to access the actual solution. 

<p align="left">(<a href="#readme-top">To the Top</a>)</p>

### Admin Panel

To create more depth for the project the team has designed and created a Admin Panel, where the owerns will be able to add, update and delete the stories for the story telling service. 

In order to access the admin panel, you add /admin in the address path, once on the site you the need to login to get access, this is to secure the admin panel. For the login one needs the Email and Password. 

<!-- USAGE EXAMPLES -->
## Usage

This project is about a geografical map and story telling web page, which a visitor of the client Geografish Have Kolding can use while they are walking around in the garden. The map function of the product uses leaflet and a opensource map with geolocation to show the user their location. Moreover there is also a audio player with audiofiles for the given story the user is listening to. Both the map locations and the audiofile is connected to specified stories which the user can find on the landing page of product.

<p align="left">(<a href="#readme-top">To the Top</a>)</p>

<!-- CONTACT -->
## Contact
Below are the contact information fot the 4 Webdevelopment students which have been a part of this project:

Emilie 
<br>
Email: ebha38482@edu.ucl.dk
<br>
Github: (https://github.com/Reitc)

Nikolaj Hesel Jørgensen 
<br>
Email: nhjo32218@edu.ucl.dk 
<br>
Github: (https://github.com/Nikolaihesel)

Nicole le Fevre
<br>
Email: nile28346@edu.ucl.dk
<br>
Github: (https://github.com/nicolelefevre98)

Maria Dimon
<br>
Email: mndi32110@edu.ucl.dk 
<br>
Github: (https://github.com/M-Dimon)
<p align="left">(<a href="#readme-top">To the Top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

The following list contains resources which the team has found helpfull in the completion of the project, and the corresponding files in it. 

* [Choose an Open Source License](https://choosealicense.com)
* [Img Shields](https://shields.io)
* [GitHub Pages](https://pages.github.com)
* [Font Awesome](https://fontawesome.com)
* [React Icons](https://react-icons.github.io/react-icons/search)

<p align="left">(<a href="#readme-top">To the Top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/Nikolaihesel/geografiskHave/graphs/contributors
[product-screenshot]: src/image/geografisk_have_preview.PNG
[page-link]: https://geografiskhave-17f07.web.app/?fbclid=IwZXh0bgNhZW0CMTAAAR3ty2jbaiAWek1g4ZnTpT55cq3iWXDTBIMjbOOyeQ_pKJGfNT8Pl5JbU6U_aem_Ac8vtD8vFvOvLM0kPRtJlGdHtCb3TFJw3Tgz2SHKr7dfOk2n9tCZnxW4upyMe9EJ6lNR9jbjOGQWfinxhP6HPJKe
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
