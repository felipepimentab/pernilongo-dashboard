import type { ListOfSubscriptions } from "@/types/aedes";

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

export { config, topicsList};