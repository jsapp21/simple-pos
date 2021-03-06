/* eslint-disable import/named */
/* eslint-disable no-debugger */
/* eslint-disable import/no-cycle */
/* eslint-disable no-console */
/* eslint-disable no-shadow */
import React, { useState, createContext } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import { Button, Menu, MenuItem } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { GET_ITEMS } from '../utils/graphQl';

export const MenuItemsContext = createContext();
MenuItemsContext.displayName = 'MenuItemsContext';

const Dashboard = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { menuId } = useParams();

  const { data, error } = useQuery(GET_ITEMS, {
    variables: { menuId },
  });

  if (error) return <h1>{error.message}</h1>;

  return (
    <>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        style={{ float: 'left' }}>
        Options
      </Button>
      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={() => setAnchorEl(null)} id="Order">
          <Link to="order">Order</Link>
        </MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)} id="Menu Options">
          <Link to="items">Menu Options</Link>
        </MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)} id="Reports">
          <Link to="reports">Reports</Link>
        </MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)} id="Log Off">
          <Link to="/">Log Out</Link>
        </MenuItem>
      </Menu>

      <MenuItemsContext.Provider value={{ data }}>
        <Outlet />
      </MenuItemsContext.Provider>
    </>
  );
};

export default Dashboard;
