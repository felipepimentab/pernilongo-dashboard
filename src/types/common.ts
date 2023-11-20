import type * as mqtt from 'mqtt/dist/mqtt.min';

type Payload = {
  message: string | boolean | number,
  time: Date,
}

type Topic = 'state' | 'speed' | 'tension' | 'current' | 'temperature' | 'warning'

type TopicPath = `/motor/${Topic}`

interface Publication {
  topic: Topic,
  payload: Payload
  qos: mqtt.QoS,
  retain: Boolean,
  "_id"?: String,
  "__v"?: String
};

interface Subscription {
  topic: TopicPath,
  qos: mqtt.QoS,
  retain?: Boolean,
}

type ConnectionStatus = 'connecting' | 'success' | 'error';

interface ApiResponse<T> {
  data: T,
}

type History = {
  payload: {
    message: number,
    time: string,
  },
  qos: number,
  retain: boolean,
  topic: string,
  __v: number,
  _id: string,
  _msgid: string,
}[]

export type { Payload, Topic, TopicPath, Publication, Subscription, ApiResponse, ConnectionStatus, History }