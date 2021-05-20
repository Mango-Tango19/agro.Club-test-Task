import s from './Filter.module.scss'
//import { useProductList } from '../ProductList/useProductList'

const Filter = ({ item, handleChooseCategory, handleAllCategories }) => {
  ////const { updateCategory, resetCategory } = useProductList()

  let clazz = `${s.category} `

  if (item === 'all') {
    let categoryId = 'all'
    let categoryType = 'all'

    return (
      <button id={categoryId} key={categoryType} className={clazz} onClick={() => handleAllCategories()}>
        All
      </button>
    )
  }
  const { categoryId, categoryName, categoryType } = item
  return (
    <button id={categoryId} key={categoryType} className={clazz} onClick={() => handleChooseCategory(categoryId)}>
      {categoryName}
    </button>
  )
}

export default Filter
