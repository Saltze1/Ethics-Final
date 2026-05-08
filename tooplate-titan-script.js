const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileNav = document.getElementById("mobileNav");

if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener("click", function () {
        mobileMenuBtn.classList.toggle("active");
        mobileNav.classList.toggle("active");

        const expanded = mobileMenuBtn.classList.contains("active");
        mobileMenuBtn.setAttribute("aria-expanded", expanded);
    });
}

document.querySelectorAll(".mobile-nav a").forEach(function (link) {
    link.addEventListener("click", function () {
        mobileMenuBtn.classList.remove("active");
        mobileNav.classList.remove("active");
        mobileMenuBtn.setAttribute("aria-expanded", "false");
    });
});

document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (event) {
        const targetId = this.getAttribute("href");
        const target = document.querySelector(targetId);

        if (target) {
            event.preventDefault();
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});

window.addEventListener("scroll", function () {
    const navbar = document.getElementById("navbar");

    if (window.scrollY > 100) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px"
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, observerOptions);

document.querySelectorAll(".fade-in").forEach(function (element) {
    observer.observe(element);
});

function updateActiveMenuItem() {
    const sections = document.querySelectorAll("section[id]");
    const scrollY = window.pageYOffset;

    sections.forEach(function (section) {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 120;
        const sectionId = section.getAttribute("id");

        const desktopLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
        const mobileLink = document.querySelector(`.mobile-nav a[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll(".nav-links a").forEach(function (item) {
                item.classList.remove("active");
            });

            document.querySelectorAll(".mobile-nav a").forEach(function (item) {
                item.classList.remove("active");
            });

            if (desktopLink) {
                desktopLink.classList.add("active");
            }

            if (mobileLink) {
                mobileLink.classList.add("active");
            }
        }
    });
}

window.addEventListener("scroll", updateActiveMenuItem);
window.addEventListener("load", updateActiveMenuItem);

const filterButtons = document.querySelectorAll(".timeline-filter");
const timelineItems = document.querySelectorAll(".timeline-item");

filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const filterValue = button.getAttribute("data-filter");

        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        timelineItems.forEach(function (item) {
            const category = item.getAttribute("data-category");

            if (filterValue === "all" || category === filterValue) {
                item.style.display = "grid";
            } else {
                item.style.display = "none";
            }
        });
    });
});

const quizForm = document.getElementById("aiQuiz");
const quizResult = document.getElementById("quizResult");

if (quizForm && quizResult) {
    quizForm.addEventListener("submit", function (event) {
        event.preventDefault();

        let score = 0;
        const totalQuestions = 3;

        const q1 = document.querySelector('input[name="q1"]:checked');
        const q2 = document.querySelector('input[name="q2"]:checked');
        const q3 = document.querySelector('input[name="q3"]:checked');

        if (!q1 || !q2 || !q3) {
            quizResult.textContent = "Please answer all 3 questions before checking your score.";
            return;
        }

        if (q1.value === "correct") {
            score++;
        }

        if (q2.value === "correct") {
            score++;
        }

        if (q3.value === "correct") {
            score++;
        }

        if (score === totalQuestions) {
            quizResult.textContent = `You got ${score}/${totalQuestions}. Nice work. You understood the main ideas.`;
        } else if (score === 2) {
            quizResult.textContent = `You got ${score}/${totalQuestions}. Pretty good. Review one section and try again.`;
        } else {
            quizResult.textContent = `You got ${score}/${totalQuestions}. Go back through the website and check the main points.`;
        }
    });
}

const notesBox = document.getElementById("reflectionNotes");
const saveNotesButton = document.getElementById("saveNotes");
const clearNotesButton = document.getElementById("clearNotes");
const notesStatus = document.getElementById("notesStatus");

if (notesBox) {
    const savedNotes = localStorage.getItem("aiYouthReflectionNotes");

    if (savedNotes) {
        notesBox.value = savedNotes;
    }
}

if (saveNotesButton && notesBox && notesStatus) {
    saveNotesButton.addEventListener("click", function () {
        localStorage.setItem("aiYouthReflectionNotes", notesBox.value);
        notesStatus.textContent = "Your notes were saved in this browser.";
    });
}

if (clearNotesButton && notesBox && notesStatus) {
    clearNotesButton.addEventListener("click", function () {
        notesBox.value = "";
        localStorage.removeItem("aiYouthReflectionNotes");
        notesStatus.textContent = "Your notes were cleared.";
    });
}