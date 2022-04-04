words = ['their', 'about', 'would', 'other', 'words', 'could', 'write', 'first', 'water', 'after', 'right', 'think', 'years', 'place', 'sound', 'great', 'found', 'those', 'under', 'might', 'while', 'house', 'world', 'below', 'asked', 'large', 'until', 'along', 'being', 'often', 'earth', 'began', 'since', 'study', 'night', 'light', 'above', 'parts', 'young', 'story', 'point', 'times', 'heard', 'whole', 'white', 'given', 'means', 'music', 'miles', 'thing', 'today', 'later', 'using', 'money', 'lines', 'group', 'among', 'learn', 'space', 'table', 'early', 'short', 'hands', 'black', 'shown', 'front', 'voice', 'kinds', 'makes', 'comes', 'close', 'power', 'lived', 'vowel', 'taken', 'built', 'heart', 'ready', 'quite', 'bring', 'round', 'horse', 'stand', 'birds', 'tried', 'least', 'field', 'whose', 'girls', 'third', 'hours', 'moved', 'plant', 'doing', 'names', 'forms', 'heavy', 'ideas', 'cried', 'begin']

var usedWords = []
if(localStorage.getItem('usedWords') != null){
    usedWords = JSON.parse(localStorage.getItem('usedWords'))
}

if(localStorage.getItem('words') != null){
    words = JSON.parse(localStorage.getItem('words'))
}

if(words.length == 1){
    words = usedWords
    usedWords = []
}

var random = Math.floor(Math.random() * (words.length - 0) + 0);
usedWords.push(words[random]);
var correctWord = words[random];
words.pop(random);

localStorage.setItem('words', JSON.stringify(words));
localStorage.setItem('usedWords', JSON.stringify(usedWords))

let keypad = document.getElementById('keypad');
let alphabets = [
    'A', 'B', 'C', 'D', 'E', 'F',
    'G', 'H', 'I', 'J', 'K', 'L', 'N', 'M',
    'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V',
    'W', 'X', 'Y', 'Z'
]
let qwerty = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
]
qwerty.forEach(r => {
    r.forEach(l => {
        keypad.innerHTML += `<span id=${l} style="display: inline-block; width: 2vw;">${l}</span>`
    })
    keypad.innerHTML += '<br><br>'
})
let currentInput = 1;
let attempt = 1;
let currentInputId = attempt.toString() + currentInput.toString();
const updateCurrentId = () => {
    currentInputId = attempt.toString() + currentInput.toString();
}
let status = "playing";

document.getElementById(currentInputId).focus();
document.getElementById(currentInputId).disabled = false;
window.addEventListener('keydown', (e) => {
    if (alphabets.includes(e.key.toUpperCase()) && status === "playing") {
        let input = document.getElementById(currentInputId);
        input.value = e.key.toUpperCase()
        if (currentInput != 5) {
            input.disabled = true
            currentInput++
            updateCurrentId()
            document.getElementById(currentInputId).disabled = false
            setTimeout(() => {
                document.getElementById(currentInputId).focus()
            }, 100)
        }
    } else if (e.keyCode == 8 && status === "playing") { // for backspace
        e.preventDefault()
        let input = document.getElementById(currentInputId);
        if (currentInput != 1 && input.value == '') {
            input.disabled = true
            currentInput--
            updateCurrentId()
            document.getElementById(currentInputId).disabled = false
            document.getElementById(currentInputId).value = ''
            setTimeout(() => {
                document.getElementById(currentInputId).focus()
            }, 100)
        } else {
            input.value = ''
        }
    } else if (e.keyCode == 13) { // on enter key
        if (currentInput == 5 && status == "playing" && document.getElementById(currentInputId).value != '') {
            // currentinput is 5
            // check if the input is correct
            let input1 = document.getElementById(attempt.toString() + '1')
            let input2 = document.getElementById(attempt.toString() + '2')
            let input3 = document.getElementById(attempt.toString() + '3')
            let input4 = document.getElementById(attempt.toString() + '4')
            let input5 = document.getElementById(attempt.toString() + '5')
            let word = input1.value + input2.value + input3.value + input4.value + input5.value
            setTimeout(() => {
                // check correctWord
                if (word == correctWord.toUpperCase()) {
                    [1,2,3,4,5].forEach(i => {
                        let input = document.getElementById(attempt.toString() + i.toString())
                        input.disabled = true
                        document.getElementById(input.value).style.backgroundColor = 'rgb(22, 225, 110)'
                        input.style.backgroundColor = 'rgb(22, 225, 110)'
                    })
                    status = "w"
                    setTimeout(() => {
                        alert('GAME OVER. YOU WON')
                        window.location.reload()
                    }, 100)
                }
                if (status != "w") {
                    // check letters of correctWord
                    [1,2,3,4,5].forEach(i => {
                        let input = document.getElementById(attempt.toString() + i.toString())
                        console.log(input.value);
                        if (input.value == correctWord[i-1].toUpperCase()) {
                            document.getElementById(input.value).style.backgroundColor = 'rgb(22, 225, 110)'
                            input.style.backgroundColor = 'rgb(22, 225, 110)'
                        } else {
                            if (correctWord.toUpperCase().split("").includes(input.value)) {
                                document.getElementById(input.value).style.backgroundColor = '#b59f3b'
                                input.style.backgroundColor = '#b59f3b'
                            } else {
                                document.getElementById(input.value).style.backgroundColor = '#3a3a3c'
                                input.style.backgroundColor = '#3a3a3c'
                            }
                        }
                    })
                    document.getElementById(currentInputId).disabled = true
                    if (attempt == 5) {
                        status = "l"
                        setTimeout(() => {
                            alert('GAME OVER. YOU LOST')
                        }, 100)
                    } else {
                        attempt++
                        currentInput = 1
                        updateCurrentId()
                        document.getElementById(currentInputId).disabled = false
                        setTimeout(() => {
                            document.getElementById(currentInputId).focus()
                        }, 100)
                    }
                }
            }, 100)
        }
    }
})