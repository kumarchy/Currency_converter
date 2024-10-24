let dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("form button");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
for (let select of dropdowns) {
  for (Currcode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = Currcode;
    newOption.value = Currcode;
    if (select.name === "from" && Currcode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && Currcode === "NPR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlage(evt.target);
  });
}

// to change the country flage as we change in the counrty name
const updateFlage = (element) => {
  var currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(".money input");
  let amtVal = amount.value;
  console.log(amtVal);
  if (amtVal < 1 || amtVal === "") {
    amtVal = 1;
    amount.value = "1";
  }
  let url =
    "https://api.currencyapi.com/v3/latest?apikey=cur_live_OKUJ6kld84coitit9Ia3aJItwzhrdAiWekUAvYXL&base_currency=" +
    fromCurr.value;
  let response = await fetch(url);
  let apiData = await response.json();
  const data = apiData.data;
  const from = data[fromCurr.value].value;
  const to = data[toCurr.value].value;
  const totaAmount = amtVal * (to / from);
  let message = document.querySelector(".msg");
  message.innerText = `${amtVal} ${fromCurr.value} = ${totaAmount.toFixed(2)} ${
    toCurr.value
  }`;
});
