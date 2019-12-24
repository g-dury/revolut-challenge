function isDateBeforeToday(date) {
    return new Date(date.toDateString()) < new Date(new Date().toDateString());
}
  
function isDateToday(date) {
    today = new Date()
    if (date.getMonth() === today.getMonth() && date.getDate() === today.getDate()){
      return true  
    } else {
      return false
    }
}
  
function howManyDays(today,birthday){
    birthday.setFullYear(today.getFullYear());
    if (today > birthday) {
      birthday.setFullYear(today.getFullYear() + 1);
    }
    return Math.floor((birthday - today) / (1000*60*60*24))
}
  
function isOnlyLetters(string) {
    return (/^[a-z]+$/i.test(string))
}

module.exports = {
    isDateBeforeToday,
    isDateToday,
    howManyDays,
    isOnlyLetters   
}