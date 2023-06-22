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

type Topic = 'state' | 'speed' | 'tension' | 'current' | 'temperature' | 'warning'

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

interface ApiResponse<T> {
  data: {
    data: T,
  }
}

export type { Message, Subscription, Topic, ListOfSubscriptions, Publish, TopicInfo, ApiResponse }