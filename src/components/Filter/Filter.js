import s from './Filter.module.scss'

const Filter = ({ item, handleChooseCategory, handleAllCategories }) => {
  let clazz = `${s.category} `

  if (item === 'all') {
    let id = 'all'
    let type = 'all'

    return (
      <button id={id} key={type} className={clazz} onClick={() => handleAllCategories()}>
        All
      </button>
    )
  }
  const { id, name, type } = item
  return (
    <button id={id} key={type} className={clazz} onClick={() => handleChooseCategory(id)}>
      {name}
    </button>
  )
}

export default Filter
