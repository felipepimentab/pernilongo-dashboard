import type * as mqtt from 'mqtt/dist/mqtt.min';

interface Topic {
  name: string,
  qos: mqtt.QoS,
  messages?: Array<string | object>
};

type ListOfTopics = Array<Topic>;

export type { Topic, ListOfTopics }