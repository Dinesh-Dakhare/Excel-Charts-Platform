

export const getDayMonthYear = (date = new Date()) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayOfWeek = days[date.getDay()];
  const day = date.getDate();
//   const month = date.getMonth() + 1; 
const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
console.log(dayOfWeek, day, month, year);

  return { dayOfWeek, day, month, year };
};

 export const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }
