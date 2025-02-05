const apiUrl = "https://script.google.com/macros/s/AKfycbzHoUqlQ5YIsTsyOCsTc54kXIBd9dWckCRFn2i1VuemzKZq5RygxxsBnXSJ83v1mfPz/exec"; // ← 取得したAPI URL

let quizData = [];
let currentQuestionIndex = 0;

// APIからデータを取得
async function fetchQuizData() {
    try {
        const response = await fetch(apiUrl);
        quizData = await response.json();
        console.log("取得したデータ:", quizData); // デバッグ用
        startQuiz();
    } catch (error) {
        console.error("データの取得に失敗しました", error);
    }
}

// クイズを開始
function startQuiz() {
    if (quizData.length > 0) {
        currentQuestionIndex = 0;
        showQuestion();
    } else {
        console.error("クイズデータがありません");
    }
}

// クイズの問題を表示
function showQuestion() {
    const questionData = quizData[currentQuestionIndex];
    document.getElementById("question").innerText = `「${questionData.country}」の首都は？`; // 国名を表示
    document.getElementById("flag").src = questionData.flag; // 国旗を表示

    const choicesContainer = document.getElementById("choices");
    choicesContainer.innerHTML = "";

    questionData.choices.forEach(choice => {
        const button = document.createElement("button");
        button.innerText = choice;
        button.classList.add("choice-button");
        button.onclick = () => checkAnswer(choice, questionData.answer);
        choicesContainer.appendChild(button);
    });
}

// 回答をチェック
function checkAnswer(selectedChoice, correctAnswer) {
    if (selectedChoice === correctAnswer) {
        alert("正解！🎉");
    } else {
        alert(`不正解…😢 正解は「${correctAnswer}」です`);
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        showQuestion();
    } else {
        alert("クイズ終了！お疲れ様でした 🎉");
    }
}

// 初期化
fetchQuizData();
