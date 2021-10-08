/* eslint-disable no-console */
/* eslint-disable import/no-cycle */
import React, { useState, createContext } from 'react';
import { Link } from 'react-router-dom';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { useFetch } from '../hooks/useFetch';
import useAppStyles from '../styles/app.css';

export const MenuContext = createContext();

const Menu = () => {
  const classes = useAppStyles();
  const [selectedMenu, setSelectedMenu] = useState();

  const handleChange = (e) => {
    setSelectedMenu(e.target.value);
    // localStorage.setItem('menuId', JSON.stringify(e.target.value._id));
    // history.push('/order');
  };

  const { data, error } = useFetch('/menus');
  if (error) return <h1>{error}</h1>;

  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel id="Menu">Menu</InputLabel>
        <Select labelId="Menu" id="select" value={selectedMenu} onChange={handleChange}>
          {data?.map((menu) => {
            return (
              <MenuItem key={menu._id} value={menu} aria-label={menu.name} aria-required="true">
                <Link
                  to={{
                    pathname: `/menu/${menu._id}`,
                  }}>
                  {menu.name}
                </Link>
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </>
  );
};

export default Menu;

// user
// localhost3000/:id

// menu
// localhost3000/menus/
// localhost3000/menu/:menuId

// items
// localhost3000/item/:itemid
