import { event } from "jquery";

const popup = () => {
    const popup = document.getElementById('popup');
    const btn = document.getElementById('btn');
    const close = document.getElementById('popup__close');

    btn.onclick = function () {
        popup.style.display = "block";
    }

    close.onclick = function () {
        popup.style.display = "none";
    }

    window.addEventListener('click', (event) => {
        if (event.target == popup) {
            popup.style.display = "none";
        }
    });
};

export default popup