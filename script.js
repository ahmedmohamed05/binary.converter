const fromSelect = document.getElementById("from");
const toSelect = document.getElementById("to");
const input = document.querySelector(".input input");
const conversionBtn = document.querySelector(".input button");
const output = document.querySelector(".output h3");

const conversionState = { from: 10, to: 2 };

fromSelect.addEventListener("change", changeConersionState);
toSelect.addEventListener("change", changeConersionState);

// TODO: add conversion steps

conversionBtn.onclick = (e) => {
  const val = input.value;

  if (val == "") {
    return updateOutputText("Write Something <span>:)</span>");
  }

  if (isNaN(+val)) {
    return updateOutputText(`Write Any Vaild Base Number <span>:)</span>`);
  }

  if (!isVaildNBaseNumber(val, conversionState.from)) {
    return updateOutputText(
      "Write a vaild number from this base<span>:)</span>"
    );
  }

  convertNumbers(val, conversionState.from, conversionState.to);
};

function updateOutputText(newText) {
  output.innerHTML = newText;
}

function changeConersionState(e) {
  const select = e.target;

  const selectedValue = select.options[select.selectedIndex].value;

  if (select.name == "from") {
    conversionState.from = selectedValue;
  } else {
    conversionState.to = selectedValue;
  }
}

function convertDecimalToNBase(decimal, newBase) {
  let result = [];

  while (decimal >= 1) {
    result.push(decimal % newBase);
    decimal = Math.floor(decimal / newBase);
  }
  result = result.reverse().join("");

  return result;
}

function convertNBaseToDecimal(n, base) {
  let power = 0;

  // Convert To Decimal
  const decimal = n
    .split("")
    .reverse()
    .map((item) => item * Math.pow(base, power++))
    .reduce((i, current) => i + current, 0);

  return decimal;
}

function convertNumbers(n, from, to) {
  const decimal = convertNBaseToDecimal(n, from);
  const result = convertDecimalToNBase(decimal, to);
  updateOutputText(result);
}

// Check if the number is a vaild number
function isVaildNBaseNumber(n, base) {
  for (let i of n) {
    if (!(0 <= +i && +i <= base)) return false;
  }
  return true;
}
