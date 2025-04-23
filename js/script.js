document.addEventListener("DOMContentLoaded", function () {
    // Portal Navigation
    const portalBtns = document.querySelectorAll(".portal-btn");
    const dimensions = document.querySelectorAll(".dimension");
    const transitions = {
      home: document.getElementById("portal-transition"),
      about: document.getElementById("warp-transition"),
      projects: document.getElementById("fold-transition"),
      education: document.getElementById("portal-transition"),
      certificates: document.getElementById("warp-transition"),
      contact: document.getElementById("fold-transition"),
    };

    portalBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const targetId = this.getAttribute("data-target");
        const transition = transitions[targetId];

        // Play transition effect
        transition.style.opacity = "1";
        setTimeout(() => {
          transition.style.opacity = "0";
        }, 1500);

        // Change active dimension
        dimensions.forEach((dim) => {
          dim.classList.remove("active");
        });
        document.getElementById(targetId).classList.add("active");
      });
    });

    // About Me - Interactive Personality Elements
    const personalityElements = document.querySelectorAll(
      ".personality-element"
    );

    function randomMovement() {
      personalityElements.forEach((elem) => {
        const currentTop = parseFloat(elem.style.top);
        const currentLeft = parseFloat(elem.style.left);

        // Random movements within 5% of current position
        const newTop = Math.max(
          0,
          Math.min(90, currentTop + (Math.random() - 0.5) * 10)
        );
        const newLeft = Math.max(
          0,
          Math.min(90, currentLeft + (Math.random() - 0.5) * 10)
        );

        elem.style.top = `${newTop}%`;
        elem.style.left = `${newLeft}%`;
      });

      setTimeout(randomMovement, 3000);
    }

    setTimeout(randomMovement, 3000);

    // Matrix Rain Easter Egg
    const matrixCanvas = document.getElementById("matrixRain");
    const ctx = matrixCanvas.getContext("2d");
    let matrixActive = false;

    function setupMatrixRain() {
      matrixCanvas.width = window.innerWidth;
      matrixCanvas.height = window.innerHeight;

      const fontSize = 14;
      const columns = matrixCanvas.width / fontSize;

      // Array to store the y position of each column
      const drops = [];
      for (let i = 0; i < columns; i++) {
        drops[i] = 1;
      }

      function drawMatrix() {
        if (!matrixActive) return;

        // Semi-transparent black to create fade effect
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

        ctx.fillStyle = "#0F0"; // Green text
        ctx.font = fontSize + "px monospace";

        // For each column
        for (let i = 0; i < drops.length; i++) {
          // Random character
          const text = String.fromCharCode(Math.random() * 128);

          // x = i*fontSize, y = drops[i]*fontSize
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);

          // After drawing, increment y coordinate
          if (
            drops[i] * fontSize > matrixCanvas.height &&
            Math.random() > 0.975
          ) {
            drops[i] = 0;
          }

          drops[i]++;
        }

        requestAnimationFrame(drawMatrix);
      }

      requestAnimationFrame(drawMatrix);
    }

    // Easter Eggs
    // Egg 1: Matrix Rain
    document
      .querySelector(".egg-1")
      .addEventListener("click", function () {
        matrixActive = !matrixActive;
        matrixCanvas.style.display = matrixActive ? "block" : "none";
        if (matrixActive) {
          setupMatrixRain();
        }
      });

    // Egg 2: Personality Elements Reorganize

    document
      .querySelector(".egg-2")
      .addEventListener("click", function () {
        personalityElements.forEach((elem) => {
          elem.style.top = `${Math.random() * 80 + 10}%`;
          elem.style.left = `${Math.random() * 80 + 10}%`;
          elem.style.transform = `rotate(${
            Math.random() * 20 - 10
          }deg)`;
        });
      });

    // Egg 3: Gravity effect on education timeline
    document
      .querySelector(".egg-3")
      .addEventListener("click", function () {
        const educationItems =
          document.querySelectorAll(".education-item");

        educationItems.forEach((item) => {
          // Apply "falling" animation
          item.style.transition =
            "all 2s cubic-bezier(.17,.67,.83,.67)";
          item.style.top = "85%";

          // Then restore them with physics motion
          setTimeout(() => {
            item.style.transition = "all 1s cubic-bezier(0,1.5,.5,1)";
            const originalTop = item.style.top;
            item.style.top = originalTop;
          }, 2000);
        });
      });

    // Konami Code Easter Egg
    const konamiCode = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];
    let konamiIndex = 0;

    document.addEventListener("keydown", function (e) {
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;

        if (konamiIndex === konamiCode.length) {
          // Activate 8-bit mode easter egg
          document.body.style.fontFamily =
            "'Press Start 2P', cursive, monospace";
          document.body.style.imageRendering = "pixelated";

          // Add pixel overlay
          const pixelOverlay = document.createElement("div");
          pixelOverlay.style.position = "fixed";
          pixelOverlay.style.top = "0";
          pixelOverlay.style.left = "0";
          pixelOverlay.style.width = "100%";
          pixelOverlay.style.height = "100%";
          pixelOverlay.style.backgroundImage =
            'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABtJREFUeNpi+M/A8J+BkYGBgZGBgYGJgYEBIMAABRgAFicINQUdKJ4AAAAASUVORK5CYII=")';
          pixelOverlay.style.pointerEvents = "none";
          pixelOverlay.style.zIndex = "100";
          pixelOverlay.style.opacity = "0.1";
          document.body.appendChild(pixelOverlay);

          // Play 8-bit sound
          const sound = new Audio(
            "data:audio/mp3;base64,SUQzAwAAAAAfdlRJVDIAAAAZAAAATWFyaW8gMSBVcCBTb3VuZCBFZmZlY3RUUEUxAAAADQAAAFVuaXF1ZSBJRDogMVRDT04AAAAPAAAAUmV0cm8gR2FtZXMgU0ZYDVRUQ08AAAAPAAAAU291bmQgRWZmZWN0c09TU1QAAAAiAAAATGF2ZjU2LjQwLjEwMSBMaWJyYXJ5IChPcGVuIFNvdXJjZSk="
          );
          sound.play();

          // Reset index for next time
          konamiIndex = 0;

          // Return to normal after 5 seconds
          setTimeout(() => {
            document.body.style.fontFamily = "";
            document.body.style.imageRendering = "";
            document.body.removeChild(pixelOverlay);
          }, 5000);
        }
      } else {
        konamiIndex = 0;
      }
    });

    // Hidden portal to secret dimension
    // Create a hidden portal that appears when clicking a specific sequence of elements
    let secretSequence = [];
    const correctSequence = ["about", "projects", "education", "about"];

    portalBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const dimension = this.getAttribute("data-target");
        secretSequence.push(dimension);

        // Keep only the last 4 entries
        if (secretSequence.length > 4) {
          secretSequence.shift();
        }

        // Check if sequence matches
        if (
          secretSequence.length === 4 &&
          secretSequence.every(
            (val, idx) => val === correctSequence[idx]
          )
        ) {
          // Create secret portal
          const secretPortal = document.createElement("div");
          secretPortal.className = "portal-btn";
          secretPortal.style.borderColor = "#ff0000";
          secretPortal.style.animation = "pulse 1s infinite";
          secretPortal.style.position = "fixed";
          secretPortal.style.top = "50%";
          secretPortal.style.left = "50%";
          secretPortal.style.transform = "translate(-50%, -50%)";
          secretPortal.style.width = "100px";
          secretPortal.style.height = "100px";
          secretPortal.style.zIndex = "1000";

          document.body.appendChild(secretPortal);

          // Portal click event
          secretPortal.addEventListener("click", function () {
            // Show secret message
            alert(
              "You've discovered the secret dimension! The truth is that this portfolio exists in infinite dimensions... just like your potential. Never stop exploring!"
            );

            // Remove portal
            document.body.removeChild(secretPortal);

            // Reset sequence
            secretSequence = [];
          });

          // Auto-remove after 5 seconds if not clicked
          setTimeout(() => {
            if (document.body.contains(secretPortal)) {
              document.body.removeChild(secretPortal);
            }
          }, 5000);
        }
      });
    });

// Project card interactions
const projectCards = document.querySelectorAll('.project-dimension');

projectCards.forEach(card => {
  card.addEventListener('click', function(e) {
    // Prevent navigation if clicking on links
    if (e.target.closest('.project-link')) {
      return;
    }
    
    const cube = this.querySelector('.project-cube');
    const isFlipped = cube.style.transform === 'rotateY(180deg)';
    
    cube.style.transform = isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)';
  });

  // Add hover effect
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-10px)';
  });

  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
      });
    });

// Add particles effect
function createParticles() {
  const particlesContainer = document.getElementById('particles');
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    // Random size
    const size = Math.random() * 3 + 1;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    // Random animation delay
    particle.style.animationDelay = Math.random() * 15 + 's';
    
    particlesContainer.appendChild(particle);
  }
}

// Create particles when home section is active
const homeSection = document.getElementById('home');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      createParticles();
    }
  });
}, { threshold: 0.5 });

observer.observe(homeSection);

// Alien Message Handler
const alienButton = document.getElementById('alien-button');
const alienMessage = document.getElementById('alien-message');
let messageVisible = false;

alienButton.addEventListener('click', function(e) {
  e.stopPropagation(); // Prevent event bubbling
  messageVisible = !messageVisible;
  alienMessage.style.display = messageVisible ? 'block' : 'none';
  
  // Add shake animation to button when clicked
  this.style.animation = 'none';
  this.offsetHeight; // Trigger reflow
  this.style.animation = 'float 3s ease-in-out infinite';
});

// Close message when clicking outside
document.addEventListener('click', function(e) {
  if (messageVisible && 
      !alienMessage.contains(e.target) && 
      e.target !== alienButton) {
    messageVisible = false;
    alienMessage.style.display = 'none';
  }
});

// Contact Form Handler
const messageDoor = document.getElementById('message-door');
const contactForm = document.getElementById('contact-form');
const backToContact = document.getElementById('back-to-contact');
const contactDoors = document.querySelector('.contact-doors');

messageDoor.addEventListener('click', function() {
  contactForm.style.display = 'block';
  backToContact.style.display = 'flex';
  contactDoors.style.display = 'none';
});

backToContact.addEventListener('click', function() {
  contactForm.style.display = 'none';
  backToContact.style.display = 'none';
  contactDoors.style.display = 'flex';
});
  });