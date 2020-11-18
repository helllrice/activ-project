
const validate = () => {
        const form = document.querySelector('.popup__form'),
              name = document.querySelector('[name="name"]'),
              phone = document.querySelector('[name="phone"]'),
              com = document.querySelector('.input-comment');
              
        const regExpPhone = /^([+]?[0-9\s-\(\)]{3,25})*$/i;

        const setError = (elem, message) => {
            elem.style.border = '1px solid red';
            elem.nextElementSibling.textContent = message;
            elem.nextElementSibling.classList.add('_active');
        } 

        const setSuccess = (elem) => {
            elem.style.border = '1px solid green';
            elem.nextElementSibling.classList.remove('_active');
        }

        const resetStyling = (elem) => {
            elem.style.border = '';
            elem.nextElementSibling.classList.remove('_active');
        }

        name.addEventListener('input', () => resetStyling(name));
        phone.addEventListener('input', () => resetStyling(phone));
        com.addEventListener('input', () => resetStyling(com));

        name.addEventListener('blur',  (e) => {
            e.preventDefault();

            const value = name.value;

            if(!value.trim().length){
                setError(name, 'поле не должно быть пустым');
                return;
            }

            if(value.trim().length < 5){
                setError(name, 'слишком короткое имя');
                return;
            }

            setSuccess(name);

        });



        phone.addEventListener('blur', (e) => {
            e.preventDefault();

            const value = phone.value;

            if(!value.trim().length){
                setError(phone, 'поле не должно быть пустым');
                return;
            }

            if(!regExpPhone.test(value.trim())){
                setError(phone, 'телефон не валиден');
                return;
            }

            setSuccess(phone);

        });

        com.addEventListener('blur', (e) => {
            e.preventDefault();

            const value = com.value;

            if(!value.trim().length){
                setError(com, 'поле не должно быть пустым');
                return;
            }
            
            if(value.trim().length < 10){
                setError(com, 'слишком короткое сообщение');
                return;
            }

            setSuccess(com);


            


        });

        const fields = form.querySelectorAll('.field');

        

        form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                for (let i = 0; i < fields.length; i++) {
                    if(!fields[i].value == '') {
                        setSuccess(fields[i]);
                        return;
                    } else {
                        setError(com, 'поле не должно быть пустым');
                        setError(phone, 'поле не должно быть пустым');
                        setError(name, 'поле не должно быть пустым');
                    }

                    
                    
                    
                }
        })

         


        

            

}

export default validate;