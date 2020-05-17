document.addEventListener('DOMContentLoaded', function(){
    const btnOpenModal = document.querySelector('#btnOpenModal');
    const modalBlock = document.querySelector('#modalBlock');
    const closeModal = document.querySelector('#closeModal');
    const questionTitle = document.querySelector('#question');
    const formAnswers = document.querySelector('#formAnswers');

    const nextButton = document.querySelector('#next');
    const prevButton = document.querySelector('#prev');

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

    btnOpenModal.addEventListener('click', () => {
        modalBlock.classList.add('d-block');
        playTest();
    });

    closeModal.addEventListener('click', () => {
        modalBlock.classList.remove('d-block');
    });

    document.addEventListener('click', function(event){
        // console.log(event.target);
        if(
            !event.target.closest('.modal-dialog') &&
            !event.target.closest('.openModalButton')
        ){
            modalBlock.classList.remove('d-block');
        }
    });

    const playTest = () => {
        let numberQuestion = 0;
        const renderAnswers = (index) => {

            // Через forEach
            questions[index].answers.forEach((answer, index, arr) => {
                const answerItem = document.createElement('div');

                answerItem.classList.add('answers-item', 'd-flex', 'flex-column');

                answerItem.innerHTML = `
                    <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none">
                    <label for="${answer.title}" class="d-flex flex-column justify-content-between">
                    <img class="answerImg" src="${answer.url}" alt="burger">
                    <span>${answer.title}</span>
                    </label>
                `;

                formAnswers.appendChild(answerItem);
            })

            // Способ через for
            // for(i = 0; i < 2; i++){
            //     const answerItem = document.createElement('div');

            //     answerItem.classList.add('answers-item', 'd-flex', 'flex-column');

            //     answerItem.innerHTML = `
            //         <input type="radio" id="answerItem1" name="answer" class="d-none">
            //         <label for="answerItem1" class="d-flex flex-column justify-content-between">
            //         <img class="answerImg" src="${questions.answers[i].url}" alt="burger">
            //         <span>${questions.answers[i].title}</span>
            //         </label>
            //     `

            //     formAnswers.appendChild(answerItem);
            // }
        }
        const renderQuestions = (indexQuestion) => {
            formAnswers.innerHTML = '';
            // Вызов вопроса
            questionTitle.textContent = `${questions[indexQuestion].question}`;
            // Вызов ответов
            renderAnswers(indexQuestion);

            // formAnswers.innerHTML = `
            // <div class="answers-item d-flex flex-column">
            //     <input type="radio" id="answerItem1" name="answer" class="d-none">
            //     <label for="answerItem1" class="d-flex flex-column justify-content-between">
            //     <img class="answerImg" src="${questions.answers[0].url}" alt="burger">
            //     <span>${questions.answers[0].title}</span>
            //     </label>
            // </div>
            // <div class="answers-item d-flex justify-content-center">
            //     <input type="radio" id="answerItem2" name="answer" class="d-none">
            //     <label for="answerItem2" class="d-flex flex-column justify-content-between">
            //     <img class="answerImg" src="./image/burgerBlack.png" alt="burger">
            //     <span>Черный</span>
            //     </label>
            // </div>
            // `;
        }
        renderQuestions(numberQuestion);

        nextButton.onclick = () => {
            numberQuestion++;
            renderQuestions(numberQuestion);
        }
        prevButton.onclick = () => {
            numberQuestion--;
            renderQuestions(numberQuestion);
        }

        
    }
})