const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const path = require("path");
const PORT = process.env.PORT || 8000;

// Middleware

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/build")));
}

console.log(__dirname);
console.log(path.join(__dirname, "/build"));*/
// CRUD routes

// Route to test routing

app.get("/", function (req, res) {
  const f =
    "<html><head></head><body><form method='put' action='putrecipe'>ID:<input name='recipe_id' value='1'/><input name='description' value='Not found'/><input type='submit'/></form></body></html>";
  res.send(f);
  res.end();
});

//  Post Recipe

app.post("/recipe", async (req, res) => {
  try {
    const { description } = req.body;
    const newRecipe = await pool.query(
      "INSERT INTO recipe (owner, description) VALUES('test', $1) RETURNING *",
      [description]
    );
    res.json(newRecipe.rows[0]);
    res.end();
  } catch (error) {
    console.error(error.message);
  }
});

// Get all recipes

app.get("/recipe", async (req, res) => {
  try {
    const allRecipes = await pool.query("SELECT * FROM recipe");
    res.json(allRecipes.rows);
    res.end();
  } catch (error) {
    console.error(error.message);
  }
});

// Get a recipe by ID

app.get("/recipe/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await pool.query(
      "SELECT * FROM recipe WHERE recipe_id = $1",
      [id]
    );

    res.json(recipe.rows[0]);
    res.end();
  } catch (error) {
    console.error(error.message);
  }
});

// Delete a recipe

app.delete("/recipe/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const removeRecipe = await pool.query(
      "DELETE FROM recipe WHERE recipe_id = $1",
      [id]
    );
    res.json("Recipe deleted");
    res.end();
  } catch (error) {
    console.log(error.message);
  }
});

// Update a recipe

app.put("/recipe/:id/:description", async (req, res) => {
  try {
    const { id, description } = req.params;
    const updateRecipe = await pool.query(
      "UPDATE recipe SET description = $1 WHERE recipe_id = $2",
      [description, id]
    );
    console.log("recipe updated");
    res.json("recipe updated");
    res.end();
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});

module.exports = app;
