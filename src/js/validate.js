"use strict";

const validate = () => {
    document.addEventListener('DomContentLoaded', function() {
        const form = document.getElementById('form');
        form.addEventListener('submit', formSend);

        async function formSend(e) {
            e.preventDefault();

            let error = formValidate(form);
        }

        
        function formValidate(form) {
            let error = 0;
            let formReq = document.querySelectorAll('._req');


            for (let index = 0; index < array.length; index++) {
                const input = formReq[index];

                if (input.classList.contains('_name')){
                    if (nameTest(input)) {
                        formAddError(input);
                        error++
                    }
                }else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
                    formAddError(input);
                    error++;
                }else{
                    if (input.value === '') {
                        formAddError(input);
                        error++;
                    }
                }
            }
        
        function formAddError(input) {
            input.parentElement.classList.add('_error');
            input.classList.add('_error');
        }

        function formRemoveError(input) {
            input.parentElement.classList.remove('_error');
            input.classList.remove('_error');
        }

        function nameTest(input) {
            let match = /^[а-яё]*$/i.test(str);
            return match;}
        }
    });
}

export default validate;