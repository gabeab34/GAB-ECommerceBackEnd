const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    attributes: ['id', 'category_name'],
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

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk(req.params.id, {
    attributes: ['id', 'category_name'],
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

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
  .then((newCategory) => res.status(200).json(newCategory))
  .catch((err) => {
    console.log('there was an error creating a new category for the database');
    res.status(400).json(err);
  });
});

router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })

});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  const deleteProduct = Product.findByPk(req.params.id);
  Product.destroy({
    where: {
      id: req.params.id,
    }
  })
  .then((deletion) => {
    res.json(deletion)
  })
  .catch((err) => {
    res.json(err);
    console.log('There was an error deleting the product from the database')
  })
});


module.exports = router;
