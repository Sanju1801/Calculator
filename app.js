const BASE_URL = 'https://api.exchangerate-api.com/v4/latest';

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");



// Populate dropdowns and set default selections
for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

// Function to update exchange rate
const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  const URL = `${BASE_URL}/${fromCurr.value}`;
  try {
    let response = await fetch(URL);
    let data = await response.json();

    if (data && data.rates) {
      let rate = data.rates[toCurr.value];
      let finalAmount = amtVal * rate;
      msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
    } else {
      msg.innerText = "Error fetching exchange rate data.";
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    msg.innerText = "Error fetching exchange rate.";
  }
};

// Function to update flag image
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];

  if (countryCode) {
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    if (img) {
      img.src = newSrc;
    } else {
      img = document.createElement("img");
      img.src = newSrc;
      element.parentElement.appendChild(img);
    }
  } else {
    console.error(`No country code found for currency: ${currCode}`);
  }
};

// Event listener for button click
btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

// Initial setup on 