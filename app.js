
import { fillSkills, fillEducation, fillExperience } from "../data/functions.js";
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
