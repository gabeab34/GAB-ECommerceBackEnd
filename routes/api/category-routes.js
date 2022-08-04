const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
await Category.findAll({
    include: [{
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }]
  })
  .then((allCategories) => {
    res.json(allCategories);
  })
  .catch((err) => {
    res.json(err);
    console.log('There was an error finding all the categories from the database')
  })
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
 await Category.findByPk(req.params.id, {
    include: [{
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }]
  })
  .then((singleCategory) => {
    res.json(singleCategory);
  })
  .catch((err) => {
    res.json(err);
    console.log('There was an error finding the category from the database')
  })
});

router.post('/', async (req, res) => {
  // create a new category
 await Category.create(req.body)
  .then((newCategory) => {
    res.json(newCategory);
  })
  .catch((err) => {
     res.json
     (err);
     console.log('there was an error creating a new category for the database');
  });
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
 await Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then((updateCategory) => {
    res.json(updateCategory);
  })
   .catch ((err) => {
    res.json(err);
    console.log ('there was an error updating the category for the database')
   });
});



router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
 await Category.destroy({
    where: {
      id: req.params.id,
    }
  })
  .then((deleteCategory) => {
    res.json(deleteCategory)
  })
  .catch((err) => {
    res.json(err);
    console.log('There was an error deleting the product from the database')
  })
});


module.exports = router;
