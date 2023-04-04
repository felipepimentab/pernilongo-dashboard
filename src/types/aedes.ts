import type * as mqtt from 'mqtt/dist/mqtt.min';

interface Topic {
  path: string,
  qos: mqtt.QoS,
  messages?: Array<string | object>
};

type ListOfTopics = Array<Topic>;

interface Publish {
  topic: string,
  qos: mqtt.QoS,
  payload: string | Buffer,
}

export type { Topic, ListOfTopics, Publish }