export function generatePastelColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    // To generate a pastel color, limit the range of each RGB component
    const value = Math.floor(Math.random() * 128) + 128; // Ranges between 128 and 255
    color += letters[value % 16];
  }
  return color;
}
