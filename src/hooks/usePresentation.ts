// Inspired by use-presentation.js from https://github.com/FormidableLabs/spectacle/blob/main/src/hooks/use-presentation.js

import { useEffect, useState, useCallback, useRef } from 'react'
import { Players } from '../components/presentation/PresentationsControl'

function getReceiver() {
  return (
    window.navigator &&
    window.navigator.presentation &&
    window.navigator.presentation.receiver
  )
}

export type PresentationMessage =
  | { type: 'EVENT'; payload: { machine: string; event: any } }
  | { type: 'PLAYERS'; payload: Players }

function usePresentation() {
  const [connection, setConnection] = useState<any>(null)
  const [errors, setErrors] = useState<Error[]>([])

  const requestRef = useRef<any>(null)

  // Open to suggestions for better error handling
  const addError = (e: Error) => setErrors((es) => [...es, e])

  const terminateConnection = useCallback(() => {
    if (connection) {
      connection.terminate()
      setConnection(null)
    }
  }, [connection])

  // Create a presentation request and store it as a ref
  useEffect(() => {
    if (!window.PresentationRequest) {
      addError(new Error('Browser does not support Presentation API'))
    }
    return terminateConnection
  }, [connection, terminateConnection])

  // Add a message handler
  const addMessageHandler = useCallback((handler) => {
    const receiver = getReceiver()
    if (receiver) {
      const handleConnectionList = (list: any) => {
        list.connections.forEach((listConnection: any) => {
          // const oldHandler = listConnection.onmessage || (() => {})
          // Should probably store a reference to all handlers instead and then just call all handlers in the list in onmessage.
          listConnection.onmessage = (event: any) => {
            const parsedData = JSON.parse(event.data)
            handler(parsedData)
            // oldHandler(event)
          }
        })
      }
      receiver.connectionList.then(handleConnectionList).catch(addError)
    }
  }, [])

  // Opens the display selection dialog box
  const startConnection = useCallback((urlParams: string | string[]) => {
    requestRef.current = new window.PresentationRequest(urlParams)
    const request = requestRef && requestRef.current
    if (request) {
      request
        .start()
        .then((requestConnection: any) => {
          requestConnection.onclose = () => setConnection(null) // Detect user closing presentation window
          setConnection(requestConnection)
        })
        .catch((e: any) =>
          addError(
            new Error('User (probably) exited display selection dialog box')
          )
        )
    }
  }, [])

  // Send a message from the controller to the presenter
  const sendMessage = useCallback(
    (msg: PresentationMessage) => {
      // This may throw if message isn't stringify-able
      try {
        if (connection) {
          connection.send(JSON.stringify(msg))
        } else {
          addError(new Error('Cannot send message before starting a conection'))
        }
      } catch (e) {
        console.log('error', e)
        addError(e)
      }
    },
    [connection]
  )

  return {
    startConnection,
    terminateConnection,
    sendMessage,
    errors,
    addMessageHandler,
    isReceiver: Boolean(getReceiver()),
    isController: Boolean(connection),
  }
}

export default usePresentation
