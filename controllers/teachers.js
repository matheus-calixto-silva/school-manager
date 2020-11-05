const fs = require('fs');
const data = require('../data.json');

const { age, date, degree } = require('../utils');

exports.index = function(req, res){
  return res.render('teachers/index', { teachers: data.teachers });  
}

exports.create = function(req, res){
  return res.render('teachers/create');
}

exports.show = function(req, res){
  const { id } = req.params;

  const foundTeacher =  data.teachers.find(function(teacher){
    return teacher.id == id;
  });

  if(!foundTeacher){
    return res.send('Professor não encontrado');
  }

  const teacher = {
    ...foundTeacher,
    birth: age(foundTeacher.birth),
    atuation_area: foundTeacher.atuation_area.split(","),
    created_at: date(foundTeacher.created_at).iso,
  }
  
  return res.render('teachers/show', { teacher });
}

exports.post = function(req, res){
  const keys = Object.keys(req.body)

  for(key of keys){
    if(req.body[key] == ""){
      return res.send('please fill all fields');
    }
  }

  let { avatar_url, name, birth, educational_level, type_class, atuation_area } = req.body;

  birth = Date.parse(birth);
  const id = Number(data.teachers.length + 1);
  const created_at = Date.now(req.body);

  data.teachers.push({
    id,
    avatar_url,
    name,
    birth,
    educational_level,
    type_class,
    atuation_area,
    created_at
  });

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
    if(err){
      return res.send('Write file error');
    }

    return res.redirect('/teachers');
  });
}

exports.edit = function(req, res){
  const { id } = req.params;

  const foundTeacher =  data.teachers.find(function(teacher){
    return teacher.id == id;
  })

  if(!foundTeacher){ return res.send('Professor não encontrado')}

  const teacher = {
    ...foundTeacher,
    birth: date(foundTeacher.birth),
    educational_level: degree(foundTeacher.educational_level),
  }

  return res.render('teachers/edit', { teacher });
}

exports.put = function(req, res){
  const { id } = req.body;
  let index = 0;

  const foundTeacher = data.teachers.find(function(teacher, findIndex){
    if(teacher.id == id){
      index = findIndex;
      return true;
    }
  });

  if(!foundTeacher){ res.send('Professor não encontrado') }

  const teacher = {
    ...foundTeacher,
    ...req.body,
    birth: Date.parse(req.body.birth),
    id: Number(req.body.id),
  }

  data.teachers[index] = teacher;

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
    if(err){ return res.send('Write file error') }
  })

  return res.redirect(`/teachers/${id}`);
}

exports.delete = function(req, res){
  const { id } = req.body;

  const filteredTeachers =  data.teachers.filter(function(teacher){
    return teacher.id != id
  })

  data.teachers = filteredTeachers;

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
    if(err){ return res.send('Write file error') }
  })

  return res.redirect('/teachers');
}