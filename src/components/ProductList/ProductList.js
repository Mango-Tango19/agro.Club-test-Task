import styles from './ProductList.module.scss'
import { useProductList } from './useProductList'
import Product from '../Product/Product'
import Loader from '../Loader/Loader'
import ErrorIndicator from '../Error-indicator/Error-indicator'
import Header from '../Header/Header'
import React from 'react'
import filterIcon from '../../assets/icons/filters.svg'
import FilterCategories from '../Filter-categories/Filter-categories'
import EmptyPage from '../Empty-page/Empty-page'

export const MyContext = React.createContext()

const ProductList = () => {
  const {
    items,
    categories,
    filter,
    updateFilter,
    loading,
    error,
    updateCategory,
    resetCategory,
    searchItems,
  } = useProductList()

  const handleFilterIsNewUpdate = () => updateFilter({ isNew: !filter.isNew })
  const handleFilterIsLimitedUpdate = () => updateFilter({ isLimited: !filter.isLimited })

  const handleChooseCategory = categoryId => {
    if (categoryId === 'all') {
      resetCategory({ category: [] })
      return
    }
    updateCategory({ category: [categoryId] })
  }

  const handleTermChange = val => {
    searchItems({ term: val })
  }

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <ErrorIndicator />
  }

  return (
    <React.Fragment>
      <Header handleTermChange={handleTermChange} term={filter.term} />

      <div className={styles.root}>
        <div className={styles.filters}>
          <div className={styles.filtersHeader}>
            <img src={filterIcon} />
            <span>Filters</span>
          </div>
          <div className={styles.filtersContent}>
            <div className={styles.filtersCategory}>
              <span className={styles.filtersTitle}>Category</span>
              <MyContext.Provider value={filter.category}>
                <FilterCategories items={categories} handleChooseCategory={handleChooseCategory} />
              </MyContext.Provider>
            </div>
            <div className={styles.filtersStatus}>
              <span className={styles.filtersTitle}>Status</span>

              <div className={styles.filtersNew}>
                <input
                  id="is_new"
                  type="checkbox"
                  className={styles.customCheckbox}
                  onChange={handleFilterIsNewUpdate}
                  checked={filter.isNew}
                />
                <label htmlFor="is_new">New</label>
              </div>
              <div className={styles.filtersLimited}>
                <input
                  id="is_limited"
                  type="checkbox"
                  className={styles.customCheckbox}
                  onChange={handleFilterIsLimitedUpdate}
                  checked={filter.isLimited}
                />
                <label htmlFor="is_limited">Limited</label>
              </div>
            </div>
          </div>
        </div>
        {items.length === 0 ? <EmptyPage /> : null}
        <div className={styles.itemsContainer}>
          {items.map(item => (
            <Product item={item} key={item.id} />
          ))}
        </div>
      </div>
    </React.Fragment>
  )
}

export default ProductList
