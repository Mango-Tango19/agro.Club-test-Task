import SerachPanel from '../Search-panel/Search-panel'
import s from './Header.module.scss'

const Header = ({ handleTermChange, term }) => {
  return (
    <div className={s.header}>
      <span>Products</span>
      <SerachPanel handleTermChange={handleTermChange} term={term} />
    </div>
  )
}

export default Header
