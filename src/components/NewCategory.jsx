import { useState, useEffect } from "react"

import categoryService from '../services/category'

const NewCategory = (props) => {

    const [newCategory, setNewCategory] = useState('')

    const handleCategoryChange = (event) => {
      setNewCategory(event.target.value)
    }
  
    const addNewCategory = (event) => {
      event.preventDefault()
      const categoryObject = {
        name: newCategory
      }
      categoryService
        .create(categoryObject)
          .then(returnedCategory => {
            props.setAllCategories(props.allCategories.concat(returnedCategory))
            setNewCategory('')  
      })
    }

    return(
        <div>
        <form onSubmit={addNewCategory}>
          <input
            value={newCategory}
            onChange={handleCategoryChange}
          />
          <button type="submit">add</button>
        </form>
      </div>
    )
}

export default NewCategory