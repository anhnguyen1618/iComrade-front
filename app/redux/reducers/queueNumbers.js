
export const queueNumberReducer = (queueNumbers = {}, action) => {
  const { roomName, number } = action
  switch (action.type) {
    case 'LOAD_QUEUE_NUMBER':
      return {...queueNumbers, [roomName]: number}
    case 'DECREASE':
      const currentNumber = queueNumbers[roomName]
      if (currentNumber >= 0) {
        return { ...queueNumbers, [roomName]: currentNumber - 1 }
      }
  }
  return queueNumbers
}
