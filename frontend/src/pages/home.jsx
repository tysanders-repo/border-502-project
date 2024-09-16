import HomepageTemplate from '../components/templates/HomepageTemplate'
import { Link } from 'react-router-dom'

export function Home() {
  return (
    <>
      <nav>
        <Link to="/about">About</Link>
      </nav>

      <HomepageTemplate />
    </>
  )
}
