const RecordsHome = () => import('./../views/RecordsHome')
const RecordsAdd = () => import('./../views/RecordsAdd')
export default [{
  path: 'records',
  name: 'home',
  component: RecordsHome,
  meta: {
    requiriesAuth: true
  },
  alias: ['home', '']
},
{
  path: 'records/add',
  name: 'recordsAdd',
  component: RecordsAdd,
  meta: {
    requiriesAuth: true
  }
}
]
