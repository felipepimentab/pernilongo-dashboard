import { ref } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'
import type { Payload } from '@/types/common';

export const useTopicsStore = defineStore('topics', () => {  
  const state = ref<Payload>({
    message: false,
    time: new Date,
  });
  
  // const speed = ref<Payload>({
  //   message: 0,
  //   time: new Date,
  // });

  // const tension = ref<Payload>({
  //   message: 0,
  //   time: new Date,
  // });

  // const current = ref<Payload>({
  //   message: 0,
  //   time: new Date,
  // });

  const items = ref<Payload>({
    message: 0,
    time: new Date,
  });

  const accepted = ref<Payload>({
    message: 0,
    time: new Date,
  });

  const rejected = ref<Payload>({
    message: 0,
    time: new Date,
  });

  const warning = ref<Payload>({
    message: '',
    time: new Date,
  });

  // const temperature = ref<Payload>({
  //   message: 0,
  //   time: new Date,
  // });

  function receiveMessage(topic: string, msg: Buffer) {
    const date = new Date(JSON.parse(msg.toString()).time);
    const message = JSON.parse(msg.toString()).message;
  
    switch (topic) {
      case '/belt/state':
        state.value = {
          message: !!message as boolean,
          time: date
        };
        break;
    
      case '/belt/items':
        items.value = {
          message: parseInt(message.toString()) as number,
          time: date
        };
        break;
    
      case '/belt/accepted':
        accepted.value = {
          message: parseInt(message.toString()) as number,
          time: date
        };
        break;
    
      case '/belt/rejected':
        rejected.value = {
          message: parseInt(message.toString()) as number,
          time: date
        };
        break;
    
      case '/belt/warning':
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
    items,
    accepted,
    rejected,
    warning,
    receiveMessage,
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTopicsStore, import.meta.hot))
}
