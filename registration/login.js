//change type
let changeTypeBtn = document.getElementById("changeTypeBtn");

changeTypeBtn.addEventListener("click", function () {
  if (current.UserType === "Teacher") {
    current.UserType = "Student";
  } else if (current.UserType === "Student") {
    current.UserType = "Teacher";
  }
  console.log(current.UserType);
  Object.assign(window.localStorage, {
    current: JSON.stringify(current),
  });
  location.reload();
});

// loginBtn.addEventListener("click", function () {});
let studentLoginUI = document.getElementById("studentLogin");
let teacherLoginUI = document.getElementById("teacherLogin");
//login  check availablity  and go to the appropriate page
let loginBtn = document.getElementsByClassName("logIn");

(function showAppropriate() {
  if (current.UserType === "Student") {
    studentLoginUI.style.display = "block";

    loginBtn[0].addEventListener("click", function () {
      let currentPassword = document.getElementById("currentPassword").value;
      let quizId = document.getElementById("quizId").value;
      let currentTeacherName = document.getElementById("currentTeacherName")
        .value;
      let currentUserName = document.getElementById("currentUserName").value;
      console.log(currentUserName);
      let availablity = checkAvailability(current.UserType, currentUserName);
      let availabe = availablity[0];
      let indexOfUser = availablity[1];
      console.log(availablity);
      if (!availabe) {
        //tell user that his usernamme is incorrect
        alert("there is no user with this name");
      }
      console.log(
        currentUserName,
        currentPassword,
        currentTeacherName,
        quizId,
        indexOfUser
      );
      Studentlogin(
        currentUserName,
        currentPassword,
        currentTeacherName,
        quizId,
        indexOfUser
      );
    });
  } else if (current.UserType === "Teacher") {
    teacherLoginUI.style.display = "block";
    changeTypeBtn.style.bottom = "13%";
    loginBtn[1].addEventListener("click", function () {
      let currentPassword = document.getElementById("currentPassword1").value;
      let currentUserName = document.getElementById("currentUserName1").value;
      console.log(currentUserName);
      availablity = checkAvailability(current.UserType, currentUserName);
      var availabe = availablity[0];
      var indexOfUser = availablity[1];
      console.log(availablity);
      if (!availabe) {
        //tell user that his usernamme is incorrect
        alert("there is no user with this name");
      }
    });
  }
})();

let signUpButton = document.getElementsByClassName("signUp");
console.log(signUpButton);
signUpButton[0].addEventListener("click", function () {
  location.replace("./registration.html");
});
signUpButton[1].addEventListener("click", function () {
  location.replace("./registration.html");
});

function Studentlogin(username, passWord, teacherName, quizId, indexOfUser) {
  //UPDATE DATA
  //check password
  QuizPassWord = document.getElementById("QuizPassWord").value;
  teacherAvailability = checkAvailability("Teacher", teacherName);
  teacherNameAvailable = teacherAvailability[0];
  currentTeacherIndex = teacherAvailability[1];
  console.log(indexOfUser);
  if (!teacherNameAvailable) {
    alert("Please enter a valid teacher");
  } else if (!teacherNameAvailable) {
    //throw error
    alert("teacherName is unAvailable");
  } else if (
    teachers[currentTeacherIndex].Quizes.length - 1 <
    parseInt(quizId)
  ) {
    alert("quiz id is not avaialable");
  } else if (
    teachers[currentTeacherIndex].Quizes[quizId].quizPassword != QuizPassWord
  ) {
    alert("quiz password is not correct");
  } else if (passWord != students[indexOfUser].passWord) {
    alert("inCorrect password");
  } else {
    console.log("success");

    Object.assign(window.localStorage, {
      quizInfo: JSON.stringify({
        QuizPassWord: QuizPassWord,
        currentTeacherIndex: currentTeacherIndex,
        username: username,
        passWord: passWord,
        teacherName: teacherName,
        quizId: quizId,
        indexOfUser: indexOfUser,
        questions: teachers[currentTeacherIndex].Quizes[quizId].questions,
        answers: teachers[currentTeacherIndex].Quizes[quizId].answers,
      }),
    });
    //change entered exams in user data
    students[indexOfUser].enteredExamsIds.push(quizId);
    //change entered student in teacher data
    indexOfStudentInEntered =
      teachers[currentTeacherIndex].Quizes[quizId].enteredStudents.push({
        userName: username,
      }) - 1;

    Object.assign(window.localStorage, {
      teachers: JSON.stringify(teachers),
      students: JSON.stringify(students),
    });
    //update UI with appropriate Exam
    window.location.replace("../quiz/quiz.html");
  }
  console.log("success");
}
function TeacherLogin(username) {
  //update UI with appropriate Exam
  window.location.replace("../quiz/quiz.html");
}
