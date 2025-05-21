const text = document.getElementById("text-input");
const btn = document.getElementById("check-btn");
const result = document.getElementById("result");


const noText = () => {
  if(!text.value){
    alert("Please input a value");
    return;
  }
};

const cleanStr = text => {
  const temp = text.value.toLowerCase();
  const regex = /[^0-9A-Za-z]/g;
  const str = temp.replace(regex, "");
  console.log(str);
  return str;
}

const isPalindrome = str => {
  for(let i = 0; i<= str.length/2; i++){
    let j = str.length - i - 1;
    if(str[i] !== str[j]){
      return false;
    }
  }
  return true;
};

const displayResult = str => {
  if(isPalindrome(str)){
    result.innerText = `${text.value} is a palindrome`;
  }
  else{
    result.innerText = `${text.value} is not a palindrome`;
  }
  result.classList.remove("hide");
}

const print = () =>{
  console.log(text.value);
  console.log(text.value.length);
  if(isPalindrome(cleanStr(text))){
    console.log("yes");
  }else{
    console.log("no");
  }
  displayResult(cleanStr(text));
}

btn.addEventListener("click", noText);
btn.addEventListener("click", print);