var teachers = [
  {
    id: 0,
    userName: "Hakeem",
    Quizes: [
      {
        quiz_id: "0",
        quizPassword: "0000",
        quizTime: 10,
        enteredStudents: [{ studentName: "", answers: [], passed: "" }],
        questions: ["sum 1 + 2", "sum 2 + 3", "sum 3 + 4", "sum 4 + 5"],
        answers: [
          ["3", "4", "5"],
          ["11", "40", "5"],
          ["67", "7", "25"],
          ["9", "0", "10"],
        ],
        rightAnswer: [[0], [2], [1], [0]],
      },
    ],
  },
];

var students = [
  {
    id: 0,
    userName: "Guest",
    passWord: "0000",
    QuizAnswers: [
      {
        quiz_id: "",
        answers: [
          [1, 2],
          [3, 2],
          [3, 4],
        ],
        passed: "",
      },
    ],
    enteredExamsIds: [],
  },
];

function checkAvailability(type, userName) {
  var available = false;
  var indexOfUser;

  if (type == "Teacher") {
    //search in teachers for this user name then return true or false
    for (teacher of teachers) {
      if (teacher.userName === userName) {
        available = true;
        indexOfUser = teachers.indexOf(teacher);
      }
    }
  } else if (type == "Student") {
    //search in students for this user name  then return true or false
    for (student of students) {
      if (student.userName === userName) {
        available = true;
        indexOfUser = students.indexOf(student);
      }
    }
  }

  return [available, indexOfUser];
}

// console.log(checkAvailability("Teacher", "Hakeem")[0]);

// we got user answers array from his inputs
function checkAnswers(userAnswers, teacherName, quizId) {
  let answers = [];
  var points = 0;
  var passed = false;
  teacherId = checkAvailability("Teacher", teacherName)[1];

  for (let i = 0; i < userAnswers.length; i++) {
    answers.push(
      areArraysEqual(
        userAnswers[i],
        teachers[teacherId].Quizes[quizId].rightAnswer[i]
      )
    );
    console.log(answers);
    if (answers[i] === true) {
      points++;
    }
  }
  console.log(userAnswers.length);

  if (points >= 0.5 * userAnswers.length) {
    passed = true;
    console.log("pass");
  }
  return [answers, points, passed];
}

function areArraysEqual(arr1, arr2) {
  if (arr1.length != arr2.length) {
    console.log(arr1, arr2);
    return false;
  } else {
    for (let i = 0; i < arr1.length; i++) {
      console.log(arr2.includes(arr1[i]));
      if (!arr2.includes(arr1[i])) {
        return false;
      }
    }
  }

  return true;
}

// console.log(checkAnswers(students[0].QuizAnswers[0].answers, "Hakeem", "0"));

//update student & teacher data after student finished exam
function updateData(arr) {
  // update user data
  // update teacher Data
}

current = {
  UserName: "",
  UserType: "",
};

quizInfo = {};

function validate(inputType, input) {
  switch (inputType) {
    case "email":
    //check email is correct & not empty
    case "number":

    case "text":
  }
}

if (window.localStorage.isIn == 1) {
  current = JSON.parse(window.localStorage.current);
  teachers = JSON.parse(window.localStorage.teachers);
  students = JSON.parse(window.localStorage.students);
  quizInfo = JSON.parse(window.localStorage.quizInfo);
}
