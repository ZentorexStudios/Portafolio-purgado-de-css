const html = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const copyEmail = document.getElementById("copyEmail");
const year = document.getElementById("year");

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light" || savedTheme === "dark") {
    html.dataset.theme = savedTheme;
} else {
    html.dataset.theme = window.matchMedia(
        "(prefers-color-scheme: light)"
    ).matches ? "light" : "dark";
}

function updateThemeButton() {
    if (!themeToggle) return;

    const isLight = html.dataset.theme === "light";

    themeToggle.textContent = isLight ? "☀" : "☾";

    themeToggle.setAttribute(
        "aria-label",
        isLight
            ? "Cambiar a modo oscuro"
            : "Cambiar a modo claro"
    );
}

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const newTheme =
            html.dataset.theme === "light"
                ? "dark"
                : "light";

        html.dataset.theme = newTheme;

        localStorage.setItem(
            "portfolio-theme",
            newTheme
        );

        updateThemeButton();
    });
}

updateThemeButton();

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );
    });

    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );
        });
    });
}


const revealElements =
    document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        (entries, currentObserver) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add("visible");

                currentObserver.unobserve(
                    entry.target
                );
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach((element) => {
        observer.observe(element);
    });
} else {
    revealElements.forEach((element) => {
        element.classList.add("visible");
    });
}

if (year) {
    year.textContent = new Date().getFullYear();
}


if (copyEmail) {
    copyEmail.addEventListener("click", async () => {
        const emailElement = document.querySelector(
            ".contact-card .contact-value"
        );

        if (!emailElement) return;

        const email = emailElement.textContent.trim();

        try {
            await navigator.clipboard.writeText(email);

            copyEmail.textContent = "Correo copiado";

            setTimeout(() => {
                copyEmail.textContent = "Copiar correo";
            }, 1800);
        } catch {
            copyEmail.textContent = "No disponible";
        }
    });
}