import { useEffect, useState } from "react";

import categoryService from '../services/category';

const Category = ( props ) => {
    const category = props.category
    return(
        <div>
            {category.name}
            <CategoryUp 
                category = {category} 
                allCategories = {props.allCategories}     
                setAllCategories={props.setAllCategories}
            />
            <RemoveCategory 
                id={category.id} 
                allCategories={props.allCategories} 
                setAllCategories={props.setAllCategories} 
            />
        </div>
    )
}

const CategoryUp = (props) => {
    const moveUp = (props) => {
        const categoryToUp = props.category
        
        props.allCategories.map(c => {
            if (c.index == categoryToUp.index - 1) {
              const categoryToUpObject = {
                name: categoryToUp.name,
                index: c.index
              }
              const categoryToDownObject = {
                name: c.name,
                index: categoryToUp.index
              }
              categoryService
                .update(categoryToUp.id, categoryToUpObject)

              categoryService
                .update(c.id, categoryToDownObject)            
            }    
        })
    }
    return(
        <>
            <button onClick={() => 
              moveUp(props)
              }> /\ </button>
        </>
    )
}

const RemoveCategory = (props) => {
    const removeCategoryByID = (props) => {
        categoryService
            .remove(props.id)
            .then(() => {
              props.setAllCategories(
                props.allCategories.filter(
                  c => c.id !== props.id
                )
              )
            })
    }

    return(
        <>
            <button onClick={() => 
              removeCategoryByID(props)
              }> X </button>
        </>
    )
}

const NewCategory = (props) => {
    const army_id = props.army_id
    const [newCategory, setNewCategory] = useState('')

    const handleCategoryChange = (event) => {
      setNewCategory(event.target.value)
    }
  
    const addNewCategory = (event) => {
      event.preventDefault()
      const categoryObject = {
        name: newCategory,
        index: (props.allCategories.length + 1),
        armyId: army_id
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

const Categories = (props) => {
    const sortedCategories = (props.allCategories.sort((a, b) => a.index - b.index))

    return(
        <div>
            {sortedCategories.map(category =>
                <div key={category.id}>
                    <Category 
                        category={category} 
                        allCategories={props.allCategories} 
                        setAllCategories={props.setAllCategories} 
                    /> 
                </div>
            )}
            <NewCategory army_id={props.army_id} allCategories={props.allCategories} setAllCategories={props.setAllCategories}/>
        </div>
    )
}

export default Categories