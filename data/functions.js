import Skill from "./models/skill.js";
import Education from "./models/education.js";
import Experience from "./models/experience.js";

export function fillExperience() {
  const experienceDiv = document.querySelector("#experience");

  const innerContent = document.createElement('div');
  innerContent.innerHTML = "<h2>Experience</h2><br>";

  fetch('data/JSON/experience.json')
    .then((response) => response.json())
    .then(data => {
      data.forEach((element) => {
        const skill = new Experience(element.company, element.jobTitle, element.date, element.description);
        const div = document.createElement('div');
        div.className = 'job card';
        
        div.innerHTML = `
        <h3 id="job">${skill.company}</h3>
        <p class="role">${skill.jobTitle}</p>
        <p class="timeline">${skill.date}</p>
        <p class="responsibilities">${skill.description}</p>
        `;
        innerContent.innerHTML += div.outerHTML;
      });
    })
    
  experienceDiv.appendChild(innerContent);
}

export function fillSkills() {
  const skillsDiv = document.querySelector("#skills");

  const innerContent = document.createElement('div');
  innerContent.innerHTML = "<h2>Skills</h2><br>";

  fetch('data/JSON/skills.json')
    .then((response) => response.json())
    .then(data => {
      data.forEach((element) => {
          const skill = new Skill(element.title, element.items);
          const div = document.createElement('div');
          div.className = 'skill card';

          // Corrected the innerHTML assignment with backticks (` `) for template literals
          div.innerHTML = `<h3>${skill.title}</h3>`;

          // Join the items with &bull; for bullet points
          div.innerHTML += skill.items.map(item => `<p>&bull; ${item}</p>`).join("");

          innerContent.innerHTML += div.outerHTML;
      });
    })
    
  skillsDiv.appendChild(innerContent);
}
export function fillEducation() {
    const educationDiv = document.querySelector(".education");

    const innerContent = document.createElement('div');
    innerContent.innerHTML = "<h2>Education</h2></br>";

    fetch('data/JSON/education.json')
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