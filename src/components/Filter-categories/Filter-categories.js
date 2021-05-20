import Filter from '../Filter/Filter'
import s from './Filter-categories.module.scss'

const FilterCategories = ({ items, handleChooseCategory, handleAllCategories }) => {
  const renderCategory = item => {
    return <Filter item={item} key={item.id} handleChooseCategory={handleChooseCategory} />
  }
  return (
    <div className={s.categories}>
      <Filter item={'all'} handleAllCategories={handleAllCategories} />
      {items.map(renderCategory)}
    </div>
  )
}

export default FilterCategories
