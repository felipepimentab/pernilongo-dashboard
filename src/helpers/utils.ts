import type { Payload, Publication } from "@/types/common";

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
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
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

function compareDates(a: Publication, b: Publication) {
  if(a.payload.time < b.payload.time) return 1;
  if(a.payload.time > b.payload.time) return -1;
  return 0;
}

function createPlotableArray(pubs: Array<Publication>): Array<Payload> {
  const list = pubs.sort(compareDates);
  const today = new Date().getTime();
  let day = -1;
  const arr: Array<Payload> = [];

  list.forEach(pub => {
    const time = new Date(pub.payload.time)
    const diff = Math.floor(((((today - time.getTime())/1000)/60)/60)/24)
    if(diff !== day) {
      day = diff;
      arr.push(pub.payload)
    }
  });

  return arr.slice(0, 7).reverse();
}

function createDataArray(list: Array<Payload>): Array<number> {
  const arr: Array<number> = [];
  list.forEach(payload => {
    arr.push(payload.message as number);
  });
  return arr;
}

function getShiftedWeekdays(date: Date): Array<string> {
  const day = new Date(date).getDay();
  return shiftArrayBy(diaDaSemana, day)
}

function shiftArrayBy(arr: Array<any>, i: number): Array<any> {
  return arr.splice(i).concat(arr.splice(0, i));
}

export { capitalize, formatDate, formatRelativeDate, diaDaSemana, createPlotableArray, createDataArray, getShiftedWeekdays }