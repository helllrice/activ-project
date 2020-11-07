const popup = () => {
    const popup = document.getElementById('popup');
    const btn = document.getElementById('btn');
    const close = document.getElementById('popup__close');
    const wrapper = popup.querySelector('.popup__body')

    btn.onclick = function () {
        popup.style.display = "block";
    }

    close.onclick = function () {
        popup.style.display = "none";
    }

    wrapper.addEventListener('click', () => {
            popup.style.display = "none";
    });
};

export default popup