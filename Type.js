//start to store data in local storage

Object.assign(window.localStorage, {
  teachers: JSON.stringify(teachers),
  students: JSON.stringify(students),
  current: JSON.stringify(current),
  quizInfo: JSON.stringify(quizInfo),
});
window.localStorage.isIn = 1;

//go to the appropriate page

//catch the type of the user
var teacherTypeBtn = document.getElementById("teacherTypeBtn");
var studentTypeBtn = document.getElementById("studentTypeBtn");

teacherTypeBtn.addEventListener("click", function () {
  current.UserType = "Teacher";
  Object.assign(window.localStorage, {
    current: JSON.stringify(current),
  });

  window.location.replace("./registration/registration.html");
});
studentTypeBtn.addEventListener("click", function () {
  current.UserType = "Student";
  Object.assign(window.localStorage, {
    current: JSON.stringify(current),
  });

  window.location.replace("./registration/registration.html");
});
