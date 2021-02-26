
/*
 * GET home page.
 */

const { raw } = require('express');


exports.setTask = function(req, res){
  let fs = require('fs')
  let rawdata = fs.readFileSync('data.json',  {encoding:'utf8',flag:'r'})
  var dataDict = JSON.parse(rawdata);
  let userName = req.query.uname  
  let password = req.query.pwd
  //@todo add password check; hide password in url
  let userDataDict = dataDict["userTable"]
  if (userDataDict[userName] === undefined) {
    userDataDict[userName] = {}
    userDataDict[userName]["task_completed"] = []
    userDataDict[userName]["task_todo"] = []
  }
  dataDict["userTable"] = userDataDict
  var jsonString = JSON.stringify(dataDict)
  fs.writeFileSync("data.json", jsonString, {encoding:'utf8',flag:'w'})
  let curUserData = userDataDict[userName]
  curUserData["userName"] = userName
  res.render('setTask', curUserData);
};


exports.setTaskFromNav = function(req, res) {
  let fs = require('fs')
  let rawdata = fs.readFileSync('data.json',  {encoding:'utf8',flag:'r'})
  var dataDict = JSON.parse(rawdata);
  let userName = req.params.uname  
  let userDataDict = dataDict["userTable"]
  if (userDataDict[userName] === undefined) {
    userDataDict[userName] = {}
    userDataDict[userName]["task_completed"] = []
    userDataDict[userName]["task_todo"] = []
  }
  dataDict["userTable"] = userDataDict
  var jsonString = JSON.stringify(dataDict)
  fs.writeFileSync("data.json", jsonString, {encoding:'utf8',flag:'w'})
  let curUserData = userDataDict[userName]
  curUserData["userName"] = userName
  res.render('setTask', curUserData);
}

exports.storeTask = function(req, res) {
  let fs = require('fs')
  let rawdata = fs.readFileSync('data.json',  {encoding:'utf8',flag:'r'})
  let dataDict = JSON.parse(rawdata);
  let taskName = req.query.taskName
  let taskTime = req.query.taskTime
  let userName = req.query.userName
  let userDataDict = dataDict["userTable"]
  let taskDict = dataDict["taskTable"]
  if (userDataDict[userName] === undefined) {
    userDataDict[userName] = {}
  }
  let curUserData = userDataDict[userName]
  if (userDataDict[userName]["task_todo"] === undefined) {
    userDataDict[userName]["task_todo"] = []
  }
  userDataDict[userName]["task_todo"].push({"name": taskName, "uname": userName})
  curKey = userName + "_" + taskName
  taskDict[curKey] = {"time" : taskTime}
  dataDict["taskTable"] = taskDict
  dataDict["userTable"] = userDataDict
  let jsonString = JSON.stringify(dataDict)
  fs.writeFileSync("data.json", jsonString)
  curUserData["userName"] = userName
  curUserData["taskName"] = taskName
  res.render('setTask', curUserData);
}

exports.storeSubTask = function(req, res) {
  let fs = require('fs')
  let rawdata = fs.readFileSync('data.json',  {encoding:'utf8',flag:'r'})
  let dataDict = JSON.parse(rawdata);
  let subTaskName = req.query.subTaskName
  let subTaskTime = req.query.subTaskTime
  let userName = req.query.userName
  let taskName = req.query.taskName
  curKey = userName + "_" + taskName
  if (dataDict["taskTable"][curKey] === undefined) {
    dataDict["taskTable"][curKey] = {}
  }
  let taskDict = dataDict["taskTable"][curKey]
  if (taskDict["subTask"] === undefined) {
    taskDict["subTask"] = []
  }
  taskDict["subTask"].push({"taskName": taskName, "subTaskName": subTaskName, "subTaskTime": subTaskTime, "userName":userName})
  dataDict["taskTable"][curKey] = taskDict
  let jsonString = JSON.stringify(dataDict)
  fs.writeFileSync("data.json", jsonString)
  taskDict["userName"] = userName
  taskDict["taskName"] = taskName
  res.render("todoTask", taskDict)
}

exports.welcome = function(req, res) {
  res.render('welcome')
}

exports.todoTask = function(req, res){
  let fs = require('fs')
  let rawdata = fs.readFileSync('data.json',  {encoding:'utf8',flag:'r'})
  let dataDict = JSON.parse(rawdata);
  taskName = req.params.name
  userName = req.params.uname
  curKey = userName + "_" + taskName
  curTaskDict = dataDict["taskTable"][curKey]
  curTaskDict["userName"] = userName
  curTaskDict["taskName"] = taskName
  res.render('todoTask', curTaskDict);
};

exports.todoSubTask = function(req, res){
  let fs = require('fs')
  let rawdata = fs.readFileSync('data.json',  {encoding:'utf8',flag:'r'})
  let dataDict = JSON.parse(rawdata);
  let userName = req.params.uname
  let subTaskName = req.query.subTaskName
  let subTaskTime = req.query.subTaskTime
  let taskName = req.query.taskName
  curData = {}
  curData["subTaskName"] = subTaskName
  curData["subTaskTime"] = subTaskTime
  curData["taskName"] = taskName
  curData["userName"] = userName
  res.render('todoSubTask', curData);
};

exports.login = function(req, res){
  res.render('login');
};


exports.report = function(req, res){
  res.render('report');
};