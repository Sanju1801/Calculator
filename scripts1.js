let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');

let string = "";
let arr = Array.from(buttons);

// Button click functionality
arr.forEach(btn => {
    btn.addEventListener('click', (e) => {
        handleButtonPress(e.target.innerHTML);
    });
});

// Keyboard functionality
document.addEventListener('keydown', (e) => {
    const key = e.key;

    // Mapping keys to corresponding button actions
    if (/\d/.test(key) || ['+', '-', '*', '/','.'].includes(key)) {     // checks if pressed key is digit or operator
        handleButtonPress(key);
    } else if (key === 'Enter') {
        handleButtonPress('=');
    } else if (key === 'Backspace') {
        handleButtonPress('DEL');
    }
});

// Function to handle button presses
function handleButtonPress(value) {
    if (value === '=') {
        try {
            string = eval(string);
        } catch {
            string = "";
        }
        input.value = string;
    } 
    else if (value === 'AC') {
        string = "";
        input.value = string;
    } 
    else if (value === 'DEL') {
        string = string.substring(0, string.length - 1);
        input.value = string;
    }
    else if (value === 'Age') {
        document.querySelector('.calculator').style.display = 'none';
        document.querySelector('.ageCalculator').style.display = 'block';
    } 
    else if (value === 'Currency') {
        document.querySelector('.calculator').style.display = 'none';
        document.querySelector('.currency').style.display = 'block';
    } 
    else {
        string += value;
        input.value = string;
    }
    adjustFontSize();
}

// Function to adjust font size
function adjustFontSize() {
    if (string.length >= 20) {
        input.style.fontSize = '16px'; // Smaller font size
    }
    else if (string.length > 10) {
        input.style.fontSize = '30px'; // Smaller font size
    }
    else {
        input.style.fontSize = '40px'; // Original font size
    }
}
