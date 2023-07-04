export const useAlldata = () => {
  const modifyData = useState('alldata', () => {
    return {
      model: 'mocks',
      all: {},
      commentdata: {},
      isCN: true
    }
  })
  return modifyData
}
