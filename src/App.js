import React, { useEffect, useState } from "react"
import './App.css';
import Recipe from "./Recipe"

const App = () => {

  const APP_ID = "your id here";
  const APP_KEY = "your key here";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setquery] = useState('chicken');

  useEffect(() => {
    getRecipes();
  }, [query])

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    const data = await response.json();
    setRecipes(data.hits);
  }

  const recipesMapped = recipes.map(
    recipe => <Recipe   
      key={recipe.recipe.label}
      title={recipe.recipe.label} 
      calories={recipe.recipe.calories}
      image={recipe.recipe.image}
      ingredients={recipe.recipe.ingredients}
    />);

    const updateSearch = e => {
      setSearch(e.target.value)
      console.log(e.target.value)  
    }

    const getSearch = e => {
      e.preventDefault();
      setquery(search);
      setSearch('');
    }

  return(
    <div className="App">
      <form className="search-form" onSubmit={getSearch}>
        <input type="text" className="search-bar" value={search} onChange={updateSearch}/>
        <button type="submit" className="search-button">search</button>
      </form>
      <div className="recipes">
      {recipesMapped}
      </div>
    </div>
  )
}



export default App;
