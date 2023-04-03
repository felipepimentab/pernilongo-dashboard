function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

function topicName(topic: string): string {
  switch (topic) {
    case 'motor/estado':
      return 'Estado';
    
    case 'motor/velocidade':
      return 'Velocidade';
    
    case 'motor/tensao':
      return 'Tensão';
    
    case 'motor/corrente':
      return 'Corrente';
    
    case 'motor/temperatura':
      return 'Temperatura';
    
    case 'motor/avisos':
      return 'Avisos';
    
    default:
      return 'Mensagem';
  }
}

function topicIcon(topic: string): string {
  switch (topic) {
    case 'motor/estado':
      return 'Motor';
    
    case 'motor/velocidade':
      return 'Speedometer';
    
    case 'motor/tensao':
      return 'Voltage';
    
    case 'motor/corrente':
      return 'Current';
    
    case 'motor/temperatura':
      return 'Temperature';
    
    case 'motor/avisos':
      return 'Warning';
    
    default:
      return 'Box';
  }
}

export { capitalize, topicName, topicIcon }