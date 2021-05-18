import s from './Filter.module.scss'
import { useProductList } from '../ProductList/useProductList'

const Filter = ({ item, categoryUpdate }) => {
  const { resetCategory } = useProductList()

  let clazz = `${s.category} `

  if (item === 'all') {
    let categoryId = 'all'
    let categoryType = 'all'
    return (
      <button id={categoryId} key={categoryType} className={clazz} onClick={() => resetCategory()}>
        All
      </button>
    )
  }
  const { categoryId, categoryName, categoryType } = item
  return (
    <button id={categoryId} key={categoryType} className={clazz} onClick={() => categoryUpdate(categoryId)}>
      {categoryName}
    </button>
  )
}

export default Filter
