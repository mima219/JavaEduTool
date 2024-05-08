/*
    author: Michaela Jalakšová
    date: May 2024
    description: custom javascript for the application
*/

$('p code').each(function(i, inline) {
   hljs.highlightElement(inline);
 });

hljs.configure({
  noHighlightRe: /^<sellect>(.*)<\/sellect>$/i,
});

/* Function for removing whitespace at the start of code block
https://stackoverflow.com/questions/31753617/how-can-i-remove-leading-whitespace-in-my-pre-code-block-without-removing-in
 */
$("pre code").each(function(){
    var html = $(this).html();
    var pattern = html.match(/\s*\n[\t\s]*/);
    $(this).html(html.replace(new RegExp(pattern, "g"),'\n'));
});



/*---------------------- Tests -----------------------------------------------*/
const testBox = document.querySelector('.test-box');
const resultBox = document.querySelector('.result-box');
const optionList = document.querySelector('.option-list');
const whyCollapse = document.querySelector('.why');

let questionCount = 0;
let questionNum = 1;
let userScore = 0;
let testData;

let testBasic, testCommon, testGuidelines = false;


function deactivate(element){
    if (element.classList.contains('active')) {
        element.classList.remove('active');
    }
}


function resetTestVal() {
    questionCount = 0;
    questionNum = 1;
    userScore = 0;
    deactivate(whyCollapse);
}


function startTest() {
    resetTestVal();
    showQuestion(questionCount);
    questionCounter(questionNum);
    deactivate(resultBox);
    headerScore();
}


function guidelinesClick() {
    testData = guidesData;
    testGuidelines = true;
    testBasic = false;
    testCommon = false;
    const testTitle = document.querySelector('.test-title');
    testTitle.textContent = `Guidelines and Standards Test`;
    testBox.classList.add('active');
    startTest();
}

function basicsClick() {
    testData = basicsData;
    testBasic = true;
    testGuidelines = false;
    testCommon = false;
    const testTitle = document.querySelector('.test-title');
    testTitle.textContent = `Basics Test`;
    testBox.classList.add('active');
    startTest();
}


function commonClick() {
    testData = commonData;
    testCommon = true;
    testBasic = false;
    testGuidelines = false;
    const testTitle = document.querySelector('.test-title');
    testTitle.textContent = `Common Vulnerabilities Test`;
    testBox.classList.add('active');
    startTest();
}


function nextClick() {
    deactivate(whyCollapse);

    if (questionCount < testData.length - 1) {
        questionCount++;
        showQuestion(questionCount);

        questionNum++;
        questionCounter(questionNum)
    }
    else {
        console.log('Test completed');
        showResultBox();
    }
}


function tryAgainClick() {
    testBox.classList.add('active');
    startTest();
}


function cancelClick() {
    resultBox.classList.remove('active');
    resetTestVal();
}


function saveClick() {
    let finalScore = Math.round((userScore/testData.length) * 100);
    let finalTitle;
    // which test
    if (testBasic) {
        finalTitle = 'Basics';
    }
    else if (testCommon) {
        finalTitle = 'Common Vulnerabilities';
    }
    else if (testGuidelines) {
        finalTitle = 'Guidelines and Standards';
    }
    else {
        console.log('error: no test chosen');
    }

    //save
    let testFinalVal = [
        {title: finalTitle, score: finalScore},
    ]

    // Create an AJAX request to send the test data to the Django backend
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/save_test_data/', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    // Add CSRF token to request headers
    xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            console.log('Test data saved successfully!');
        }
    };
    xhr.send(JSON.stringify({ tests_values: testFinalVal }));
}


// Get CSRF token from the cookie
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


function showQuestion(index) {
    const questionText = document.querySelector(".question-text");
    questionText.textContent = `${testData[index].number}. ${testData[index].question}`;

    optionList.innerHTML = `<div class="option"><span>${testData[index].options[0]}</span></div>
                            <div class="option"><span>${testData[index].options[1]}</span></div>
                            <div class="option"><span>${testData[index].options[2]}</span></div>
                            <div class="option"><span>${testData[index].options[3]}</span></div>`;

    const option = document.querySelectorAll('.option');
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute('onClick', 'optionSelected(this)');
    }

}

function optionSelected(answer) {
    let userAnswer = answer.textContent;
    let correctAnswer = testData[questionCount].answer;
    let allOptions = optionList.children.length;

    if (userAnswer === correctAnswer) {
        answer.classList.add('correct');
        userScore++;
        headerScore();
    }
    else {
        answer.classList.add('incorrect');

        //select correct answer
        for (let i = 0; i < allOptions; i++) {
            if (optionList.children[i].textContent === correctAnswer) {
                optionList.children[i].setAttribute('class', 'option correct');
            }
        }

        if (testCommon) {
            whyCollapse.classList.add('active');
            whyCollapse.textContent = `${testData[questionCount].why}`;
        }
    }

    // disable options after answering
    for (let j = 0; j < allOptions; j++) {
        optionList.children[j].classList.add('disabled');
    }
}


function questionCounter(i) {
    const total = document.querySelector('.question-total')
    total.textContent = `${i} of ${testData.length} Questions`;
}

function headerScore() {
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userScore}/${testData.length}`;
}

function showResultBox() {
    testBox.classList.remove('active');
    resultBox.classList.add('active');

    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `${userScore} out of ${testData.length}`;

    const progressValue = document.querySelector('.progress-val');
    const progressCircle = document.querySelector('.progress-circle');

    let progressStart = -1;
    let progressEnd = Math.round((userScore/testData.length) * 100);
    let progress = setInterval(() => {
        progressStart += 1;
        progressValue.textContent = `${progressStart}%`;
        progressCircle.style.background = `conic-gradient(rgb(231,85,22) ${progressStart * 3.6}deg, rgba(255,255,255,0.5) 0deg)`;
        if (progressStart === progressEnd) {
            clearInterval(progress);
        }
    }, 20);
}

/*----------------------------------------- Excercises ---------------------------------------------------------*/

    function evalSelect(selectId, correctVal) {
        const selectElement = document.getElementById(selectId);
        const selectedVal = selectElement.value;

        if (selectedVal === correctVal) {
            selectElement.classList.add('correct');
            selectElement.classList.remove('incorrect');
        } else {
            selectElement.classList.add('incorrect');
            selectElement.classList.remove('correct');
        }
    }


    function evalSelect2(selectId1, correctVal1, correctVal2, selectId2, correctVal3) {
        const selectElement1 = document.getElementById(selectId1);
        const selectedVal1 = selectElement1.value;
        const selectElement2 = document.getElementById(selectId2);
        const selectedVal2 = selectElement2.value;

        if (selectedVal2 === correctVal3) {
            selectElement2.classList.add('correct');
            selectElement2.classList.remove('incorrect');

            if (selectedVal1 === correctVal1 || selectedVal1=== correctVal2) {
                selectElement1.classList.add('correct');
                selectElement1.classList.remove('incorrect');
            } else {
                selectElement1.classList.add('incorrect');
                selectElement1.classList.remove('correct');
            }
        } else {
            selectElement2.classList.add('incorrect');
            selectElement2.classList.remove('correct');
            selectElement1.classList.add('incorrect');
            selectElement1.classList.remove('correct');
        }
    }