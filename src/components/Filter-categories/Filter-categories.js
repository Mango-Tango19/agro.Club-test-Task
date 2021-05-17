import s from './Filter-categories.module.scss'

const FilterCategories = ({ items }) => {
  const onlyUnique = (value, index, self) => {
    return self.indexOf(value) === index
  }

  //get unique categories titles
  const categoriesTitles = items.map(item => item.categoryType).filter(onlyUnique)

  let categoriesOnPage = []

  //get unique categories properties
  categoriesTitles.filter(category => {
    const item = items.find(({ categoryType }) => categoryType === category)
    const { categoryId, categoryName, categoryType } = item
    categoriesOnPage.push({ categoryId, categoryName, categoryType })
  })
  //render categories on page
  const renderCategory = item => {
    const { categoryId, categoryName, categoryType } = item
    return (
      <button className={`${s.tag}`} id={categoryId} key={categoryType}>
        {categoryName}
      </button>
    )
  }

  return (
    <div className={s.tags}>
      <button className={`${s.tag} ${s.active}`}>All</button>
      {categoriesOnPage.map(renderCategory)}
    </div>
  )
}

export default FilterCategories
