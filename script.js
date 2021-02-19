const ghostList = document.querySelector(".cards");
const evidenceElements = [...document.querySelectorAll("tr")];
const active = "active";
const hidden = "hidden";
const dark = "dark";
const always = "always";
const never = "never";
const yesButtons = [...document.getElementsByClassName("yes")];
const noButtons = [...document.getElementsByClassName("no")];
const allButtons = yesButtons.concat(noButtons);

if (window.location.search == "?dark") {
    document.body.classList.add(dark);
}

allButtons.forEach(element => element.addEventListener("click", onClick));
update();

function onClick(event) {
    document.body.classList.add(hidden);
    toggleEvidence(event.target);
    update();
    document.body.classList.remove(hidden);
}

function toggleEvidence(element) {
    if (element.classList.contains(active)) {
        element.classList.remove(active);
        return;
    }

    [...element.parentElement.children].forEach(element => element.classList.remove(active));
    element.classList.add(active);
}

function update() {
    [...ghostList.querySelectorAll(".cards .hidden")].forEach(element => element.classList.remove(hidden));
    [...ghostList.querySelectorAll(".cards .active")].forEach(element => element.classList.remove(active));
    const ghosts = [...ghostList.children];

    const noEvidence = [...document.querySelectorAll("#evidence .no.active")].map(element => element.parentElement.id);
    noEvidence.forEach(evidence => {
        for (i = ghosts.length - 1; i > -1; --i) {
            const ghost = ghosts[i];
            const element = ghost.querySelector("." + evidence);
            if (element !== null) {
                ghost.classList.add(hidden);
                ghosts.splice(i, 1);
            }
        }
    });

    const yesEvidence = [...document.querySelectorAll("#evidence .yes.active")].map(element => element.parentElement.id);
    yesEvidence.forEach(evidence => {
        for (i = ghosts.length - 1; i > -1; --i) {
            const ghost = ghosts[i];
            const element = ghost.querySelector("." + evidence);
            if (element !== null) {
                element.classList.add(active);
            }
            else {
                ghost.classList.add(hidden);
                ghosts.splice(i, 1);
            }
        };
    });

    evidenceElements.forEach(element => {
        element.classList.remove(always);
        element.classList.remove(never);
        element.querySelector(".chance").innerText = "0%";
    });

    if (ghosts.length > 0) {
        evidenceElements.forEach(element => {
            const evidenceClass = element.id;
            const possible = [...ghostList.querySelectorAll(".card:not(.hidden) ." + evidenceClass)].length;
            const chance = Math.round(100 * (possible / ghosts.length));
            if (chance === 0) {
                element.classList.add(never);
            }
            else if (chance === 100) {
                element.classList.add(always);
            }
            element.querySelector(".chance").innerText = chance + "%";
        });
    }
}