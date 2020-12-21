
const validate = () => {
        const form = document.getElementById('form'),
              name = document.querySelector('[name="name"]'),
              phone = document.querySelector('[name="phone"]'),
              com = document.querySelector('.input-comment'),
              inputs = document.querySelectorAll('[name]'),
              check = document.querySelectorAll('.form-check');



              
        const regExpPhone = /^([+]?[0-9\s-\(\)]{3,25})*$/i;

        const setError = (elem, message) => {
            elem.style.border = '1px solid red';
            elem.nextElementSibling.textContent = message;
            elem.nextElementSibling.classList.add('_active');
        } 

        const setSuccess = (elem) => {
            elem.nextElementSibling.classList.remove('_active');
        }

        const resetStyling = (elem) => {
            elem.style.border = '1px solid green';
            elem.nextElementSibling.classList.remove('_active');
        }

        const nameValidate = () => {
                
            const value = name.value;

            if(!value.trim().length){
                setError(name, 'поле не должно быть пустым');
                return;
            }

            if(value.trim().length < 3){
                setError(name, 'слишком короткое имя');
                return;
            }

            setSuccess(name);
            return true;
        }

        const phoneValidate = () => {

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
            return true;
        }

        const comValidate = () => {

            const value = com.value;

            if(!value.trim().length){
                setError(com, 'поле не должно быть пустым');
                return;
            }
            
            if(value.trim().length < 5){
                setError(com, 'слишком короткое сообщение');
                return;
            }

            setSuccess(com);
            return true;
        }


        

        const fieldsValidate = () => {
            let valide = true;
            if(!nameValidate()) {
                valide = false;
            }
            if(!phoneValidate()) {
                valide = false;
            }
            if(!comValidate()) {
                valide = false;
            }

            return valide;
        }


        name.addEventListener('input', () => resetStyling(name));
        phone.addEventListener('input', () => resetStyling(phone));
        com.addEventListener('input', () => resetStyling(com));

        name.addEventListener('blur', nameValidate);
        phone.addEventListener('blur', phoneValidate);
        com.addEventListener('blur', comValidate);
        
 
        const getMessage = {
            loading: 'Загрузка...',
            success: 'Валидация пройдена, отправка данных на почту!',
            failure: 'Что-то пошло не так...'
        };

        const postData = async (url, data) => {
            document.querySelectorAll('.status').textContent = getMessage.loading;
            let res = await fetch(url, {
                method: 'POST',
                body: data
            });

            return await res.text();
        };

        const closePopup = () => {
            popup.style.display = "none";
            document.getElementsByTagName("body")[0].style.overflow="auto";
        }
        

       const clearInputs = () => {
            inputs.forEach(item => {
                item.value = '';
                item.style.border = '';
            })
       }

        

        form.addEventListener('submit', (e) => {
                e.preventDefault();

                if(fieldsValidate()) {
                
                let statusMessage = document.createElement('div');
                statusMessage.classList.add('status');
                form.appendChild(statusMessage);

                const formData = new FormData(form);

                postData('server.php', formData)
                    .then(res => {
                        console.log(res);
                        statusMessage.textContent = getMessage.success
                    })
                    .catch(() => statusMessage.textContent = getMessage.failure)
                    .finally( () => {
                        setTimeout(() => {
                            closePopup();
                            statusMessage.remove();
                            clearInputs();
                        }, 3000);
                    })

                    
                    console.log('Валидация пройдена, отправка данных на сервер');
                } else {
                    console.log('Валидация не пройдена!')
                }

        });
         


        

            

}



export default validate;