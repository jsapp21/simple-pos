/* eslint-disable valid-typeof */
/* eslint-disable no-debugger */
/* eslint-disable no-console */
const express = require('express');

const router = express.Router();
const { ObjectId } = require('mongodb');
const items = require('../services/items.service');
const userPermissions = require('../middleware/userPermissions');
const { BadRequest, NotFound, ServerError } = require('../utils/errors');
const { Item, MenuItem } = require('../models/validation.schema');

router.post('/', userPermissions, async (req, res, next) => {
  try {
    debugger;
    const validCheck = await Item.validate(req.body);
    if (!validCheck) {
      throw new BadRequest('Bad Request');
    }
    debugger;
    const verifyItem = await items.getItemCheck(req.body);
    console.log(verifyItem);
    if (verifyItem.matchedCount > 0) {
      throw new BadRequest('Item already exsits.');
    } else {
      res.send(verifyItem);
    }

    // const verifyItem = await items.getItemCheck(req.body);
    // if (verifyItem) {
    //   res.send({ message: 'Item already exsits.' });
    // } else {
    //   const request = {
    //     menuId: new ObjectId(req.body.menuId),
    //     name: req.body.name,
    //     price: req.body.price,
    //     outOfStock: req.body.outOfStock,
    //   };
    //   const newItem = await items.postMenuItem(request);
    //   res.send(newItem);
    // }
  } catch (err) {
    next(err);
  }
});

router.get(['/', '/:id'], async (req, res, next) => {
  try {
    const menuItems = await items.getMenuItems(req.params.id);
    const validCheck = await MenuItem.validate(menuItems);
    res.send(validCheck);
  } catch (err) {
    next(err);
  }
});

router.post('/outofstock/', userPermissions, async (req, res, next) => {
  try {
    const validCheck = await Item.isValid(req.body);
    if (!validCheck) {
      throw new BadRequest('Bad Request');
    }
    const response = await items.updateOutOfStock(req.body);
    res.send(response.value);
  } catch (err) {
    next(err);
  }
});

router.delete('/delete/:id', userPermissions, async (req, res, next) => {
  try {
    const validId = ObjectId.isValid(req.params.id);
    if (!validId) {
      throw new NotFound('Item not found.');
    }
    const response = await items.deleteMenuItem(req.params.id);
    if (!response || response.deletedCount === 0) {
      throw new ServerError('Server error: Item was not found.');
    }
    res.send({ status: res.statusCode, message: 'Item has been deleted.' });
  } catch (err) {
    next(err);
  }
});

router.get('/:id/orders/', async (req, res) => {
  try {
    const validId = ObjectId.isValid(req.params.id);
    if (!validId) {
      throw new NotFound('Item not found.');
    }
    const lookUpOrders = await items.lookUpOrders(req.params.id);
    res.send(lookUpOrders);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
