import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Subscription, Message } from '@/types/aedes';

export const useAedesStore = defineStore('aedes', () => {  
  /* Exported states */
  const estado = ref<Subscription>({
    topic: '/motor/estado',
    qos: 0,
    messages: [],
  });
  
  const velocidade = ref<Subscription>({
    topic: '/motor/velocidade',
    qos: 0,
    messages: [],
  });

  const tensao = ref<Subscription>({
    topic: '/motor/tensao',
    qos: 0,
    messages: [],
  });

  const corrente = ref<Subscription>({
    topic: '/motor/corrente',
    qos: 0,
    messages: [],
  });

  const avisos = ref<Subscription>({
    topic: '/motor/avisos',
    qos: 0,
    messages: [],
  });

  const temperatura = ref<Subscription>({
    topic: '/motor/temperatura',
    qos: 0,
    messages: [],
  });

  function receiveMessage(topic: string, msg: Buffer) {
    const date = new Date(JSON.parse(msg.toString()).time);
    const message = JSON.parse(msg.toString()).message;
  
    switch (topic) {
      case '/motor/estado':
        estado.value.messages?.unshift();
        estado.value.messages?.push({
          payload: !!message as boolean,
          date: date as Date,
        });
        estado.value.messages?.unshift();
        console.log('estado:', estado.value);
        break;
    
      case '/motor/velocidade':
        velocidade.value.messages?.unshift();
        velocidade.value.messages?.push({
          payload: parseInt(message.toString()) as number,
          date: date as Date,
        });
        velocidade.value.messages?.unshift();
        break;
    
      case '/motor/tensao':
        tensao.value.messages?.unshift();
        tensao.value.messages?.push({
          payload: parseInt(message.toString()) as number,
          date: date as Date,
        });
        tensao.value.messages?.unshift();
        break;
    
      case '/motor/corrente':
        corrente.value.messages?.unshift();
        corrente.value.messages?.push({
          payload: parseInt(message.toString()) as number,
          date: date as Date,
        });
        corrente.value.messages?.unshift();
        break;
    
      case '/motor/temperatura':
        temperatura.value.messages?.unshift();
        temperatura.value.messages?.push({
          payload: parseInt(message.toString()) as number,
          date: date as Date,
        });
        temperatura.value.messages?.unshift();
        break;
    
      case '/motor/avisos':
        avisos.value.messages?.unshift();
        avisos.value.messages?.push({
          payload: message.toString() as string,
          date: date as Date,
        });
        avisos.value.messages?.unshift();
        break;
    
      default:
        console.log('Topic not found.')
        break;
    }
  }
  
  return {
    estado,
    velocidade,
    tensao,
    corrente,
    avisos,
    temperatura,
    receiveMessage,
  }
})
