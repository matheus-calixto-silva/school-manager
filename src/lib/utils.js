module.exports = {
  age(timestamp) {
    const today = new Date();
    const birthDate = new Date(timestamp);

    let age = today.getUTCFullYear() - birthDate.getUTCFullYear();
    let month = today.getUTCMonth() - birthDate.getUTCMonth();

    today.getUTCDate();
    birthDate.getUTCDate();

    if (month < 0 || month == 0 && today.getUTCDate() <= birthDate.getUTCDate()) {
      age -= 1;
    }

    return age
  },
  date(timestamp) {
    const date = new Date(timestamp);

    const year = date.getUTCFullYear();
    const month = `0${date.getUTCMonth() + 1}`.slice(-2);
    const day = `0${date.getUTCDate()}`.slice(-2);

    return {
      day,
      month,
      year,
      iso: `${year}-${month}-${day}`,
      birthDay: `${day}/${month}`,
      format: `${day}/${month}/${year}`,
    };
  },
  degree(education_level) {
    let degree = '';

    switch (education_level) {
      case 'Ensino Médio Completo':
        degree = 'Ensino Médio Completo'
        break;
      case 'Ensino Superior Completo':
        degree = 'Ensino Superior Completo'
        break;
      case 'Mestrado':
        degree = 'Mestrado'
        break;
      case 'Doutorado':
        degree = 'Doutorado'
        break;
    }

    return degree;
  }
}