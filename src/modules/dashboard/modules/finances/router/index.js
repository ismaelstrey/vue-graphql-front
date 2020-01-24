const RecordsHome = () => import('./../views/RecordsHome')
export default [{
  path: 'records',
  component: RecordsHome,
  meta: {
    requiriesAuth: true
  },
  alias: ['home', '']
}]
