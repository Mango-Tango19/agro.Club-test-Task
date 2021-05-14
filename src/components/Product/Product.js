import styles from './Product.module.scss'
import { newClass, limitedClass } from './Product.module.scss'
const Product = ({ item }) => {
  function importAll(r) {
    let images = {}
    r.keys().map(item => {
      images[item.replace('./', '').replace('.png', '')] = r(item)
    })
    return images
  }
  const images = importAll(require.context('../../assets/crops', false, /\.(png)$/))

  const newTag = <span className={`${styles.tag} ${newClass}`}>New</span>
  const limitedTag = <span className={`${styles.tag} ${limitedClass}`}>Limited</span>

  const { categoryName, name, description, price, discount, isLimited, isNew } = item

  const discountTag = <span className={styles.discount}>Discount {discount} per bag</span>

  const renderTag = (property, tag) => {
    return property ? tag : null
  }

  return (
    <div className={styles.productContainer}>
      <img src={images[categoryName].default} />
      <div className={styles.productCard}>
        <div className={styles.details}>
          <div className={styles.category}>
            <span className={styles.categoryName}>{categoryName}</span>
            {renderTag(isLimited, limitedTag)}
            {renderTag(isNew, newTag)}
          </div>
          <div className={styles.name}>
            <span>{name}</span>
          </div>
          <div className={styles.description}>
            <span>{description}</span>
          </div>
          <div className={styles.priceInfo}>
            <span className={styles.price}>${price}</span>
            {renderTag(discount, discountTag)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product
