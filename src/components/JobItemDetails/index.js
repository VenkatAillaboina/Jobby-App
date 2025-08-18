import {Component} from 'react'
import {IoLocationSharp} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FaStar, FaExternalLinkAlt} from 'react-icons/fa'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import NavBar from '../NavBar'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobDetails: {},
    similarJobs: [],
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const reponse = await fetch(url, options)
    if (reponse.ok) {
      const data = await reponse.json()
      const jobDetails = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        rating: data.job_details.rating,
        title: data.job_details.title,
        packagePerAnnum: data.job_details.package_per_annum,
        skills: data.job_details.skills.map(eachSkill => ({
          imageUrl: eachSkill.image_url,
          name: eachSkill.name,
        })),
        lifeAtCompany: {
          description: data.job_details.life_at_company.description,
          imageUrl: data.job_details.life_at_company.image_url,
        },
      }
      const similarJobs = data.similar_jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        jobDetails,
        similarJobs,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {jobDetails, similarJobs} = this.state
    return (
      <div className="job-item-details-container">
        <div className="job-item-details-card">
          <div className="job-header">
            <img
              src={jobDetails.companyLogoUrl}
              height={55}
              width={55}
              alt="job details company logo"
              className="company-logo"
            />
            <div className="job-title-section">
              <h1 className="job-title">{jobDetails.title}</h1>
              <p className="job-rating">
                <FaStar color="gold" height={50} width={50} />{' '}
                {jobDetails.rating}
              </p>
            </div>
          </div>
          <ul className="job-details">
            <li className="job-detail">
              <IoLocationSharp color="white" height={60} width={60} />{' '}
              <p>{jobDetails.location}</p>
            </li>
            <li className="job-detail">
              <BsBriefcaseFill color="white" height={60} width={60} />{' '}
              <p className="employment-type">{jobDetails.employmentType}</p>
            </li>
            <li className="job-detail">
              <p className="job-salary">{jobDetails.packagePerAnnum}</p>
            </li>
          </ul>
          <hr className="divider" />
          <div className="company-url">
            <h1 className="description-title">Description</h1>
            <a href={jobDetails.companyWebsiteUrl}>
              Visit <FaExternalLinkAlt />
            </a>
          </div>
          <p className="job-description">{jobDetails.jobDescription}</p>
          <h1 className="skill-title">Skills</h1>
          <ul className="job-skills">
            {jobDetails.skills.map(skill => (
              <li className="skills-list" key={skill.name}>
                <div className="skill">
                  <img
                    src={skill.imageUrl}
                    alt={skill.name}
                    className="skill-image"
                  />
                  <p>{skill.name}</p>
                </div>
              </li>
            ))}
          </ul>
          <h1 className="life-at-company-title">Life at Company</h1>
          <div className="life-at-company-container">
            <p className="life-at-company-description">
              {jobDetails.lifeAtCompany.description}
            </p>
            <img
              alt="life at company"
              src={jobDetails.lifeAtCompany.imageUrl}
              className="life-at-company-img"
            />
          </div>
        </div>
        <div>
          <h1 className="similar-jobs-title">Similar Jobs</h1>
          <ul className="similar-jobs-list">
            {similarJobs.map(job => (
              <li key={job.id} className="similar-job-item">
                <div className="job-card">
                  <div className="job-header">
                    <img
                      src={job.companyLogoUrl}
                      height={55}
                      width={55}
                      alt="similar job company logo"
                      className="company-logo"
                    />
                    <div className="job-title-section">
                      <h1 className="job-title">{job.title}</h1>
                      <p className="job-rating">
                        <FaStar color="gold" height={50} width={50} />{' '}
                        {job.rating}
                      </p>
                    </div>
                  </div>
                  <h1 className="description-title">Description</h1>
                  <p className="job-description">{job.jobDescription}</p>
                  <ul className="job-details">
                    <li className="job-detail">
                      <IoLocationSharp color="white" height={60} width={60} />{' '}
                      <p>{job.location}</p>
                    </li>
                    <li className="job-detail">
                      <BsBriefcaseFill color="white" height={60} width={60} />{' '}
                      <p className="employment-type">{job.employmentType}</p>
                    </li>
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
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
      <button
        type="button"
        className="failure-view-btn"
        onClick={this.getJobItemDetails}
      >
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
    return (
      <>
        <NavBar />
        {this.getApiStatus()}
      </>
    )
  }
}

export default JobItemDetails
