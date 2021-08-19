import { useEffect, useState } from 'react';
import MenuItemsContainer from './components/MenuItemsContainer';
import Order from './components/Order';
import { Typography, Container } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import useAppStyles from './styles/app.css';

const App = () => {

  const classes = useAppStyles();

  const [form, setForm] = useState({ item: '', price: ''});
  const [menu, setMenu] = useState([]);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    fetch('/menus')
    .then(res => res.json())
    .then(menu => {
      setMenu(menu);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.item || form.price === ''){
      alert('Please fill out menu item and price')
    } else {
      const newItem = {
        item: form.item,
        price: parseFloat(form.price)
      };
  
      const reqObj = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem)
      };
  
      fetch('/menus', reqObj)
      .then(resp => resp.json())
      .then(item => {
        if (item.acknowledged === false) {
          alert('Error: Item was not saved. Try again.')
        } else if (item.error) {
          alert(`Error: ${item.error}`)
        } 
        else {
          setMenu([...menu, { ...newItem, _id: item.insertedId }]);
          setForm({ item: '', price: ''});
        }
      });
    }
  };

  const handleChange = (e) => {
    setForm((form) => ({
      ...form,
      [e.target.name]: e.target.value
    }))
  };

  const removeItem = (i) => {
    console.log('i was remved', i)
    let updatedOrder = order.filter(item => item._id !== i._id)
    setOrder(updatedOrder)
  };

  console.log(order)

  return (
    <>
      <Container maxWidth="md" style={{ float: 'left', marginTop: 10}}>
        <Typography variant="h5" component="h2">🍳 Simple POS</Typography>

      <form onSubmit={handleSubmit} component="div">
          <Input color="primary" placeholder="Menu Item" inputProps={{ 'aria-label': 'menu item' }} name="item" value={form.item} onChange={handleChange}/>
          <Input placeholder="$9.99" inputProps={{ 'aria-label': 'menu item price' }} name="price" value={form.price} onChange={handleChange} />
          <Button type="submit" variant="contained" color="primary" className={classes.button}>Save</Button>
      </form>
      
      <MenuItemsContainer menu={menu} order={order} setOrder={setOrder}></MenuItemsContainer>
      </Container>

      <Container maxWidth="xs" style={{ backgroundColor: "#ffff", height: '75vh', float: 'left' }}>
        <Order order={order} removeItem={removeItem}></Order>
      </Container>
    </>
  );
};

export default App;
