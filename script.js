const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
}

const autoPlay = () => {
    if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the carousel after every 2500 ms
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);

//3d image
const monitor = document.querySelector('.monitor');

monitor.addEventListener('click', () => {
    monitor.classList.toggle('rotate');
});

//nav name trushna

// skills
// Skill Data
const skills = [
    { name: "HTML", level: 90, icon: "html-icon.png" },
    { name: "CSS", level: 85, icon: "css-icon.png" },
    { name: "JavaScript", level: 80, icon: "js-icon.png" },
    { name: "React", level: 75, icon: "react-icon.png" },
    { name: "Firebase", level: 70, icon: "firebase-icon.png" },
    { name: "Node.js", level: 85, icon: "node-icon.png" },
  ];
  
  // Function to Generate Skill Cards
  function generateSkillCards(skills, containerId) {
    const container = document.getElementById(containerId);
    skills.forEach(skill => {
      const card = document.createElement('div');
      card.classList.add('skill-card');
  
      // Icon
      const img = document.createElement('img');
      img.src = skill.icon;
      img.alt = `${skill.name} Icon`;
  
      // Skill Name
      const name = document.createElement('p');
      name.textContent = skill.name;
  
      // Progress Bar
      const progressBar = document.createElement('div');
      progressBar.classList.add('progress-bar');
  
      const progress = document.createElement('div');
      progress.classList.add('progress');
      progress.style.width = `${skill.level}%`;
  
      progressBar.appendChild(progress);
      card.appendChild(img);
      card.appendChild(name);
      card.appendChild(progressBar);
      container.appendChild(card);
    });
  }
  
  // Divide Skills into Left and Right Columns
  const midPoint = Math.ceil(skills.length / 2);
  generateSkillCards(skills.slice(0, midPoint), 'skills-left');
  generateSkillCards(skills.slice(midPoint), 'skills-right');
  