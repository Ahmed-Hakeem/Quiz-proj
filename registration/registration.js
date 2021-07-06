//login page

// let table = document.getElementsByTagName("tbody")[0];
let addBtn = document.getElementById("signUp");

function checkNumbers() {
  mobile.addEventListener("input", function (e) {
    if (Number.isNaN(parseInt(e.data))) {
      e.target.value = e.target.value.slice(0, -1);
    }
  });
}
checkNumbers();
function validate() {
  let available = checkAvailability(current.UserType, currentUserName)[0];
  if (!available) {
    //throw new Error
  }
  let name = document.getElementById("currentUserName").value;
  let mobile = document.getElementById("mobile");
  let email = document.getElementById("email").value;
  function hasNumber(str) {
    for (let i = 0; i < 10; i++) {
      var x = str.includes(`${i}`);
      if (x == true) {
        break;
      }
    }
    return x;
  }

  function emailIsValid(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  if (hasNumber(name) || name === "") {
    alert("enter a valid name");
    return false;
  } else if (mobile.value === "") {
    alert("enter a valid mobile");
    return false;
  } else if (!emailIsValid(email) || email === "") {
    alert("enter a valid email");
    return false;
  } else {
    return true;
  }
}

let form = document.getElementsByTagName("form")[0];

form.addEventListener("submit", function (e) {
  e.preventDefault();
});

let LogIn = document.getElementById("logIn1");
LogIn.addEventListener("click", function () {
  location.replace("./login.html");
});

//change view to registration and make a button to go to login if user is existed
//make a button to change type which go to the first view

//button to change type goes to the first page
changeTypeBtn = document.getElementById("changeTypeBtn");
changeTypeBtn.addEventListener("click", function () {
  if (current.UserType === "Teacher") {
    current.UserType = "Student";
  } else if (current.UserType === "Student") {
    current.UserType = "Teacher";
  }
});

//registration
var signUpBtn = document.getElementsByClassName("signUp")[0];

signUpBtn.addEventListener("click", function () {
  let mobile = document.getElementById("mobile");
  let email = document.getElementById("email").value;
  let gender = document.getElementById("selectGend").value;

  let address = document.getElementById("address").value;
  //validate input

  // Validite();
  //& validate that there aren't user has a same userName and return false if any is not ok
  var currentPassword = document.getElementById("currentPassword").value;
  console.log(currentPassword);
  var currentPasswordConfirm = document.getElementById("currentPasswordConfirm")
    .value;
  if (currentPassword !== currentPasswordConfirm) {
    alert("password mismatch");
    return false;
  }
  currentUserName = document.getElementById("currentUserName").value;
  console.log(currentUserName);
  availablity = checkAvailability(current.UserType, currentUserName);
  var available = availablity[0];
  console.log(availablity);
  if (available) {
    alert("ther is a user with the same name");
  } else {
    //if validate returns true then add the student to our data
    if (validate() && current.UserType == "Student") {
      var newStudent = new Student(
        currentUserName,
        currentPassword,
        gender,
        mobile.value,
        email,
        address
      );
      students.push(newStudent);
      Object.assign(window.localStorage, {
        teachers: JSON.stringify(teachers),
        students: JSON.stringify(students),
        current: JSON.stringify(current),
      });

      window.location.replace("./login.html");
    } else if (validate() && current.UserType == "Teacher") {
      var newTeacher = new Teacher(
        currentUserName,
        currentPassword,
        gender,
        mobile.value,
        email,
        address
      );
      teachers.push(newTeacher);
      Object.assign(window.localStorage, {
        teachers: JSON.stringify(teachers),
        students: JSON.stringify(students),
        current: JSON.stringify(current),
      });

      window.location.replace("./login.html");
    }

    //replace with  login view to update data remove the login in the registration
  }
});

function Student(userName, passWord, gender, mobile, email, address) {
  //info to get from user for first regestration
  this.userName = userName;
  this.passWord = passWord;

  this.id = students.length;
  this.QuizAnswers = {
    quiz_id: "",
    answers: [],
    passed: "",
  };
  this.email = email;
  this.gender = gender;
  this.mobile = mobile;
  this.address = address;
  this.enteredExamsIds = [];
}
function Teacher(userName, passWord, gender, mobile, email, address) {
  //info to get from user for first regestration
  this.userName = userName;
  this.passWord = passWord;

  this.id = teachers.length;
  this.Quizes = [];
  this.email = email;
  this.gender = gender;
  this.mobile = mobile;
  this.address = address;
}
