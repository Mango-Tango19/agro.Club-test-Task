import s from './Filter.module.scss'
import { useProductList } from '../ProductList/useProductList'

const Filter = ({ item }) => {
  const { updateCategory, resetCategory } = useProductList()

  let clazz = `${s.category} `

  if (item === 'all') {
    let categoryId = 'all'
    let categoryType = 'all'

    const handleResetCategory = () => resetCategory({ category: [] })

    return (
      <button id={categoryId} key={categoryType} className={clazz} onClick={() => handleResetCategory()}>
        All
      </button>
    )
  }
  const handleUpdateCategory = categoryId => updateCategory({ category: [categoryId] })
  const { categoryId, categoryName, categoryType } = item
  return (
    <button id={categoryId} key={categoryType} className={clazz} onClick={() => handleUpdateCategory(categoryId)}>
      {categoryName}
    </button>
  )
}

export default Filter
