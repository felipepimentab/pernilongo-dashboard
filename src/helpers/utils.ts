function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

function formatDate(date: Date): string {
  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth()+1).toString().padStart(2, '0')}
          às
          ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}

const diaDaSemana = [
  'Domingo',
  'Segunda-Feira',
  'Terça-Feira',
  'Quarta-Feira',
  'Quinta-Feira',
  'Sexta-Feira',
  'Sábado'
]

function formatRelativeDate(date: Date): string {
  const today = new Date().getTime();
  const diff = Math.floor(((((today - date.getTime())/1000)/60)/60)/24)

  switch (diff) {
    case 0:
      return 'Hoje';
    case 1:
      return 'Ontem';
    case 3:
      return 'Anteontem';
    case 4:
    case 5:
    case 6:
      return diaDaSemana[date.getDay()];
    default:
      return `Há ${diff} dias`;
  }
}

export { capitalize, formatDate, formatRelativeDate }