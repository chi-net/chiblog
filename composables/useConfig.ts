export const useConfig = () => {
  const modifyData = useState('config', () => {
    return {
      model: 'mocks',
      url: '',
      ignorebeta: false
    }
  })
  return modifyData
}
