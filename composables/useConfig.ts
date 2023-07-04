export const useConfig = () => {
  const modifyData = useState('config', () => {
    return {
      model: 'mocks',
      url: ''
    }
  })
  return modifyData
}
