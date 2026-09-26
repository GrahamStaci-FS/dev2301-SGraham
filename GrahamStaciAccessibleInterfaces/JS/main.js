import sounds from "./sounds.js";
import keys from "./keys.js";

(() => {

    const board = document.querySelector("#board");
    const status = document.querySelector("#status");

    // Get the 3 buttons from the HTML
    let buttons = document.querySelectorAll(".sound");

    // Add the other 3 buttons with JavaScript
    sounds.slice(3).forEach(sound => {

        const button = document.createElement("button");

        button.classList.add("sound");
        button.type = "button";
        button.textContent = sound.name;
        button.setAttribute("aria-label", `Play ${sound.name}`);

        board.appendChild(button);
    });

    // Get  buttons
    buttons = document.querySelectorAll(".sound");

    // Play
    const play = button => {

        const index = Array.from(buttons).indexOf(button);
        const sound = sounds[index];

        const audio = new Audio(sound.file);

        audio.play();

        status.textContent = `${sound.name} is playing.`;
    };

    // Click
    buttons.forEach(button => {

        button.addEventListener("click", () => {
            play(button);
        });

    });

    // Keyboard
    keys(buttons, play);

})();