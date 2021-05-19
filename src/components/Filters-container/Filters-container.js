import React from 'react'
import s from './Filters-container.module.scss'

//import { useProductList } from '../ProductList/useProductList'

const FiltersContainer = props => {
  return (
    <div className={s.categories}>
      {React.Children.map(props.children, child => {
        //return React.cloneElement(child, { categoryUpdate: categoryId => categoryChange(categoryId) })
        return React.cloneElement(child)
      })}
    </div>
  )
}

export default FiltersContainer
