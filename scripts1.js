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
    else if (value === 'BMI') {
        document.querySelector('.calculator').style.display = 'none';
        document.querySelector('.bmiCalculator').style.display = 'block';
        bmiCalculator();
    }
    else if (value === 'Back') {
        document.querySelector('.bmiCalculator').style.display = 'none';
        document.querySelector('.calculator').style.display = 'block';
    }
    else if (value === 'Currency') {
        document.querySelector('.calculator').style.display = 'none';
        document.querySelector('.container').style.display = 'block';
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

function bmiCalculator(){
    let bmiButton = document.getElementById('bmiBtn');
    

    bmiButton.addEventListener('click', () => {
        const height = parseInt(document.getElementById("height").value);
        const weight = parseInt(document.getElementById("weight").value);
        const result = document.getElementById("bmiOutput");

        let height_status = false, weight_status = false;

        if(height === "" || isNaN(height) || (height <= 0)){
            document.getElementById("height_error").innerHTML = "Invalid Height";
        }else{
            document.getElementById('height_error').innerHTML = '';
            height_status = true;
        }

        if(weight === "" || isNaN(weight) || (weight <= 0)){
            document.getElementById("weight_error").innerHTML = "Invalid Weight";
        }else{
            document.getElementById('weight_error').innerHTML = '';
            weight_status = true;
        }

        if(height_status && weight_status){
            const bmi = (weight / ((height * height)/10000)).toFixed(2);

            if(bmi < 10.6){
                result.innerHTML = 'Under weight : ' + bmi;
            }
            else if(bmi >= 18.6 && bmi <= 24.9){
                result.innerHTML = 'Normal : ' + bmi;
            }
            else{
                result.innerHTML = 'Over weight : ' + bmi;
            }

            result.style.display = "block";
        }
        else{
            alert('The form has errors');
        }
    });
}


