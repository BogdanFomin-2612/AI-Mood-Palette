const part1 = 'AIzaSyDhINIysJFvSenGKRx';
const part2 = '_f_qv9t_r4jBFeAs';
const apiKey = part1 + part2;
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

const promptInput = document.getElementById('prompt');
const generateBtn = document.getElementById('input-group__btn');

generateBtn.addEventListener('click', () => {
    console.log("Запрос отправлен:", promptInput.value);

    const prompt = `Не отвечай словами, в ответ на мой вопрос я жду исключительно JSON массив из 5 цветов в формате HEX, которые по твоему мнению лучше всего подходят под это описание: ${promptInput.value}`;

    const requestBody = {
        contents: [
            {
                parts: [
                    { text: prompt }
                ]
            }
        ]
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data); // Для проверки в консоли

            // 1. Распаковка ответа
            const jsonString = data.candidates[0].content.parts[0].text;
            const cleanText = jsonString.replace(/```json|```/g, ''); // Чистим от маркдауна
            const colors = JSON.parse(cleanText); // Превращаем в массив

            console.log("Полученные цвета:", colors);

            // 2. Красим карточки (Исправлен двойной цикл)
            const colorDivs = document.querySelectorAll('.palette-color');

            colors.forEach((color, index) => {
                const card = colorDivs[index];

                if (card) {
                    // Красим фон
                    card.style.backgroundColor = color;

                    // Пишем текст (код цвета)
                    card.innerText = color;

                    // Стили для текста (чтобы было красиво и читаемо)
                    card.style.display = 'flex';
                    card.style.alignItems = 'center';
                    card.style.justifyContent = 'center';
                    card.style.color = '#fff';
                    card.style.fontWeight = 'bold';
                    card.style.textShadow = '0 0 3px rgba(0,0,0,0.5)';
                }
            });

            // 3. Красим фон страницы
            const color1 = colors[0];
            const color4 = colors[4]; // Берем первый и последний для контраста

            document.body.style.background = `linear-gradient(45deg, ${color1}, ${color4})`;
            document.body.style.backgroundSize = '400% 400%'; // Исправил на 400% для плавности анимаций CSS
            document.body.style.height = '100vh';
            document.body.style.margin = '0';

            // 4. Красим кнопку (Исправлено: добавлены переменные)
            const btnColor1 = colors[1];
            const btnColor2 = colors[2];

            generateBtn.style.background = `linear-gradient(45deg, ${btnColor1}, ${btnColor2})`;
            generateBtn.style.color = '#fff';
        })
        .catch(error => console.error('Ошибка:', error)); // Добавил ловлю ошибок на всякий случай
});