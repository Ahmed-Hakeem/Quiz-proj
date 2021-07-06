$(function () {
  $("#menu").hide();
  $("#box1").slideUp();
  $("#box2").slideUp();
});
$("#favourites").click(function () {
  $("#box1").slideToggle();
});
$("#Account").click(function () {
  $("#box2").slideToggle();
});

$("#icon").click(function () {
  $("#icon").toggleClass("showIcon");
  $("#top").toggleClass("showTop");
  $("#menu").toggle();
  $(".badge").toggleClass("showIcon");
});

var call = 0;
$(".answers").on("click", function (e) {
  call++;
  if (call % 2 == 0) {
    $(e.currentTarget).toggleClass("Checked");
  }
});

questions = quizInfo.questions;
answers = quizInfo.answers;
rightAnswers =
  teachers[quizInfo.currentTeacherIndex].Quizes[quizInfo.quizId].rightAnswer;

favourites = [];
userAnswers = [];

// add user data in side table
$("#accountItems").append(
  `<li>userName:\n${students[quizInfo.indexOfUser].userName}</li>`
);
$("#accountItems").append(
  `<li>enteredExams:\n${
    typeof students[quizInfo.indexOfUser].enteredExamsIds[0] != "undefined"
      ? students[quizInfo.indexOfUser].enteredExamsIds
      : "not Yet"
  }</li>`
);
