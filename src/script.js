import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const panels = gsap.utils.toArray(".panel");
const myImage = document.getElementById("myImage");
const keyEmogi = document.querySelector(".key-emoji");
const nextButton = document.querySelector(".btn-next")
const previousBTN = document.querySelector(".btn-previous")
const pista1 = document.getElementById("pista1")
const keycode = document.getElementById("keycode")
const keygeneratezone = document.getElementById("keygenzone")


let current = 0;
let isAnimating = false;
let siteOn = false;
let isFirstLoad = true;
let clickCount = 0;
const maxClicks = 3;
let terminalCode = null

let isPannelComplete = [false, true, false, false];

function goToSection(index) {

  if (!siteOn || isAnimating || index < 0 || index >= panels.length) return;

  if (index > 0 && !isPannelComplete[index - 1]) return;
  isAnimating = true;





  gsap.to(window, {
    duration: 1,
    scrollTo: {
      y: panels[index],
      autoKill: false
    },
    ease: "power3.inOut",
    onComplete: () => {
      isAnimating = false;
      current = index;
      animateSection(index);
      updateNavButtons()
    }
  });


}

function generateCode() {


  terminalCode = Math.floor(Math.random() * 99999)
  console.log(terminalCode)
}

generateCode()


window.addEventListener("wheel", (e) => {
  if (e.deltaY > 0) {
    goToSection(current + 1);
  } else {
    goToSection(current - 1);
  }
});

function animateSection(index) {

  if (isFirstLoad) {
    goToSection(0);
    return;
  }
  if (index === 0 && isFirstLoad) {
    gsap.from(".intro h1", {
      y: 80,
      opacity: 0,
      duration: 1
    });
  }

  if (index === 1) {
    const cards = document.querySelectorAll(".work-card");
    if (cards.length) {
      gsap.from(cards, {
        opacity: 0,
        y: 40,
        stagger: 0.2
      });
    }
  }
}

const bulb = document.getElementById("bulb");

bulb.addEventListener("click", () => {
  siteOn = true;

  document.body.classList.remove("off");
  document.body.classList.add("on");

  gsap.to(".light-wrapper", {
    opacity: 0,
    duration: 1,
    pointerEvents: "none"
  });

  gsap.to("body", {
    backgroundColor: "#f5f5f5",
    duration: 1
  });


  animateSection(0);
  isFirstLoad = false;

});


bulb.addEventListener("mouseenter", () => {
  gsap.to(bulb, { rotation: 5, duration: 0.2, yoyo: true, repeat: -1, ease: "sine.inOut" });
});

bulb.addEventListener("mouseleave", () => {
  gsap.to(bulb, { rotation: 0, duration: 0.2 });
});


myImage.addEventListener("click", () => {
  clickCount++;

  gsap.to(myImage, { rotation: "+=30", duration: 0.5, ease: "power2.inOut" });

  if (clickCount >= maxClicks) {
    keyEmogi.style.opacity = 1;
    gsap.to(myImage, {
      y: window.innerHeight,
      rotation: 720,
      duration: 1,
      ease: "power2.in",
      onComplete: () => {

        myImage.style.visibility = "hidden";
        keyEmogi.style.opacity = 1;
      }
    });
  }
});

keyEmogi.addEventListener("click", () => {
  myImage.style.display = "hidden";
  const keySize = Math.min(window.innerWidth, window.innerHeight) * 0.5;


  if (clickCount < maxClicks) return;
  gsap.to(keyEmogi, {
    fontSize: keySize, duration: 0.75,
    onComplete: () => {
      isPannelComplete[0] = true;
      keyEmogi.style.display = "none";
      alert("has conseguido la llave")

      updateNavButtons()
    }
  });
})

nextButton.addEventListener("click", () => {
  if (isPannelComplete[current]) {
    goToSection(current + 1);
  } else {
    alert("Debes conseguir la llave primero!");
  }
});

previousBTN.addEventListener("click", () => {

  goToSection(current - 1);

});

function updateNavButtons() {

  if (current === 0) {
    previousBTN.style.display = "none";
  } else {
    previousBTN.style.display = "";
  }


  nextButton.disabled = !isPannelComplete[current];

  if (current > 0) previousBTN.disabled = false;
}

updateNavButtons()
pista1.addEventListener("click", () => {
  alert("Da 3 clicks a la imagen")
})

keycode.addEventListener("input", () => {
  const code = keycode.value;

  console.log(code)
  if (code == terminalCode) {
    generateKey();

  }
});

function generateKey() {
  keygeneratezone.innerHTML = "🗝️";
keygeneratezone.style.position = "absolute";


  const keySize = Math.min(window.innerWidth, window.innerHeight) * 0.5;

  gsap.to(keygeneratezone, {
    fontSize: keySize,
    rotation: 700,
    duration: 1.25,
    ease: "power2.inOut",
    onComplete: () => {
      isPannelComplete[2] = true;
      keygeneratezone.style.display = "none";
      alert("has conseguido la llave");
      updateNavButtons();
    }
  });
}

