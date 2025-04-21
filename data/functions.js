import Skill from "./models/skill.js";
import Education from "./models/education.js";
import Experience from "./models/experience.js";
import Project from "./models/project.js";

export function fillExperience() {
  const experienceDiv = document.querySelector("#experience");

  const innerContent = document.createElement("div");
  innerContent.innerHTML = "<h2>Job experiences</h2><br>";

  fetch("data/JSON/experiences.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((element) => {
        const skill = new Experience(
          element.company,
          element.jobTitle,
          element.date,
          element.description
        );
        const div = document.createElement("div");
        div.className = "job card";

        div.innerHTML = `
        <h3 id="job">${skill.company}</h3>
        <p class="role">${skill.jobTitle}</p>
        <p class="timeline">${skill.date}</p>
        <p class="responsibilities">${skill.description}</p>
        `;
        innerContent.innerHTML += div.outerHTML;
      });
    });

  experienceDiv.appendChild(innerContent);
}

export function fillSkills() {
  const skillsDiv = document.querySelector("#skills");

  const innerContent = document.createElement("div");
  innerContent.innerHTML = "<h2>Skills</h2><br>";

  fetch("data/JSON/skills.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((element) => {
        const skill = new Skill(element.title, element.items);
        const div = document.createElement("div");
        div.className = "skill card";

        // Corrected the innerHTML assignment with backticks (` `) for template literals
        div.innerHTML = `<h3>${skill.title}</h3>`;

        // Join the items with &bull; for bullet points
        div.innerHTML += skill.items
          .map((item) => `<p>&bull; ${item}</p>`)
          .join("");

        innerContent.innerHTML += div.outerHTML;
      });
    });

  skillsDiv.appendChild(innerContent);
}
export function fillEducation() {
  const educationDiv = document.querySelector(".education");

  const innerContent = document.createElement("div");
  innerContent.innerHTML = "<h2>Education</h2></br>";

  fetch("data/JSON/educations.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((element) => {
        const edu = new Education(element.school, element.degree, element.date);

        const div = document.createElement("div");
        div.className = "school card";

        div.innerHTML = `
              <h3>${edu.school}</h3>
              <p class="degree">${edu.degree}</p>
              <p class="timeline">${edu.date}</p>
            `;
        innerContent.innerHTML += div.outerHTML;
      });
    });
  educationDiv.appendChild(innerContent);
}

export async function fillProjects() {
  const projectsDiv = document.querySelector("#portfolio");
  const innerContent = document.createElement("div");
  innerContent.innerHTML = "<h2>Recent Work</h2><br>";
  const projects = await fetchProjects();
  
  if (projects == null || projects.length == 0) {
    return;
  }
  for (let i = 0; i < projects.length; i++) {
    if (i < 3) {
      const div = document.createElement("div");
      div.className = "project card";

      // Create image
      const imageDiv = document.createElement("div");
      imageDiv.className = "thumbnail";
      const link = document.createElement("a");
      link.href = projects[i].url ?? "";
      link.target = "_blank";

      // add image
      const image = document.createElement("img");
      image.src = projects[i].imageUrl ? `./images/${projects[i].imageUrl}` : "";
      image.alt = projects[i].alt ?? "";
      link.appendChild(image);
      imageDiv.appendChild(link);
      
      // add image to div
      div.appendChild(imageDiv);

      // make a new div for text
      const textDiv = document.createElement("div");
      textDiv.className = "cardText";
      // add title
      const titleHeader = document.createElement("h3");
      titleHeader.innerHTML = projects[i].title;
      textDiv.appendChild(titleHeader);

      // add description
      const descriptionParagraph = document.createElement("p");
      descriptionParagraph.innerHTML = projects[i].description;
      textDiv.appendChild(descriptionParagraph);
      
      // add technologies
      const technologiesDiv = document.createElement("div");
      technologiesDiv.className = "technologyContainer";
      technologiesDiv.innerHTML += getTechnologies(projects[i].technologies);
      textDiv.appendChild(technologiesDiv);
      
      div.appendChild(textDiv);
      // add div to innercontent
      innerContent.innerHTML += div.outerHTML;
    } else {
      break;
    }
  }
  const showMoreButton = document.createElement("h2")
  showMoreButton.classList = "portfolioBtn"
  showMoreButton.innerHTML = "Show more"
  innerContent.appendChild(showMoreButton)

  projectsDiv.appendChild(innerContent);
}

const getTechnologies = (technologies) => {
  return technologies
    .map((tech) => `<span class="technologyPill">${tech}</span>`)
    .join("");
};

const fetchProjects = async () => {
  const response = await fetch("data/JSON/projects.json");
  const data = await response.json();

  const result = data.map(
    (element) =>
      new Project(
        element.imageUrl,
        element.alt,
        element.title,
        element.description,
        element.url,
        element.technologies
      )
  );

  return result;
};


export async function fillModalProjects() {
  const modalProjects = document.querySelector(".modal-projects");
  console.log(modalProjects)
  const innerContent = document.createElement("div");
  const projects = await fetchProjects();
  
  if (projects == null || projects.length == 0) {
    return;
  }
  for (let i = 0; i < projects.length; i++) {
    if (i > 3) {
      const div = document.createElement("div");
      div.className = "project card";

      // Create image
      const imageDiv = document.createElement("div");
      imageDiv.className = "thumbnail";
      const link = document.createElement("a");
      link.href = projects[i].url ?? "";
      link.target = "_blank";

      // add image
      const image = document.createElement("img");
      image.src = projects[i].imageUrl ? `./images/${projects[i].imageUrl}` : "";
      image.alt = projects[i].alt ?? "";
      link.appendChild(image);
      imageDiv.appendChild(link);
      
      // add image to div
      div.appendChild(imageDiv);

      // make a new div for text
      const textDiv = document.createElement("div");
      textDiv.className = "cardText";
      // add title
      const titleHeader = document.createElement("h3");
      titleHeader.innerHTML = projects[i].title;
      textDiv.appendChild(titleHeader);

      // add description
      const descriptionParagraph = document.createElement("p");
      descriptionParagraph.innerHTML = projects[i].description;
      textDiv.appendChild(descriptionParagraph);
      
      // add technologies
      const technologiesDiv = document.createElement("div");
      technologiesDiv.className = "technologyContainer";
      technologiesDiv.innerHTML += getTechnologies(projects[i].technologies);
      textDiv.appendChild(technologiesDiv);
      
      div.appendChild(textDiv);
      // add div to innercontent
      innerContent.innerHTML += div.outerHTML;
    } else {
      continue;
    }
  }
  modalProjects.appendChild(innerContent);
}