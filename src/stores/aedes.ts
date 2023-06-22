import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Subscription, Message } from '@/types/common';

export const useAedesStore = defineStore('aedes', () => {  
  /* Exported states */
  const state = ref<Subscription>({
    topic: '/motor/state',
    qos: 0,
    messages: [],
  });
  
  const speed = ref<Subscription>({
    topic: '/motor/speed',
    qos: 0,
    messages: [],
  });

  const tension = ref<Subscription>({
    topic: '/motor/tension',
    qos: 0,
    messages: [],
  });

  const current = ref<Subscription>({
    topic: '/motor/current',
    qos: 0,
    messages: [],
  });

  const warning = ref<Subscription>({
    topic: '/motor/warning',
    qos: 0,
    messages: [],
  });

  const temperature = ref<Subscription>({
    topic: '/motor/temperature',
    qos: 0,
    messages: [],
  });

  function receiveMessage(topic: string, msg: Buffer) {
    const date = new Date(JSON.parse(msg.toString()).time);
    const message = JSON.parse(msg.toString()).message;
  
    switch (topic) {
      case '/motor/state':
        state.value.messages?.splice(0, 0, {
          payload: !!message as boolean,
          date: date as Date,
        });
        console.log('state:', state.value);
        break;
    
      case '/motor/speed':
        speed.value.messages?.splice(0, 0, {
          payload: parseInt(message.toString()) as number,
          date: date as Date,
        });
        break;
    
      case '/motor/tension':
        tension.value.messages?.splice(0, 0, {
          payload: parseInt(message.toString()) as number,
          date: date as Date,
        });
        break;
    
      case '/motor/current':
        current.value.messages?.splice(0, 0, {
          payload: parseInt(message.toString()) as number,
          date: date as Date,
        });
        break;
    
      case '/motor/temperature':
        temperature.value.messages?.splice(0, 0, {
          payload: parseInt(message.toString()) as number,
          date: date as Date,
        });
        break;
    
      case '/motor/warning':
        warning.value.messages?.splice(0, 0, {
          payload: message.toString() as string,
          date: date as Date,
        });
        break;
    
      default:
        console.log('Topic not found.')
        break;
    }
  }
  
  return {
    state,
    speed,
    tension,
    current,
    warning,
    temperature,
    receiveMessage,
  }
})
