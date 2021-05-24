import s from './Search-panel.module.scss'

const SearchPanel = ({ term, handleTermChange }) => {
  const onSearchChange = e => {
    handleTermChange(e.target.value)
  }
  return (
    <div className={s.searchPanel}>
      <input type="text" placeholder="Search among products" value={term} onChange={onSearchChange} />
    </div>
  )
}

export default SearchPanel
