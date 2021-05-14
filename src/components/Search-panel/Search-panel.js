import s from './Search-panel.module.scss'

const SearchPanel = () => {
  return (
    <div className={s.searchPanel}>
      <input type="text" placeholder="Search among products" />
    </div>
  )
}

export default SearchPanel
