export const useConfig = () => {
  const modifyData = useState('config', () => {
    return {
      model: 'mocks',
      url: '',
      ignorebeta: false,
      aikey: ''
    }
  })
  return modifyData
}
