import validate from './validate'

const popup = () => {
    const popup = document.getElementById('popup');
    const btn = document.getElementById('btn');
    const close = document.getElementById('popup__close');

    btn.onclick = function () {
        popup.style.display = "block";
        document.getElementsByTagName("body")[0].style.overflow="hidden";
    }

    close.onclick = function () {
        popup.style.display = "none";
        document.getElementsByTagName("body")[0].style.overflow="auto";
    }

    window.addEventListener('click', (event) => {
        if (event.target == popup) {
            popup.style.display = "none";
            document.getElementsByTagName("body")[0].style.overflow="auto";
        }
    });

};

export default popup