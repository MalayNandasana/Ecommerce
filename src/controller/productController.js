const express = require("express");
const Product = require("../model/product");

module.exports.addProduct = async (req, res) => {
    try {
        const param = {
            userId: req.user._id,
            ...req.body
        }
      const isProductExist = await Product.findOne({
          name: param.name,
      })
        if(isProductExist){
          return res.status(400).send({
              error: "Product already exist"
          })
        }

      const productSave = await Product.create(param);
      res.status(201).send(productSave);
    } catch (e) {
      res.status(400).send(e.message);
    }
  };
  
  module.exports.getProduct = async (req, res) => {
    try {
      const products = await Product.find({})
      res.status(201).send(products);
    } catch (e) {
      res.status(400).send(e.message);
    }
  };

  module.exports.deleteProduct = async (req, res) => {
    try {
        
      const isProductExist = await Product.findOne({
          _id: req.body.id,
          userId: req.user._id
      })
        if(!isProductExist){
          return res.status(400).send({
              error: "Product not exist"
          })
        }

      const productSave = await Product.deleteOne({_id:isProductExist._id});
      res.status(201).send(productSave);
    } catch (e) {
      res.status(400).send(e.message);
    }
  };