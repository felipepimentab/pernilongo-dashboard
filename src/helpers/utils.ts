function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

import type { TopicInfo } from "@/types/aedes";

function topicInfo(topic: string): TopicInfo {
  switch (topic) {
    case 'motor/estado':
      return {
        name: 'Estado',
        label: '',
        icon: 'Motor',
        color: 'green',
      };
    
    case 'motor/velocidade':
      return {
        name: 'Velocidade',
        label: 'rpm',
        icon: 'Speedometer',
        color: 'red',
      };
    
    case 'motor/tensao':
      return {
        name: 'Tensão',
        label: 'V',
        icon: 'Voltage',
        color: 'blue',
      };
    
    case 'motor/corrente':
      return {
        name: 'Corrente',
        label: 'A',
        icon: 'Current',
        color: 'red',
      };
    
    case 'motor/temperatura':
      return {
        name: 'Temperatura',
        label: '°C',
        icon: 'Temperature',
        color: 'red',
      };
    
    case 'motor/avisos':
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
        color: 'red',
      };
  }
}

export { capitalize, topicInfo }