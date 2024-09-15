import HomepageTemplate from '../components/templates/HomepageTemplate'
import { Link } from 'react-router-dom'
import Navbar from '../components/templates/Navbar/Navbar'

export function Home() {
  return (
    <>
      <Navbar />
      <nav>
        <Link to="/about">About</Link>
        <Link to="/userinfo">Add New User</Link>
      </nav>
      <HomepageTemplate />
    </>
  )
}
