export const generateRandomColors = (count, opacity = 0.7) => {
  const bgColors = [];
  const borderColors = [];
  for(let i =0;i<count;i++){
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    bgColors.push(`rgba(${r}, ${g}, ${b}, ${opacity})`);
    borderColors.push(`rgba(${r}, ${g}, ${b}, 1)`);
  }
  return { bgColors, borderColors };
};
