const keys = (buttons, play) => {

    document.addEventListener("keydown", event => {

        let index = Array.from(buttons).indexOf(document.activeElement);

        // Number keys
        if (event.key >= "1" && event.key <= "6") {

            const number = Number(event.key) - 1;

            if (buttons[number]) {
                buttons[number].focus();
                play(buttons[number]);
            }
        }

        // Right or down arrow
        if (event.key === "ArrowRight" || event.key === "ArrowDown") {

            event.preventDefault();

            let next = index + 1;

            if (next >= buttons.length) {
                next = 0;
            }

            buttons[next].focus();
        }

        // Left or up arrow
        if (event.key === "ArrowLeft" || event.key === "ArrowUp") {

            event.preventDefault();

            let prev = index - 1;

            if (prev < 0) {
                prev = buttons.length - 1;
            }

            buttons[prev].focus();
        }

        // Enter or Space
        if (
            (event.key === "Enter" || event.key === " ") &&
            document.activeElement.classList.contains("sound")
        ) {
            event.preventDefault();
            play(document.activeElement);
        }

    });

};

export default keys;