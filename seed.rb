require 'pry'
require_relative './lib/connection'
require_relative './lib/tshirts'
require_relative './lib/purchases'


oneT = Tshirt.create({
  name:"wu tang",
  price: 10,
  quantity: 10,
  img_url:"http://ecx.images-amazon.com/images/I/61AahwY%2Bj7L._UL1500_.jpg"
})

twoT = Tshirt.create({
  name:"iggy azalea",
  price: 10,
  quantity: 10,
  img_url:"https://img1.etsystatic.com/043/0/9257203/il_340x270.631035637_ampf.jpg"
})

threeT = Tshirt.create({
  name:"minor threat",
  price: 10,
  quantity: 10,
  img_url:"https://fashionfades.files.wordpress.com/2010/01/minor-threat-bottled.jpg?w=297"
})

fourT = Tshirt.create({
  name: "pavement",
  price: 10,
  quantity: 10,
  img_url:"http://images.brandretailers.com/rock/assets/products/56946/large/pavement-night-falls-men-s-t-shirt-pvt12(1).jpg"
})

fiveT = Tshirt.create({
  name:"george carlin",
  price: 10,
  quantity: 10,
  img_url:"http://ecx.images-amazon.com/images/I/412UGXphwPL._SX342_.jpg"
})

sixT = Tshirt.create({
  name:"dice clay",
  price: 10,
  quantity: 10,
  img_url:"http://brooklynsteez.com/products/215097.jpg"
})
