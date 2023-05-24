import type { TopicInfo } from "@/types/aedes";

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

function formatDate(date: Date): string {
  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth()+1).toString().padStart(2, '0')}
          às
          ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}

function topicInfo(topic: string): TopicInfo {
  switch (topic) {
    case '/motor/state':
      return {
        name: 'Estado',
        label: '',
        icon: 'Motor',
        color: 'green',
      };
    
    case '/motor/speed':
      return {
        name: 'Velocidade',
        label: 'rpm',
        icon: 'Speedometer',
        color: 'red',
      };
    
    case '/motor/tension':
      return {
        name: 'Tensão',
        label: 'V',
        icon: 'Voltage',
        color: 'blue',
      };
    
    case '/motor/current':
      return {
        name: 'Corrente',
        label: 'A',
        icon: 'Current',
        color: 'teal',
      };
    
    case '/motor/temperature':
      return {
        name: 'Temperatura',
        label: '°C',
        icon: 'Temperature',
        color: 'orange',
      };
    
    case '/motor/warning':
      return {
        name: 'Avisos',
        label: '',
        icon: 'Warning',
        color: 'yellow',
      };
    
    default:
      return {
        name: 'Mensagem',
        label: '',
        icon: 'Box',
        color: 'blue',
      };
  }
}

export { capitalize, topicInfo, formatDate }