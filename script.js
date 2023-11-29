const fromSpanText = document.querySelector(".intro span.from");
const toSpanText = document.querySelector(".intro span.to");
const changeConverterBtn = document.querySelector(".change-converter");
const input = document.querySelector(".input input");
const output = document.querySelector(".output h3");
const inputLabel = document.querySelector(".input label");
let converterState = changeConverterBtn.dataset.to;

changeConverterBtn.onclick = () => {
  converterState = converterState == "binary" ? "decimal" : "binary";
  updateSpansText(converterState);
  console.log(converterState);
  inputLabel.innerHTML = `Enter ${fromSpanText.innerHTML}`;
};

function updateSpansText(to) {
  if (to == "decimal") {
    fromSpanText.innerHTML = "Binary";
    toSpanText.innerHTML = "Decimal";
    return;
  }
  fromSpanText.innerHTML = "Decimal";
  toSpanText.innerHTML = "Binary";
}

input.oninput = (e) => {
  const val = e.target.value;

  if (val == "") return updateOutputText("Write Something <span>:)</span>");

  if (isNaN(+val))
    return updateOutputText(`Write Any Vaild Base Number <span>:)</span>`);

  if (converterState == "binary") updateOutputText(convertToBin(val));
  if (converterState == "decimal") updateOutputText(convertToDec(val));
};

function updateOutputText(newText) {
  output.innerHTML = newText;
}
function updateInputLabel(newText) {
  inputLabel.innerHTML = newText;
}

function convertToBin(dec) {
  let bin = [];

  while (dec >= 1) {
    bin.push(dec % 2);
    dec = Math.floor(dec / 2);
  }
  bin = bin.reverse().join("");

  return bin;
}

function convertToDec(bin) {
  // Check if the number is a vaild binary number
  for (let i of bin) {
    if (!(+i == 0 || +i == 1)) return "Write Binary Number <span>:)</span>";
  }

  let powerOfTwo = 0;
  // Convert To Decimal
  const decimal = bin
    .split("")
    .reverse()
    .map((item) => item * Math.pow(2, powerOfTwo++))
    .reduce((i, current) => i + current, 0);

  return decimal;
}
