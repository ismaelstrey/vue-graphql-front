import apollo from '@/plugins/apollo'
import AccountQuery from './../graphql/Accounts.gql'
import AccountCreateMutation from './../graphql/AccountCreate.gql'

const accounts = async () => {
  const response = await apollo.query({
    query: AccountQuery
  })

  return response.data.accounts
}
const createAccount = async variables => {
  const response = await apollo.mutate({
    mutation: AccountCreateMutation,
    variables,
    update: (proxy, {
      data: {
        createAccount
      }
    }) => {
      try {
        const data = proxy.readQuery({
          AccountQuery
        })

        data.accounts = [...data.accounts, createAccount]
        proxy.writeQuery({
          query: AccountQuery,
          data
        })
      } catch (error) {
        console.log('Query "accounts" has not been read yet!', error)
      }
    }
  })
  return response.data.createAccount
}

export default {
  accounts,
  createAccount
}
