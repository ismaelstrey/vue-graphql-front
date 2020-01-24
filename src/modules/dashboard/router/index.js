import financesRoutes from './../modules/finances/router'
const Dashboard = () => import('./../views/Dashboard.vue')
export default [{
  path: '/dashboard',
  component: Dashboard,
  meta: {
    requiriesAuth: true
  },
  children: [
    ...financesRoutes
  ]
}]
