import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const JobFilters = props => {
  const {
    activeSalaryRangeId,
    updateActiveSalaryRangeId,
    updateEmploymentTypesChecked,
  } = props

  const createEmploymentFilter = () =>
    employmentTypesList.map(eachType => {
      const onChangeCheckbox = event => {
        updateEmploymentTypesChecked(event.target.value)
      }

      return (
        <li key={eachType.employmentTypeId} className="filter-option">
          <input
            type="checkbox"
            name="employmentType"
            id={eachType.employmentTypeId}
            value={eachType.employmentTypeId}
            onChange={onChangeCheckbox}
          />
          <label htmlFor={eachType.employmentTypeId}>{eachType.label}</label>
        </li>
      )
    })

  const createSalaryFilter = () =>
    salaryRangesList.map(eachSalary => {
      const onChangeRadio = event => {
        updateActiveSalaryRangeId(event.target.value)
      }

      const isChecked = activeSalaryRangeId === eachSalary.salaryRangeId

      return (
        <li key={eachSalary.salaryRangeId} className="filter-option">
          <input
            type="radio"
            name="salarryRange"
            id={eachSalary.salaryRangeId}
            value={eachSalary.salaryRangeId}
            checked={isChecked}
            onChange={onChangeRadio}
          />
          <label htmlFor={eachSalary.salaryRangeId}>{eachSalary.label}</label>
        </li>
      )
    })

  return (
    <div className="job-filter-container">
      <h1>Type of Employment</h1>
      <ul>{createEmploymentFilter()}</ul>
      <hr className="separator" />
      <h1>Salary Range</h1>
      <ul>{createSalaryFilter()}</ul>
    </div>
  )
}
export default JobFilters
