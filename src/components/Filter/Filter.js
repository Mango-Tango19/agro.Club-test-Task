import s from './Filter.module.scss'

const Filter = ({ item, categoryUpdate }) => {
  let clazz = `${s.category} `

  if (item === 'all') {
    let categoryId = 'all'
    let categoryType = 'all'
    return (
      <button id={categoryId} key={categoryType} className={clazz} onClick={() => categoryUpdate(categoryType)}>
        All
      </button>
    )
  }
  const { categoryId, categoryName, categoryType } = item
  return (
    <button id={categoryId} key={categoryType} className={clazz} onClick={() => categoryUpdate(categoryType)}>
      {categoryName}
    </button>
  )
}

export default Filter
