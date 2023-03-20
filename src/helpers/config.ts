/* 
 *  Config options
 */

const config = {
  // Broker:
  host: '127.0.0.1' as string, // localhost
  port: 8083 as number, // ws: 8083; wss: 8084
  endpoint: '/' as string,

  // ID do cliente:
  clientId: 'dashboard_web' as string,

  // Auth:
  username: 'pernilongobroker' as string,
  password: 'pernilongo12345' as string,
}

export default config;