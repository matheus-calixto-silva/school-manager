const fs = require('fs');
const data = require('../data.json');

const { age, date, degree } = require('../utils');

exports.index = function(req, res){
  return res.render('students/index', { students: data.students });  
}

exports.create = function(req, res){
  return res.render('students/create');
}

exports.post = function(req, res){
  const keys = Object.keys(req.body)

  for(key of keys){
    if(req.body[key] == ""){
      return res.send('please fill all fields');
    }
  }

  birth = Date.parse(req.body.birth);

  let id = Number(data.students.length + 1);
  const lastStudent = data.students[data.students - 1];

  if(lastStudent){
    id = lastStudent + 1;
  }

  data.students.push({ 
    id,
    ...req.body,
    birth,
});

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
    if(err){
      return res.send('Write file error');
    }

    return res.redirect(`/students/${id}`);
  });
}

exports.show = function(req, res){
  const { id } = req.params;

  const foundStudent =  data.students.find(function(student){
    return student.id == id;
  });

  if(!foundStudent){
    return res.send('Estudante não encontrado');
  }

  const student = {
    ...foundStudent,
    birth: date(foundStudent.birth).birthDay,
  }

  return res.render('students/show', { student });
}

exports.edit = function(req, res){
  const { id } = req.params;

  const foundStudent =  data.students.find(function(student){
    return student.id == id;
  })

  if(!foundStudent){ return res.send('Aluno não encontrado')}

  const student = {
    ...foundStudent,
    birth: date(foundStudent.birth).iso,
  }

  return res.render('students/edit', { student });
}

exports.put = function(req, res){
  const { id } = req.body;
  let index = 0;

  const foundStudent = data.students.find(function(student, findIndex){
    if(student.id == id){
      index = findIndex;
      return true;
    }
  });

  if(!foundStudent){ res.send('Professor não encontrado') }

  const student = {
    ...foundStudent,
    ...req.body,
    id: Number(req.body.id),
    birth: Date.parse(req.body.birth),
  }

  data.students[index] = student;

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
    if(err){ return res.send('Write file error') }
  })

  return res.redirect(`/students/${id}`);
}

exports.delete = function(req, res){
  const { id } = req.body;

  const filteredStudents =  data.students.filter(function(student){
    return student.id != id
  })

  data.students = filteredStudents;

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
    if(err){ return res.send('Write file error') }
  })

  return res.redirect('/students');
}