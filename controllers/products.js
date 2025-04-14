const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({ price: { $gt: 30 } })
    .sort('price')
    .select('name price');

  res.status(200).json({ products, nbHits: products.length });
};
const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === 'true' ? true : false;
    // the first featured is  property setted to the object and the second one is the featured parameter with boolean 
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: 'i' };
    //regex here is for searching by single letter or its full name
    // i stands for to case senstaive
  }
  if (numericFilters) {
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    // because this the properties that use number values
    const options = ['price', 'rating'];
    // forEach is to iterate for the splitted array
    filters = filters.split(',').forEach((item) => {
      // the below need to know about array destructuring in our case forexampe "price-$gt-40"
      const [field, operator, value] = item.split('-');
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  let result = Product.find(queryObject);
  // why we dont use await before the Product??
  // sort
  if (sort) {
    //this is incase when sorting is morethan one
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  } else {
    result = result.sort('createdAt');
  }
  // the actual name of fiels are .select() where it is which column we want to see
  if (fields) {
        //this is incase of when fields  are morethan one
    const fieldsList = fields.split(',').join(' ');
    result = result.select(fieldsList);
  }
  // this to limit the number of rows
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  // what is skip method do ?? it is to skip to the next page
  result = result.skip(skip).limit(limit);
  // 23 items divided by 7
  // 4 pages 7 7 7 2

  const products = await result;
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
