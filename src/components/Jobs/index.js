import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BsSearch, BsBriefcaseFill} from 'react-icons/bs'
import {FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import NavBar from '../NavBar'
import UserProfile from '../UserProfile'
import JobFilters from '../JobFilters'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    employmentTypesChecked: [],
    activeSalaryRangeId: '',
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
    jobs: [],
  }

  componentDidMount() {
    this.getJobs()
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearch = () => {
    this.getJobs()
  }

  updateActiveSalaryRangeId = id => {
    this.setState({activeSalaryRangeId: id}, this.getJobs)
  }

  updateEmploymentTypesChecked = id => {
    const {employmentTypesChecked} = this.state
    let updatedList = []
    if (employmentTypesChecked.includes(id)) {
      updatedList = employmentTypesChecked.filter(eachType => eachType !== id)
    } else {
      updatedList = [...employmentTypesChecked, id]
    }
    this.setState({employmentTypesChecked: updatedList}, this.getJobs)
  }

  getJobs = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {employmentTypesChecked, activeSalaryRangeId} = this.state
    const {searchInput} = this.state
    const employmentType = employmentTypesChecked.join(',')
    console.log(employmentType)
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${activeSalaryRangeId}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const reponse = await fetch(url, options)
    if (reponse.ok) {
      const data = await reponse.json()
      const jobs = data.jobs.map(eachJobItem => ({
        id: eachJobItem.id,
        companyLogoUrl: eachJobItem.company_logo_url,
        employmentType: eachJobItem.employment_type,
        jobDescription: eachJobItem.job_description,
        location: eachJobItem.location,
        packagePerAnnum: eachJobItem.package_per_annum,
        rating: eachJobItem.rating,
        title: eachJobItem.title,
      }))
      this.setState({jobs, apiStatus: apiStatusConstants.success})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {jobs} = this.state
    if (jobs.length === 0) {
      return (
        <div className="failure-view">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
          />
          <h1 className="failure-view-title">No Jobs Found</h1>
          <p className="failure-view-text">
            We could not find any jobs. Try other filters
          </p>
        </div>
      )
    }
    return (
      <ul className="jobs-list">
        {jobs.map(job => (
          <li key={job.id}>
            <Link to={`/jobs/${job.id}`} className="job-item">
              <div className="job-card">
                <div className="job-header">
                  <img
                    src={job.companyLogoUrl}
                    height={55}
                    width={55}
                    alt="company logo"
                    className="company-logo"
                  />
                  <div className="job-title-section">
                    <h1 className="job-title">{job.title}</h1>
                    <p className="job-rating">
                      <FaStar color="gold" height={50} width={50} />
                      {job.rating}
                    </p>
                  </div>
                </div>
                <ul className="job-details">
                  <li className="job-detail">
                    <IoLocationSharp color="white" height={60} width={60} />
                    <p>{job.location}</p>
                  </li>
                  <li className="job-detail">
                    <BsBriefcaseFill color="white" height={60} width={60} />
                    <p className="employment-type">{job.employmentType}</p>
                  </li>
                  <li className="job-salary">{job.packagePerAnnum}</li>
                </ul>
                <hr className="divider" />
                <h1 className="description-title">Description</h1>
                <p className="job-description">{job.jobDescription}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="failure-view-title">Oops! Something Went Wrong</h1>
      <p className="failure-view-text">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" className="failure-view-btn" onClick={this.getJobs}>
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loading-view-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  getApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {activeSalaryRangeId} = this.state
    return (
      <>
        <NavBar />
        <div className="jobs-page">
          <div className="job-search-container">
            <input
              type="search"
              className="search-input"
              placeholder="Search"
              onChange={this.onChangeSearchInput}
            />
            <button
              type="button"
              className="serach-button"
              onClick={this.onClickSearch}
              data-testid="searchButton"
            >
              <BsSearch color="white" height={50} width={50} />
            </button>
          </div>
          <div className="job-page-inner-container">
            <div className="jobs-page-sidebar">
              <UserProfile />
              <hr className="separator" />
              <JobFilters
                activeSalaryRangeId={activeSalaryRangeId}
                updateActiveSalaryRangeId={this.updateActiveSalaryRangeId}
                updateEmploymentTypesChecked={this.updateEmploymentTypesChecked}
              />
            </div>
            <div className="jobs-content">{this.getApiStatus()}</div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
