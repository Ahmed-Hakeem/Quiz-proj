Result = document.getElementById("result");
emoj = document.getElementById("image");

current = JSON.parse(window.localStorage.current);
var passed = current.passed;
var score = current.score;
var answersCheck = current.answersCheck;
if (passed == true) {
  emoj.src = "pass.png";
} else if (passed == false) {
  emoj.src = "fail1.png";
}

Result.textContent = ".." + score;

var answersCheckLIst = document.getElementById("answersCheck");

console.log(answersCheck);
for (i = 0; i < answersCheck.length; i++) {
  var node = document.createElement("li"); // Create a <li> node
  var textnode = document.createTextNode(`Question ${i}:  ${answersCheck[i]}`); // Create a text node
  node.appendChild(textnode);
  answersCheckLIst.appendChild(node);
}
