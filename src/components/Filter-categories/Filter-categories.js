import FiltersContainer from '../Filters-container/Filters-container'
import Filter from '../Filter/Filter'
//import { useProductList } from '../ProductList/useProductList'
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
    return <Filter item={item} key={item.categoryId} active={false} />
  }

  return (
    <FiltersContainer>
      <Filter item={'all'} active={true} />
      {categoriesOnPage.map(renderCategory)}
    </FiltersContainer>
  )
}

export default FilterCategories
