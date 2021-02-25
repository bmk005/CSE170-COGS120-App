
/*
 * GET home page.
 */

 const fs = require('fs')
 let rawdata = require('../data.json')
 let dataDict = JSON.parse(JSON.stringify(rawdata));

exports.setTask = function(req, res){
  let userName = req.query.uname  
  let password = req.query.pwd
  //@todo add password check; hide password in url
  let userDataDict = dataDict["userTable"]
  if (userDataDict[userName] === undefined) {
    userDataDict[userName] = {}
    userDataDict[userName]["task_completed"] = []
    userDataDict[userName]["task_todo"] = []
  }
  let curUserData = userDataDict[userName]
  curUserData["userName"] = userName
  res.render('setTask', curUserData);
};

exports.storeTask = function(req, res) {
  let taskName = req.query.taskName
  let taskTime = req.query.taskTime
  let userName = req.query.userName
  let userDataDict = dataDict["userTable"]
  let taskDict = dataDict["taskTable"]
  let curUserData = userDataDict[userName]
  userDataDict[userName]["task_todo"].push({"name": taskName, "uname": userName})
  curKey = userName + "_" + taskName
  taskDict[curKey] = {"time" : taskTime}
  dataDict["taskTable"] = taskDict
  dataDict["userTable"] = userDataDict
  curUserData["userName"] = userName
  curUserData["taskName"] = taskName
  res.render('setTask', curUserData);
}

exports.storeSubTask = function(req, res) {
  let subTaskName = req.query.subTaskName
  let subTaskTime = req.query.subTaskTime
  let userName = req.query.userName
  let taskName = req.query.taskName
  curKey = userName + "_" + taskName
  let taskDict = dataDict["taskTable"][curKey]
  if (taskDict["subTask"] === undefined) {
    taskDict["subTask"] = []
  }
  taskDict["subTask"].push({"subTaskName": subTaskName, "subTaskTime": subTaskTime})
  dataDict["taskTable"][curKey] = taskDict
  res.render("todoTask", taskDict)
}

exports.welcome = function(req, res) {
  res.render('welcome')
}

exports.todoTask = function(req, res){
  taskName = req.params.name
  userName = req.params.uname
  curKey = userName + "_" + taskName
  curTaskDict = dataDict["taskTable"][curKey]
  curTaskDict["name"] = taskName
  curTaskDict["userName"] = userName
  curTaskDict["taskName"] = taskName
  res.render('todoTask', curTaskDict);
};

exports.todoSubTask = function(req, res){
  res.render('currentTask');
};

exports.login = function(req, res){
  res.render('login');
};

exports.report = function(req, res){
  res.render('report');
};