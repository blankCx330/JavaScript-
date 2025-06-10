const numberInput = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");
const output = document.getElementById("output");

const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
const symbols = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
let result = "";

const clickBtn = () => {
  const inputInt = parseInt(numberInput.value);
  console.log(inputInt);
  if(inputInt <= 0){
    output.innerText = "Please enter a number greater than or equal to 1";
    return;
  }
  else if(!inputInt){
    output.innerText = "Please enter a valid number";
    return;
  }
  else if(inputInt >= 4000){
    output.innerText = "Please enter a number less than or equal to 3999";
    return;
  }

  output.innerHTML =`<p>${convert(inputInt)}</p>`;  
  result = "";
  numberInput.value = "";
};

const convert = input =>{
  let i = 0;
  while(input > 0 && i < 13){
    if(input >= values[i]){
      input -= values[i];
      result += symbols[i];
      console.log(result, values[i], "i=", i);
    }else{
      i++;
    }
  }
  return result;
};


convertBtn.addEventListener("click", clickBtn);
numberInput.addEventListener("keydown", e => {
  if(e.key === "Enter" && !e.repeat){
    clickBtn();
  }
});
