import Filter from '../Filter/Filter'
import s from './Filter-categories.module.scss'
import { MyContext } from '../ProductList/ProductList'
import { useContext } from 'react'

const FilterCategories = ({ items, handleChooseCategory }) => {
  let activeCategory = useContext(MyContext)

  let allActive = true
  activeCategory.length === 0 ? allActive : (allActive = false)

  const renderCategory = item => {
    let active =
      activeCategory
        .join(',')
        .split(',')
        .indexOf(item.id) > -1
        ? true
        : false

    return <Filter item={item} key={item.id} handleChooseCategory={handleChooseCategory} active={active} />
  }
  const allCategoriesFilter = {
    id: 'all',
    type: 'all',
    name: 'All',
  }
  return (
    <div className={s.categories}>
      <Filter item={allCategoriesFilter} handleChooseCategory={handleChooseCategory} active={allActive} />
      {items.map(renderCategory)}
    </div>
  )
}

export default FilterCategories
