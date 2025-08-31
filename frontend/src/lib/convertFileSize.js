export default function convertFileSize(sizeInBytes) {

  if (sizeInBytes === 0) {
    return "0 B";
  }

  const units = ["B", "KB", "MB", "GB", "TB", "PB"];
  let i = 0;
  let size = Number(sizeInBytes);

  while (size >= 1024 && i < units.length - 1) {
    size /= 1024;
    i++;
  }
console.log(size);

  // Use toFixed() to format the number to two decimal places

  return `${size.toFixed(2)} ${units[i]}`;
}

