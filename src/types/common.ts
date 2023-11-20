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
  data: {
    data: T,
  }
}

export type { Payload, Topic, TopicPath, Publication, Subscription, ApiResponse, ConnectionStatus }