const ghostList = document.querySelector(".cards");
const evidenceList = document.getElementById("#evidence");
const active = "active";
const hidden = "hidden";
const dark = "dark";
const yesButtons = [...document.getElementsByClassName("yes")];
const noButtons = [...document.getElementsByClassName("no")];
const allButtons = yesButtons.concat(noButtons);

if (window.location.search == "?dark") {
    document.body.classList.add(dark);
}

allButtons.forEach(element => element.addEventListener("click", onClick));

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
}