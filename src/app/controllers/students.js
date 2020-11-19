const { age, date, degree } = require('../../lib/utils');
const Student = require('../models/student');

module.exports = {
  index(req, res){
    Student.all(function(students){
      return res.render('students/index', { students } );
    });
  },
  create(req, res){
    Student.teachersOptions(function(options){
      return res.render('students/create', {teacherOptions: options });
    });
  },
  post(req, res){
    const keys = Object.keys(req.body)

    for(key of keys){
      if(req.body[key] == ""){
        return res.send('please fill all fields');
      }
    }

    Student.create(req.body, function(student){
      return res.redirect(`/students/${student.id}`);
    })
  },
  show(req, res){
    Student.find(req.params.id, function(student){
      if(!student) { return res.send('Aluno não encontrado') }
      student.birth_date = date(student.birth_date).format;

      return res.render('students/show', { student });
    });
  },
  edit(req, res){
    Student.find(req.params.id, function(student){
      if(!student) {return res.send('Aluno não encontrado') }
      
      student.birth_date = date(student.birth_date).iso;

      Student.teachersOptions(function(options){
        return res.render('students/edit', { student , teacherOptions: options });
      });
  
    });
  },
  put(req, res){
    const keys = Object.keys(req.body)

    for(key of keys){
      if(req.body[key] == ""){
        return res.send('please fill all fields');
      }
    }

    Student.update(req.body, function(){
      return res.redirect(`/students/${req.body.id}`);
    });  
  },
  delete(req, res){
    Student.delete(req.body.id, function(){
      return res.redirect(`/students`);
    });
  },
}