import apollo from '@/plugins/apollo'
import CategoriesQuery from './../graphql/Categories.gql'
import CategorieCreateMutation from './../graphql/CategoryCreate.gql'

const categories = async ({
  operation
}) => {
  const response = await apollo.query({
    query: CategoriesQuery,
    variables: {
      operation: operation ? operation.toUpperCase() : operation
    }
  })

  return response.data.categories
}
const createCategories = async variables => {
  const response = await apollo.mutate({
    mutation: CategorieCreateMutation,
    variables,
    upadate: (proxy, {
      data: {
        createCategory
      }
    }) => {
      try {
        const variables = {
          operation: createCategory.operation
        }
        const data = proxy.readQuery({
          query: CategoriesQuery,
          variables
        })
        data.categories = [...data.categories, createCategory]

        proxy.writeQuery({
          query: CategoriesQuery,
          data
        })
      } catch (error) {
        console.log('Query "categories" has not been read yet!')
      }
    }
  })
  return response.data.createCategories
}

export default {
  categories,
  createCategories
}
