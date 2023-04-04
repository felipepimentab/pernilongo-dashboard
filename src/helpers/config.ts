import type { ListOfTopics } from "@/types/aedes";

/* 
 *  Config options
 */

const config = {
  // Broker:
  host: '54.196.236.132' as string,
  port: 8083 as number, // ws: 8083; wss: 8084
  endpoint: '' as string,

  // ID do cliente:
  clientId: 'dashboard_web' as string,

  // Auth:
  username: 'pernilongo-broker' as string,
  password: 'pernilongo12345' as string,
}

const topicsList: ListOfTopics = [
  {
    path: 'motor/estado',
    qos: 0,
  },
  {
    path: 'motor/velocidade',
    qos: 0,
  },
  {
    path: 'motor/tensão',
    qos: 0,
  },
  {
    path: 'motor/corrente',
    qos: 0,
  },
  {
    path: 'motor/avisos',
    qos: 0,
  },
  {
    path: 'motor/temperatura',
    qos: 0,
  }
];

export { config, topicsList};