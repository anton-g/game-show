// Inspired by use-presentation.js from https://github.com/FormidableLabs/spectacle/blob/main/src/hooks/use-presentation.js
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
