var questions = ["sum 1 + 2", "sum 2 + 3", "sum 3 + 4", "sum 4 + 5"];
var answers = [
  ["3", "4", "5"],
  ["11", "40", "5"],
  ["67", "7", "25"],
  ["9", "0", "10"],
];

$("#nOfQuestions").text("Of " + (questions.length - 1));
$("#currentQuestionIndex").text(0);
// var prev = document.getElementById("prev");
// var next = document.getElementById("next");

var prev = document.getElementsByClassName("nextPrevButtons")[0];
var next = document.getElementsByClassName("nextPrevButtons")[1];

var tques = document.getElementsByClassName("question")[0];
var count = 0;
var count1 = 0;

var tans = document.getElementsByClassName("answersContent");
(function initiate() {
  tques.textContent = "";
  tques.textContent = questions[count];
  for (var i = 0; i < answers[count1].length; i++) {
    tans[i].textContent = "";
    tans[i].textContent = answers[count1][i];
  }
})();

next.addEventListener("click", function () {
  getAnswers();

  if (count < 0) count = 0;
  if (count < questions.length) {
    count++;

    if (count == questions.length) {
      --count;
    }
    tques.textContent = "";
    tques.textContent = questions[count];
  }

  // if (count1 < 0) count1 = 0;

  for (var i = 0; i < answers[0].length; i++) {
    tans[i].textContent = "";
    tans[i].textContent = answers[count][i];
  }

  checkfavourites();
  $("#currentQuestionIndex").text(count);
  removeAddChecked();
});

prev.addEventListener("click", function () {
  getAnswers();

  $("#currentQuestionIndex").text(count);
  count--;
  if (count >= 0) {
    tques.textContent = "";
    tques.textContent = questions[count];
    for (var i = 0; i < answers[0].length; i++) {
      tans[i].textContent = "";
      tans[i].textContent = answers[count][i];
    }
  } else {
    count++;
  }
  if (count < 0) {
    count++;
  }

  checkfavourites();
  $("#currentQuestionIndex").text(count);
  removeAddChecked();
});

function removeAddChecked() {
  $("input[type=checkbox]").prop("checked", false);
  $(".answers").removeClass("Checked");
  for (var x = 0; x < answers[0].length; x++) {
    var answersUI = document.getElementById(`ans${x}`);
    var checkbox = document.getElementById(`answer${x}`);

    if (typeof userAnswers[count] != "undefined") {
      if (userAnswers[count].includes(x)) {
        answersUI.classList.value = "answers Checked ";
        // answersUI.classList.addClass("Checked");
        checkbox.checked = true;
      }
    }
  }
}
function getAnswers() {
  userAnswers[count] = [];
  for (i = 0; i < answers[0].length; i++) {
    if (i < $("input:checked").length) {
      userAnswers[count].push(parseInt($("input:checked")[i].id.split("r")[1]));
    } else {
      userAnswers[count].push(-1);
    }
  }
  // userAnswers[count] = $("input:checked").length;
}

function checkfavourites() {
  //if not in favourite remove classs
  if (favourites.includes(count)) {
    $("#favor").addClass("favorated");
  } else {
    $("#favor").removeClass("favorated");
  }
  //if in add class
}
//add favorite data inside table &change notification
//append li in the favourite table
var favor = document.getElementById("favor");

favor.addEventListener("click", function () {
  if (!favourites.includes(count)) {
    console.log("pass");
    favourites.push(count);
    $("#favoriteItems").append(
      `<li id="${count}">Question${count} :${questions[count]} </li>`
    );
    $("#favor").addClass("favorated");
    $(".badge").text(favourites.length);
  } else {
    $("#favor").removeClass("favorated");
    favourites.splice(favourites.indexOf(count), 1);
    $(".badge").text(favourites.length);

    $(`#favoriteItems #${count}`)[0].remove();
  }
});

console.log(questions, answers, rightAnswers);
$("#favoriteItems").click(function (event) {
  event.stopImmediatePropagation();

  count = parseInt(event.target.attributes.id.value);
  $("#currentQuestionIndex").text(count);
  checkfavourites();

  tques.textContent = "";
  tques.textContent = questions[count];

  for (var i = 0; i < answers[count].length; i++) {
    tans[i].textContent = "";
    tans[i].textContent = answers[count][i];
  }
  removeAddChecked();
});

var tryAgain = 0;
$("#submit").click(function () {
  console.log(12);
  if (userAnswers.length === 0 && tryAgain != 2) {
    alert("no answers entered try again");
    tryAgain++;
    //location
  } else {
    for (i = 0; i < answers.length; i++) {
      if (typeof userAnswers[i] === "undefined") {
        userAnswers[i] = [-199];
      } else {
        userAnswers[i] = userAnswers[i].filter(function (item) {
          return item !== -1;
        });
      }
    }
    // console.log(userAnswers);

    var result = checkAnswers(
      userAnswers,
      quizInfo.teacherName,
      quizInfo.quizId
    );
    current.passed = result[2];
    current.score = result[1];
    current.answersCheck = result[0];

    Object.assign(window.localStorage, {
      current: JSON.stringify(current),
    });

    location.replace("../result/result.html");
  }
});
