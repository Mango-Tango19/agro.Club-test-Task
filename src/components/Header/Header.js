import SerachPanel from '../Search-panel/Search-panel'
import s from './Header.module.scss'

const Header = () => {
  return (
    <div className={s.header}>
      <span>Products</span>
      <SerachPanel />
    </div>
  )
}

export default Header
