"use strict";
// Class User ()
class User {
  constructor(firstName, lastName, userName, passWord) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.passWord = passWord;
  }
}
// Class Task
class Task {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}

// Class Setting
class Setting {
  constructor(showPage, category, owner) {
    this.showPage = showPage;
    this.owner = owner;
    this.category = category;
  }
}
