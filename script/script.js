// Обработчик событий, который отслеживает загрузку контента
document.addEventListener('DOMContentLoaded', function(){
    const btnOpenModal = document.querySelector('#btnOpenModal');
    const modalBlock = document.querySelector('#modalBlock');
    const closeModal = document.querySelector('#closeModal');
    const questionTitle = document.querySelector('#question');
    const formAnswers = document.querySelector('#formAnswers');

    const nextButton = document.querySelector('#next');
    const prevButton = document.querySelector('#prev');

    const sendButton = document.querySelector('#send');

    // Объект содержащий вопросы и ответы
    const questions = [
        {
            question: "Какого цвета бургер?",
            answers: [
                {
                    title: 'Стандарт',
                    url: './image/burger.png'
                },
                {
                    title: 'Черный',
                    url: './image/burgerBlack.png'
                }
            ],
            type: 'radio'
        },
        {
            question: "Из какого мяса котлета?",
            answers: [
                {
                    title: 'Курица',
                    url: './image/chickenMeat.png'
                },
                {
                    title: 'Говядина',
                    url: './image/beefMeat.png'
                },
                {
                    title: 'Свинина',
                    url: './image/porkMeat.png'
                }
            ],
            type: 'radio'
        },
        {
            question: "Дополнительные ингредиенты?",
            answers: [
                {
                    title: 'Помидор',
                    url: './image/tomato.png'
                },
                {
                    title: 'Огурец',
                    url: './image/cucumber.png'
                },
                {
                    title: 'Салат',
                    url: './image/salad.png'
                },
                {
                    title: 'Лук',
                    url: './image/onion.png'
                }
            ],
            type: 'checkbox'
        },
        {
            question: "Добавить соус?",
            answers: [
                {
                    title: 'Чесночный',
                    url: './image/sauce1.png'
                },
                {
                    title: 'Томатный',
                    url: './image/sauce2.png'
                },
                {
                    title: 'Горчичный',
                    url: './image/sauce3.png'
                }
            ],
            type: 'radio'
        }
    ];

    // Обработчик события открытия модального окна
    btnOpenModal.addEventListener('click', () => {
        modalBlock.classList.add('d-block');
        playTest();
    });

    // Обработчик события открытия модального окна
    closeModal.addEventListener('click', () => {
        modalBlock.classList.remove('d-block');
    });
    // Обработчик события открытия модального окна (вне кнопки крестик)
    document.addEventListener('click', function(event){
        if(
            !event.target.closest('.modal-dialog') &&
            !event.target.closest('.openModalButton')
        ){
            modalBlock.classList.remove('d-block');
        }
    });

    // функция начала тестирования
    const playTest = () => {
        // переменная для ответов
        const finalAnswers = [];
        // переменная с номеров вопроса
        let numberQuestion = 0;
        // функция рендеринга ответов
        const renderAnswers = (index) => {

            // Через forEach
            questions[index].answers.forEach((answer, index, arr) => {
                const answerItem = document.createElement('div');

                answerItem.classList.add('answers-item', 'd-flex', 'justify-content-center');

                answerItem.innerHTML = `
                    <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none" value="${answer.title}">
                    <label for="${answer.title}" class="d-flex flex-column justify-content-between">
                    <img class="answerImg" src="${answer.url}" alt="burger">
                    <span>${answer.title}</span>
                    </label>
                `;

                formAnswers.appendChild(answerItem);
            })
        }
        // функция рендеринга вопросов + ответов
        const renderQuestions = (indexQuestion) => {
            formAnswers.innerHTML = '';

            if(numberQuestion >= 0 && numberQuestion  <= questions.length - 1){
                // Вызов вопроса
                questionTitle.textContent = `${questions[indexQuestion].question}`;
                // Вызов ответов
                renderAnswers(indexQuestion);

                nextButton.classList.remove('d-none');
                prevButton.classList.remove('d-none');
                sendButton.classList.add('d-none');
            }

            // убирает на первом вопросе кнопку назад
            if(numberQuestion === 0){
                prevButton.classList.add('d-none');
            }

            // убирает на последнем вопросе кнопку далее
            // if(numberQuestion === questions.length - 1){
            //     nextButton.classList.add('d-none');
            // }

            if(numberQuestion === questions.length){
                prevButton.classList.add('d-none');
                nextButton.classList.add('d-none');
                sendButton.classList.remove('d-none');
                formAnswers.innerHTML = `
                <div class="form-group">
                    <label for="numberPhone">Введите номер телефона</label>
                    <input type="tel" class="form-control" id="numberPhone">
                </div>
                `;
            }

            if(numberQuestion === questions.length + 1){
                formAnswers.textContent = "Спасибо за пройденный тест!";
                setTimeout(() => {
                    modalBlock.classList.remove('d-block');
                }, 2000);
            }
        }

        // запуск функции рендеринга
        renderQuestions(numberQuestion);

        const checkAnswer = () => {
            const obj = {};

            const inputs = [...formAnswers.elements].filter((input) => input.checked || input.id === 'numberPhone');
            inputs.forEach((input, index) => {
                if(numberQuestion >= 0 && numberQuestion <= questions.length - 1){
                    obj[`${index}_${questions[numberQuestion].question}`] = input.value;
                }

                if(numberQuestion === questions.length){
                    obj['Номер телефона'] = input.value;
                }
            })

            console.log(obj);
            finalAnswers.push(obj);
        }

        // обработчик событий кнопок вперед, назад
        nextButton.onclick = () => {
            checkAnswer();
            numberQuestion++;
            renderQuestions(numberQuestion);
        }
        prevButton.onclick = () => {
            numberQuestion--;
            renderQuestions(numberQuestion);
        }

        sendButton.onclick = () => {
            checkAnswer();
            numberQuestion++;
            renderQuestions(numberQuestion);

        }

        
    }
})