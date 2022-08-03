const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({    
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
        through: 'ProductTag'
      }
    ]
})
  .then((allTags) => {
    res.json(allTags);
  })
  .catch((err) => {
    res.json(err);
    console.log('there was an error finding all tags');
  })
});


router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findByPk(req.params.id, {
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
        through: 'ProductTag'
      }
    ]
  })
  .then((singleTag) => {
    res.json(singleTag);
  })
  .catch((err) => {
    res.json(err);
    console.log('there was an error finding the single tag');
  })
});


router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
  .then((newTag) => {
    res.json(newTag);
  })
  .catch((err) => {
     res.json(err);
     console.log('there was an error creating a new tag for the database');
  });
});


router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
