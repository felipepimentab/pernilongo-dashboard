type Topic = 'state' | 'speed' | 'tension' | 'current' | 'temperature' | 'warning'

interface Payload {
  message: String | Boolean | Number
}

type Publication = {
  topic: Topic,
  payload: Payload,
  retain: Boolean,
  qos: 0 | 1 | 2,
  "_id": String,
  "__v": Number
}

export type { Topic }