
/*
 * GET home page.
 */

exports.setTask = function(req, res){
  res.render('setTask');
};

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