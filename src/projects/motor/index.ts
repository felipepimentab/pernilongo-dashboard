import type { ListOfSubscriptions, TopicInfo } from "@/types/common";

/* 
 *  Config options
 */

const config = {
  // Broker:
  host: '54.196.236.132' as string,
  port: 8083 as number, // ws: 8083; wss: 8084
  endpoint: '' as string,

  // ID do cliente:
  clientId: 'web' as string,

  // Auth:
  username: 'pernilongo-broker' as string,
  password: 'pernilongo12345' as string,
}

const topicsList: ListOfSubscriptions = [
  {
    topic: '/motor/state',
    qos: 0,
  },
  {
    topic: '/motor/speed',
    qos: 0,
  },
  {
    topic: '/motor/tension',
    qos: 0,
  },
  {
    topic: '/motor/current',
    qos: 0,
  },
  {
    topic: '/motor/warning',
    qos: 0,
  },
  {
    topic: '/motor/temperature',
    qos: 0,
  }
];

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

export { config, topicsList, topicInfo };