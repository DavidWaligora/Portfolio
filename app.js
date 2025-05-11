
import { fillSkills, fillEducation, fillExperience, fillProjects, fillModalProjects } from "../data/functions.js";
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
fillExperience();
await fillProjects();


// modal// Get the modal
var modal = document.getElementById("modalPortfolio");
var portfolioBtn = document.querySelector(".portfolioBtn");
var span = document.getElementById("portfolioCloseBtn");

// When the user clicks on the button, open the modal
portfolioBtn.onclick = async function() {
  modal.style.display = "block";
  document.body.classList.add("projects-modal-open");
  await fillModalProjects()
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
  document.body.classList.remove("projects-modal-open");
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    document.body.classList.remove("projects-modal-open");
  }
}

// prevent enter 
document.getElementById('myForm').addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault(); // Stop form from submitting
    console.log(event)
  }
});


  export function onSubmit(token) {
     document.getElementById("myForm").submit();
   }