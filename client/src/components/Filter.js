/* eslint-disable no-console */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { TextField } from '@material-ui/core';
import { ordersPropTypes } from '../propTypes/schema';

const Filter = ({ ordersData, callback }) => {
  const [search, setSearch] = useState('');
  const searchedOrders = ordersData.filter((report) => report.createdOn.includes(search.toUpperCase()));

  return (
    <TextField
      id="outlined-basic"
      label="Serach your orders"
      variant="outlined"
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
        if (searchedOrders.length === 0) {
          callback(ordersData);
        } else {
          callback(searchedOrders);
        }
      }}
    />
  );
};

Filter.propTypes = {
  ordersData: PropTypes.arrayOf(ordersPropTypes),

  callback: PropTypes.func,
};

Filter.defaultProps = {
  ordersData: [],
  callback: null,
};

export default Filter;
