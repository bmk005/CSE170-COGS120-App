
/*
 * GET home page.
 */

 const fs = require('fs')

exports.setTask = function(req, res){
  var rawdata = require('../data.json')
  let userName = req.query.fname  
  let userDataDict = JSON.parse(JSON.stringify(rawdata));
  let curUserData = userDataDict.userName
  res.render('setTask', curUserData);
};

exports.welcome = function(req, res) {
  res.render('welcome')
}

exports.setSubTask = function(req, res){
  res.render('setSubTask');
};

exports.currentTask = function(req, res){
  res.render('currentTask');
};

exports.login = function(req, res){
  res.render('login');
};

exports.report = function(req, res){
  res.render('report');
};