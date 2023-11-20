import { ref } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'
import type { Payload } from '@/types/common';

export const useTopicsStore = defineStore('topics', () => {  
  const state = ref<Payload>({
    message: false,
    time: new Date,
  });
  
  const speed = ref<Payload>({
    message: 0,
    time: new Date,
  });

  const tension = ref<Payload>({
    message: 0,
    time: new Date,
  });

  const current = ref<Payload>({
    message: 0,
    time: new Date,
  });

  const warning = ref<Payload>({
    message: '',
    time: new Date,
  });

  const temperature = ref<Payload>({
    message: 0,
    time: new Date,
  });

  function receiveMessage(topic: string, msg: Buffer) {
    const date = new Date(JSON.parse(msg.toString()).time);
    const message = JSON.parse(msg.toString()).message;
  
    switch (topic) {
      case '/motor/state':
        state.value = {
          message: !!message as boolean,
          time: date
        };
        break;
    
      case '/motor/speed':
        speed.value = {
          message: parseInt(message.toString()) as number,
          time: date
        };
        break;
    
      case '/motor/tension':
        tension.value = {
          message: parseInt(message.toString()) as number,
          time: date
        };
        break;
    
      case '/motor/current':
        current.value = {
          message: parseInt(message.toString()) as number,
          time: date
        };
        break;
    
      case '/motor/temperature':
        temperature.value = {
          message: parseInt(message.toString()) as number,
          time: date
        };
        break;
    
      case '/motor/warning':
        warning.value = {
          message: message.toString() as string,
          time: date
        };
        break;
    
      default:
        console.log(`❓ ~ Topic '${topic}' was not found.`)
        break;
    }
  }
  
  return {
    state,
    speed,
    tension,
    current,
    temperature,
    warning,
    receiveMessage,
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTopicsStore, import.meta.hot))
}
