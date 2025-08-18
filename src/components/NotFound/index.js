import './index.css'

const NotFound = () => (
  <div className="not-found-page-bg-container">
    <img
      alt="not found"
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      className="not-found-image"
    />
    <h1 className="not-found-page-title">Page Not Found</h1>
    <p className="not-found-page-description">
      we are sorry, the page you requested could not be found
    </p>
  </div>
)

export default NotFound
