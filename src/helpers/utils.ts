function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

function formatDate(date: Date): string {
  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth()+1).toString().padStart(2, '0')}
          às
          ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}

export { capitalize, formatDate }