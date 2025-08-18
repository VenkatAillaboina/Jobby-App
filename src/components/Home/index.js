import {Link} from 'react-router-dom'
import NavBar from '../NavBar'

import './index.css'

const Home = () => (
  <>
    <NavBar />
    <div className="home-container">
      <div className="home-page">
        <div className="home-page-content">
          <h1>Find the Job That Fits Your Life</h1>
          <p>
            Millions of people are searching for jobs, salary information ,
            company reviews. Find the job that fits your abilities and potential
          </p>
          <Link to="/jobs">
            <button type="button" className="find-jobs-button">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </div>
  </>
)

export default Home
