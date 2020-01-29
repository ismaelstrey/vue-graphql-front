import apollo from '@/plugins/apollo'
import AccountQuery from './../graphql/Accounts.gql'

const accounts = async () => {
  const response = await apollo.query({
    query: AccountQuery
  })

  return response.data.accounts
}

export default {
  accounts
}
