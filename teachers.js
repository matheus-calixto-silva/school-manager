const fs = require('fs');
const data = require('./data.json');

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
    atuation_area: foundTeacher.atuation_area.split(","),
  }

  console.log(teacher);
  
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