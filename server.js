const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const PORT = 3000;

app.set('view engine', 'ejs');

// middleware
app.use(bodyParser.urlencoded({ extended: false }));

// db
const products = require('./products');

// product index route
app.get('/products', (req, res) => {
  // res.send(products);
  res.render('indexProducts', {
    products: products
  });
});

// product new route
app.get('/products/new', (req, res) => {
  // res.send('future products');
  res.render('newProduct');
})

// product create route
app.post('/products', (req, res) => {
  console.log('CREATE route accessed');
  const price = Number(req.body.price);
  req.body.price = price;
  
  console.log('Data within req.body: ', req.body);
  products.push(req.body);
  res.redirect('/products');
});

// product show route
app.get('/products/:id', (req, res) => {
  // res.send(products[req.params.id]);
  const productIndex = req.params.id;
  const product = products[productIndex];

  if (products[productIndex]) {
    res.render('showProduct', {
      product: product
    });
  } else {
    res.render('showProduct', {
      product: {name: 'Does not exist'}
    })
  }
  
});

app.listen(PORT, () => {
  console.log("App is running on port: ", PORT);
});


