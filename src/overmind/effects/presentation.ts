// The PresentationRequest API doesn't exist in TypeScripts window definitions yet
declare global {
  interface Navigator {
    presentation: any
  }
  interface Window {
    PresentationRequest: any
  }
}

function getReceiver() {
  return (
    window.navigator &&
    window.navigator.presentation &&
    window.navigator.presentation.receiver
  )
}

const presentation = (() => {
  let connection: any

  return {
    // initialize(options: any) {
    // ws.on('connect_error', () => console.log('connect_error'))
    // ws.on('connect_timeout', () => console.log('connect_timeout'))
    // ws.on('error', () => console.log('error'))
    // ws.on('reconnect_error', () => console.log('reconnect_error'))
    // ws.on('reconnect_failed', () => console.log('reconnect_failed'))
    // ws.on('disconnect', () => console.log('disconnected'))
    // ws.on('reconnect', () => console.log('reconnected'))
    // ws.on('reconnect_attempt', () => console.log('reconnecting'))
    // for (const handler of options.messageHandlers) {
    //   ws.on(handler.type, handler.handler)
    // }
    // },
    startConnection(urlParams: string | string[]) {
      const request = new window.PresentationRequest(urlParams)
      if (request) {
        request
          .start()
          .then((requestConnection: any) => {
            // Maybe need to expose onclose or set some state?
            requestConnection.onclose = () => (connection = null)
            connection = requestConnection
          })
          .catch((e: any) => {
            // User probably closed display selection dialog box
            console.log(e)
          })
      }
    },
    terminateConnection() {
      if (connection) {
        connection.terminate()
        connection = null
      }
    },
    sendMessage(msg: { type: MessageType; payload: any }) {
      try {
        if (connection) {
          connection.send(JSON.stringify(msg))
        } else {
          console.log('Cannot send message before starting a connection.')
        }
      } catch (e) {
        console.log('error', e)
      }
    },
    addMessageHandler(handler: Function) {
      const receiver = getReceiver()
      if (receiver) {
        const handleConnectionList = (list: any) => {
          list.connections.forEach((listConnection: any) => {
            const oldHandler = listConnection.onmessage || (() => {})
            listConnection.onmessage = (event: any) => {
              const parsedData = JSON.parse(event.data)
              handler(parsedData)
              oldHandler(event)
            }
          })
        }
        receiver.connectionList
          .then(handleConnectionList)
          .catch((e: any) => console.log(e))
      }
    },
  }
})()

export default presentation

export enum MessageType {
  TEMP = 'TEMP',
}
