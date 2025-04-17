import { Education, Skill } from "./models.js";
// Catch all the # links from the nav and make them scroll smoothly to their destinations
const navLinks = document.querySelectorAll("nav ul li a");

// loop through the links and set an onclick event to send the user to the correct section in a smooth scroll
navLinks.forEach((link) => {
    link.onclick = (e) => {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute("href"));
        target.scrollIntoView({
            behavior: "smooth",
        });
        return false;
    };
});

fillEducation();
fillSkills()

function fillSkills(){
    
}

function fillEducation() {
    const educationDiv = document.querySelector(".education");

    const innerContent = document.createElement('div');
    innerContent.innerHTML = "<h2>Education</h2></br>";

    fetch('data/education.json')
      .then((response) => response.json())
      .then(data => {

        data.forEach((element) => {
            const edu = new Education(element.school, element.degree, element.date);
  
            const div = document.createElement('div');
            div.className = 'school card';
  
            div.innerHTML = `
              <h3>${edu.school}</h3>
              <p class="degree">${edu.degree}</p>
              <p class="timeline">${edu.date}</p>
            `;
            innerContent.innerHTML +=  div.outerHTML;
        });
      })
      educationDiv.appendChild(innerContent);
  }