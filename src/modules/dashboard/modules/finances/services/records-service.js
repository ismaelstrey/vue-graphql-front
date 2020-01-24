import apollo from '@/plugins/apollo'
import recordsQuery from './../graphql/Records.gql'

const records = async variables => {
  const response = await apollo.query({
    query: recordsQuery,
    variables
  })
  return response.data.records
}

export default {
  records
}
