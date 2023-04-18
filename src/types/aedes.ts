import type * as mqtt from 'mqtt/dist/mqtt.min';

type Message = {
  payload: string | boolean | number,
  date: Date,
}

interface Subscription {
  topic: string,
  qos: mqtt.QoS,
  messages?: Message[],
  current?: string | boolean | number,
};

type ListOfSubscriptions = Array<Subscription>;

interface Publish {
  topic: string,
  qos: mqtt.QoS,
  payload: string | object | number | Buffer,
}

type TopicInfo = {
  name: string,
  label: string,
  icon: string,
  color: string,
}

export type { Message, Subscription, ListOfSubscriptions, Publish, TopicInfo }