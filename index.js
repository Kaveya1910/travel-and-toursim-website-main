/* ===========================
   PAGE LOADER
=========================== */
window.addEventListener("load", () => {
  setTimeout(() => {
    const loader = document.querySelector(".page-loader");
    if (loader) loader.classList.add("loaded");

    // Trigger hero reveal animations
    document.querySelectorAll(".reveal-up").forEach((el) => {
      el.classList.add("visible");
    });
  }, 2000);
});

/* ===========================
   CUSTOM CURSOR
=========================== */
const cursor = document.querySelector(".cursor");
const cursorFollower = document.querySelector(".cursor-follower");

let mouseX = 0,
  mouseY = 0;
let followerX = 0,
  followerY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (cursor) {
    cursor.style.left = mouseX + "px";
    cursor.style.top = mouseY + "px";
  }
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  if (cursorFollower) {
    cursorFollower.style.left = followerX + "px";
    cursorFollower.style.top = followerY + "px";
  }
  requestAnimationFrame(animateFollower);
}
animateFollower();

// Cursor scale on interactive elements
document
  .querySelectorAll(
    "a, button, .menu, .arrow button, .angle-left, .angle-right, i"
  )
  .forEach((el) => {
    el.addEventListener("mouseenter", () => {
      if (cursor) {
        cursor.style.width = "16px";
        cursor.style.height = "16px";
      }
      if (cursorFollower) {
        cursorFollower.style.width = "48px";
        cursorFollower.style.height = "48px";
        cursorFollower.style.opacity = "0.3";
      }
    });
    el.addEventListener("mouseleave", () => {
      if (cursor) {
        cursor.style.width = "8px";
        cursor.style.height = "8px";
      }
      if (cursorFollower) {
        cursorFollower.style.width = "30px";
        cursorFollower.style.height = "30px";
        cursorFollower.style.opacity = "0.6";
      }
    });
  });

/* ===========================
   NAVBAR SCROLL EFFECT
=========================== */
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 60) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

/* ===========================
   MOBILE MENU
=========================== */
const bars = document.querySelector(".bars");
const mobileMenu = document.getElementById("mobileMenu");
const closeMenu = document.getElementById("closeMenu");

if (bars) {
  bars.addEventListener("click", () => {
    mobileMenu.classList.add("open");
  });
}

if (closeMenu) {
  closeMenu.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
  });
}

document.querySelectorAll(".mob-link").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
  });
});

/* ===========================
   VIDEO SWITCHER (Hero)
=========================== */
let videosource1 = document.getElementById("videosource1");
let videosource2 = document.getElementById("videosource2");
let videosource3 = document.getElementById("videosource3");
let videosource4 = document.getElementById("videosource4");
let videosource5 = document.getElementById("videosource5");

const allVideos = [
  videosource1,
  videosource2,
  videosource3,
  videosource4,
  videosource5,
];

function switchVideo(activeIndex) {
  allVideos.forEach((v, i) => {
    if (!v) return;
    if (i === activeIndex) {
      v.style.zIndex = "3";
      v.style.opacity = "1";
    } else {
      v.style.zIndex = "0";
      v.style.opacity = "0";
    }
  });
}

// Add CSS transition to videos
allVideos.forEach((v, i) => {
  if (!v) return;
  v.style.transition = "opacity 0.8s ease, z-index 0s";
  v.style.opacity = i === 0 ? "1" : "0";
  v.style.zIndex = i === 0 ? "3" : "0";
});

function setActiveMenu(el) {
  document
    .querySelectorAll(".menu")
    .forEach((m) => m.classList.remove("active"));
  if (el) el.classList.add("active");
}

function menu1(el) {
  switchVideo(0);
  setActiveMenu(el);
}
function menu2(el) {
  switchVideo(1);
  setActiveMenu(el);
}
function menu3(el) {
  switchVideo(2);
  setActiveMenu(el);
}
function menu4(el) {
  switchVideo(3);
  setActiveMenu(el);
}
function menu5(el) {
  switchVideo(4);
  setActiveMenu(el);
}

/* ===========================
   DESTINATION SLIDER (Box-3)
=========================== */
let next = document.getElementById("next");
let prev = document.getElementById("prev");
let box3 = document.querySelector(".box-3");
let listitem = document.querySelector(".box-3 .list");
let thumbnails = document.querySelector(".box-3 .thumbnails");
let currentSlideEl = document.getElementById("currentSlide");

let slideCount = 1;
const totalSlides = document.querySelectorAll(".box-3 .list .item").length;

function updateSlideCounter() {
  if (currentSlideEl) {
    currentSlideEl.textContent = String(slideCount).padStart(2, "0");
  }
}

if (next) {
  next.addEventListener("click", () => showslider("next"));
}
if (prev) {
  prev.addEventListener("click", () => showslider("prev"));
}

let runtimeout;

function showslider(type) {
  let itemslider = document.querySelectorAll(".box-3 .list .item");
  let itemthumbnail = document.querySelectorAll(".box-3 .thumbnails .item-01");

  if (type === "next") {
    listitem.appendChild(itemslider[0]);
    thumbnails.appendChild(itemthumbnail[0]);
    box3.classList.add("next");
    slideCount = slideCount >= totalSlides ? 1 : slideCount + 1;
  } else {
    let last = itemslider.length - 1;
    listitem.prepend(itemslider[last]);
    thumbnails.prepend(itemthumbnail[last]);
    box3.classList.add("prev");
    slideCount = slideCount <= 1 ? totalSlides : slideCount - 1;
  }

  updateSlideCounter();

  clearTimeout(runtimeout);
  runtimeout = setTimeout(() => {
    box3.classList.remove("next");
    box3.classList.remove("prev");
  }, 1000);
}

// Auto-advance slider every 5 seconds
let autoSlide = setInterval(() => {
  if (document.visibilityState === "visible") {
    showslider("next");
  }
}, 5000);

// Pause on user interaction
[next, prev].forEach((btn) => {
  if (btn) {
    btn.addEventListener("click", () => {
      clearInterval(autoSlide);
      autoSlide = setInterval(() => {
        if (document.visibilityState === "visible") showslider("next");
      }, 5000);
    });
  }
});

/* ===========================
   FORM VALIDATION
=========================== */
let id = (id) => document.getElementById(id);
let classes = (cls) => document.getElementsByClassName(cls);

let username = id("username"),
  email = id("email"),
  phone = id("phone"),
  form = id("form"),
  booksuccess = id("book-success"),
  errormsg = classes("error");

let successMsg = document.getElementById("success-msg");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let validName = engin(username, 0, "Name cannot be blank");
    let validEmail = engin(email, 1, "Please enter a valid email");
    let validPhone = engin(phone, 2, "Please enter a valid phone number");

    if (validName && validEmail && validPhone) {
      successMsg.innerText = `Hey ${username.value}, you're all booked! 🎉`;
      booksuccess.style.display = "flex";
      // Add fade-in effect
      booksuccess.style.animation = "popIn 0.4s ease";
    }
  });
}

let engin = (a, b, c) => {
  if (!a) return false;

  if (a.value === "") {
    a.classList.add("red-placeholder");
    a.style.border = "1px solid #ff6b6b";
    errormsg[b].innerHTML = "";
    return false;
  }

  if (a.value.trim() === "") {
    a.classList.remove("red-placeholder");
    errormsg[b].innerHTML = c;
    a.style.border = "1px solid #ff6b6b";
    return false;
  }

  errormsg[b].innerHTML = "";
  a.classList.remove("red-placeholder");
  a.style.border = "1px solid var(--gold)";
  return true;
};

const btnClose = document.getElementById("btn-close");
if (btnClose) {
  btnClose.addEventListener("click", function () {
    booksuccess.style.display = "none";
    if (form) form.reset();
    // Reset input borders
    [username, email, phone].forEach((inp) => {
      if (inp) inp.style.border = "1px solid rgba(255,255,255,0.1)";
    });
  });
}

/* ===========================
   OFFER / REVIEW SLIDER (Box-4)
=========================== */
let slider = document.querySelector(".overall-slider");
let rightBtn = document.querySelector(".angle-right");
let leftBtn = document.querySelector(".angle-left");
let dots = document.querySelectorAll(".dots-container i");

let offer = 0;

function updateDots() {
  dots.forEach((dot, i) => {
    dot.style.color = i === offer ? "var(--gold)" : "rgba(255,255,255,0.2)";
    dot.style.fontSize = i === offer ? "10px" : "7px";
  });
}

updateDots();

if (rightBtn) {
  rightBtn.addEventListener("click", function () {
    slider.style.transition =
      "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    slider.style.transform = "translateX(-100%)";

    setTimeout(function () {
      slider.style.transition = "none";
      slider.appendChild(slider.children[0]);
      slider.style.transform = "translateX(0)";
    }, 600);

    offer = (offer + 1) % dots.length;
    updateDots();
  });
}

if (leftBtn) {
  leftBtn.addEventListener("click", function () {
    slider.style.transition = "none";
    slider.prepend(slider.children[slider.children.length - 1]);
    slider.style.transform = "translateX(-100%)";

    setTimeout(function () {
      slider.style.transition =
        "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
      slider.style.transform = "translateX(0)";
    }, 20);

    offer = (offer - 1 + dots.length) % dots.length;
    updateDots();
  });
}

/* ===========================
   SUBSCRIBE
=========================== */
function subscribe() {
  let emailinput = document.getElementById("emailinput");
  if (!emailinput) return;

  if (emailinput.value.trim() === "") {
    emailinput.style.borderColor = "#ff6b6b";
    emailinput.placeholder = "Please enter your email!";
    setTimeout(() => {
      emailinput.style.borderColor = "rgba(201, 168, 76, 0.3)";
      emailinput.placeholder = "Enter your email address";
    }, 2500);
  } else {
    const btn = emailinput.nextElementSibling;
    if (btn) {
      btn.innerHTML = '<i class="fa-solid fa-check"></i>';
    }
    emailinput.value = "";
    emailinput.placeholder = "Successfully subscribed! ✓";
    setTimeout(() => {
      emailinput.placeholder = "Enter your email address";
      if (btn) btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i>';
    }, 3000);
  }
}

/* ===========================
   COUNTER ANIMATION (About)
=========================== */
const counters = document.querySelectorAll(".counter");
const section = document.getElementById("statsSection");

let started = false;

const observer = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting && !started) {
      started = true;
      counters.forEach((counter) => {
        const target = +counter.getAttribute("data-target");
        let count = 0;
        const increment = target / 120;

        const updateCount = () => {
          if (count < target) {
            count = Math.min(count + increment, target);
            counter.innerText =
              target >= 1000
                ? Math.ceil(count).toLocaleString()
                : Math.ceil(count);
            requestAnimationFrame(updateCount);
          } else {
            counter.innerText =
              target >= 1000 ? target.toLocaleString() : target;
          }
        };
        updateCount();
      });
    }
  },
  { threshold: 0.5 }
);

if (section) observer.observe(section);

/* ===========================
   SCROLL REVEAL (fade-in-right)
=========================== */
const fadeEls = document.querySelectorAll(".fade-in-right");

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

fadeEls.forEach((el) => fadeObserver.observe(el));

/* ===========================
   SMOOTH ANCHOR SCROLL
=========================== */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

/* ===========================
   NAV ACTIVE LINK ON SCROLL
=========================== */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".subnav a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((sec) => {
    const sectionTop = sec.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = sec.getAttribute("id");
    }
  });
  navLinks.forEach((link) => {
    link.style.color =
      link.getAttribute("href") === `#${current}`
        ? "var(--gold)"
        : "rgba(255,255,255,0.7)";
  });
});
