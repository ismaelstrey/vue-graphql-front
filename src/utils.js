const errorHandler = (err, vm, info) => {
  console.log(err)
  console.log('Vue error HANDLER: ', err, info)
  const jwtErrors = ['jwt malformed', 'jwt expired', 'jwt not active', 'invalid token']

  if (jwtErrors.some(jwtError => err.message.include(jwtError))) {
    vm.$router.push({
      path: '/login',
      query: {
        redirect: vm.$route.path
      }
    })
  }
}

const formatError = message => {
  const messageSplit = message.split(':')
  return messageSplit[messageSplit.length - 1].trim()
}
const currencyFormatter = ({
  locale,
  currency
} = {
  locale: 'pt-BR',
  currency: 'BRL'
}) => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  })
}

const groupBy = (array, key, makeCurrentKey) => {
  return array.reduce((accumulated, item) => {
    const currentKey = makeCurrentKey(item, key)
    return {
      ...accumulated,
      [currentKey]: [
        ...(accumulated[currentKey] || []),
        item
      ]
    }
  }, {})
}
export {
  currencyFormatter,
  groupBy,
  formatError,
  errorHandler
}
