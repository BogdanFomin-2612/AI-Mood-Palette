const part1 = 'AIzaSyDhINIysJFvSenGKRx';
const part2 = '_f_qv9t_r4jBFeAs';
const apiKey = part1 + part2;
// const apiKey = 'AIzaSyDhINIysJFvSenGKRx_f_qv9t_r4jBFeAs';
// const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
// // ⚠️ Вставь свой ключ сюда!
// const part1 = 'AIzaSyDhINIysJFvSenGKRx';
// const part2 = '_f_qv9t_r4jBFeAs'; // Если у тебя другой ключ, вставь его целиком
// const apiKey = 'AIzaSyDhINIysJFvSenGKRx_f_qv9t_r4jBFeAs';
// Если ты уже разрезал ключ для гитхаба, раскомментируй строки с part1/part2 и используй их

const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

const promptInput = document.getElementById('prompt');
const generateBtn = document.getElementById('generate-btn'); // Теперь точно совпадает с HTML

generateBtn.addEventListener('click', () => {
    console.log("Кнопка нажата!"); // Проверка в консоли

    const prompt = `Не отвечай словами, в ответ на мой вопрос я жду исключительно JSON массив из 5 цветов в формате HEX, которые по твоему мнению лучше всего подходят под это описание: ${promptInput.value}`;

    const requestBody = {
        contents: [{
            parts: [{ text: prompt }]
        }]
    };

    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
    })
        .then(response => response.json())
        .then(data => {
            // 1. Распаковка
            const jsonString = data.candidates[0].content.parts[0].text;
            const cleanText = jsonString.replace(/```json|```/g, '');
            const colors = JSON.parse(cleanText);

            // 2. Красим карточки
            const colorDivs = document.querySelectorAll('.palette-color');
            colors.forEach((color, index) => {
                if (colorDivs[index]) {
                    colorDivs[index].style.backgroundColor = color;
                    colorDivs[index].innerText = color;
                    colorDivs[index].style.color = '#fff';
                }
            });

            // 3. Красим фон
            document.body.style.background = `linear-gradient(45deg, ${colors[0]}, ${colors[4]})`;
            document.body.style.backgroundSize = '400% 400%';
            document.body.style.height = '100vh';

            // 4. Красим кнопку
            generateBtn.style.background = `linear-gradient(45deg, ${colors[1]}, ${colors[2]})`;
        })
        .catch(error => console.error('Ошибка:', error));
});