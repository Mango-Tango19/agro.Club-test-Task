import s from './Filter.module.scss'

const Filter = ({ item, handleChooseCategory, active }) => {
  let clazz = `${s.category} ${active ? s.active : ''}`

  const { id, name, type } = item

  return (
    <button id={id} key={type} className={clazz} onClick={() => handleChooseCategory(id)}>
      {name}
    </button>
  )
}

export default Filter
