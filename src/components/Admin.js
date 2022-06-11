import { Link } from 'react-router-dom'
import Users from './Users'

const Admin = () => {
  return (
    <section>
      <h1>Admin page</h1>
      <br />
      <Users></Users>
      <br />
      <div className="flexGrow">
        <Link to={'/'}>HOME</Link>
      </div>
    </section>
  )
}

export default Admin
