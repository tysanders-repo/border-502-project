import HomepageTemplate from '../components/templates/HomepageTemplate'
import { Link } from 'react-router-dom'
import Navbar from '../components/templates/Navbar/Navbar'

export function Home() {
  return (
    <>
      <Navbar />
      <nav>
        <ul>
          <li>
            <Link to="/users">View Users</Link>
          </li>
          <li>
            <Link to="/newuser">New User Form</Link>
          </li>
        </ul>
      </nav>
      {/* <HomepageTemplate /> */}
    </>
  )
}
