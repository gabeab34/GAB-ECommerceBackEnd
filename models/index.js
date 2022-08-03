// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category

// Categories have many Products

// Products belongToMany Tags (through ProductTag)

// Tags belongToMany Products (through ProductTag)
Product.belongsTo(Category);

Category.hasMany(Product);

Product.belongsToMany(Tag, {
  through: {
    model: ProductTag,
    foreignKey: 'product_id'
  }
})

Tag.belongsToMany(Product, {
  through: {
    model: ProductTag,
    foreignKey: 'tag_id'
  }
})


module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
