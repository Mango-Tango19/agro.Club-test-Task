import styles from './ProductList.module.scss'
import { useProductList } from './useProductList'
import Product from '../Product/Product'
import Loader from '../Loader/Loader'
import ErrorIndicator from '../Error-indicator/Error-indicator'

const ProductList = () => {
  const { items, filter, status, updateFilter, loading, error } = useProductList()

  const handleFilterIsNewUpdate = () => updateFilter({ isNew: !filter.isNew })

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <ErrorIndicator />
  }

  return (
    <div className={styles.root}>
      <div className={styles.filtersContainer}>
        <div>Filters placeholder</div>
        <div>
          <label htmlFor="is_new">Is new</label>
          <input id="is_new" type="checkbox" onChange={handleFilterIsNewUpdate} checked={filter.isNew} />
        </div>
      </div>
      <div>Status: {status}</div>
      <div className={styles.itemsContainer}>
        {items.map(item => (
          <Product item={item} key={item.id} />
        ))}
      </div>
    </div>
  )
}

export default ProductList
