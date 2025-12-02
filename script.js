const apiKey = 'AIzaSyDhINIysJFvSenGKRx_f_qv9t_r4jBFeAs';
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

const promptInput = document.getElementById('prompt');
const generateBtn = document.getElementById('generate-btn');
generateBtn.addEventListener('click', () => {
    console.log(promptInput.value);
    const prompt = `Не отвечай словами, в ответ на мой вопрос я жду исключительно JSON массив из 5 цветов в формате HEX, которые по твоему мнению лучше всего подходят под это описание: ${promptInput.value}`;
    const requestBody = {
        contents: [
            {
                parts: [
                    { text: prompt } // Сюда подставится твой текст
                ]
            }
        ]
    };


    fetch(url, {
        method: 'POST', // Метод отправки
        headers: {
            'Content-Type': 'application/json' // Предупреждаем сервер, что шлем JSON
        },
        body: JSON.stringify(requestBody)
    })
        .then(response => response.json()) // 1. Превращаем ответ в понятные данные
        // .then(data => console.log(data))  // 2. Выводим результат в консоль

        .then(data => {
            console.log(data);
            const jsonString = data.candidates[0].content.parts[0].text;
            const cleanText = jsonString.replace(/```json|```/g, '');
            const colors = JSON.parse(cleanText);

            console.log(colors);

            const colorDivs = document.querySelectorAll('.palette-color');
            colors.forEach((color, index) => {
                colorDivs[index].style.backgroundColor = color;
            });
        })

});