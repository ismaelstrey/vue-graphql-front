import apollo from '@/plugins/apollo'
import moment from 'moment'
import recordsQuery from './../graphql/Records.gql'
import totalBalanceQuery from './../graphql/TotalBalance.gql'

const records = async variables => {
  const response = await apollo.query({
    query: recordsQuery,
    variables
  })
  return response.data.records
}
const totalBalance = async () => {
  const response = await apollo.query({
    query: totalBalanceQuery,
    variables: {
      date: moment().format('YYYY-MM-DD')
    }
  })
  return response.data.totalBalance
}

export default {
  records,
  totalBalance
}
