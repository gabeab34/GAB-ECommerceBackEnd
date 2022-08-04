const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
 await Tag.findAll({    
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


router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
 await Tag.findByPk(req.params.id, {
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


router.post('/', async (req, res) => {
  // create a new tag
 await Tag.create(req.body)
  .then((newTag) => {
    res.json(newTag);
  })
  .catch((err) => {
     res.json(err);
     console.log('there was an error creating a new tag for the database');
  });
});


router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
 await Tag.update({
    tag_name: req.body.tag_name,
  },
  { 
    where: {
      id:req.params.id,
    },
   })
   .then((updateTag) => {
    res.json(updateTag);
  })
   .catch ((err) => {
    res.json(err);
    console.log ('there was an error updating the tag for the database')
   });
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
 await Tag.destroy({
    where: {
      id: req.params.id,
    }
    })
    .then((deleteTag) => {
      res.json(deleteTag);
    })
    .catch((err) => {
      res.json(err);
      console.log ('there was an error deleting the tag from the database')
    })
  });

module.exports = router;
