import styles from './ProductList.module.scss'
import { useProductList } from './useProductList'
import Product from '../Product/Product'
import Loader from '../Loader/Loader'
import ErrorIndicator from '../Error-indicator/Error-indicator'
import Header from '../Header/Header'
import React from 'react'
import filterIcon from '../../assets/icons/filters.svg'
import FilterCategories from '../Filter-categories/Filter-categories'

const ProductList = () => {
  const { items, filter, status, updateFilter, loading, error, updateCategory, resetCategory } = useProductList()

  const handleFilterIsNewUpdate = () => updateFilter({ isNew: !filter.isNew })
  const handleFilterIsLimitedUpdate = () => updateFilter({ isLimited: !filter.isLimited })

  const handleChooseCategory = categoryId => updateCategory({ category: [categoryId] })
  const handleAllCategories = () => resetCategory({ category: [] })

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <ErrorIndicator />
  }

  return (
    <React.Fragment>
      <Header />
      <div className={styles.root}>
        <div className={styles.filters}>
          <div className={styles.filtersHeader}>
            <img src={filterIcon} />
            <span>Filters</span>
          </div>

          <div className={styles.filtersContent}>
            <div className={styles.filtersCategory}>
              <span className={styles.filtersTitle}>Category</span>
              <FilterCategories
                items={items}
                handleChooseCategory={handleChooseCategory}
                handleAllCategories={handleAllCategories}
              />
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
        <span>Status: {status}</span>
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
