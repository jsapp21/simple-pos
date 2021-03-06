/* eslint-disable no-debugger */
/* eslint-disable no-console */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import SelectedOption from './SelectedOption';
import { GET_USERS } from '../utils/graphQl';

const Users = () => {
  const navigate = useNavigate();
  const { data } = useQuery(GET_USERS);

  const handleChange = (e) => {
    navigate(`users/${e.target.value._id}/menus`);
  };

  return <SelectedOption data={data?.getUsers} handleChange={handleChange} />;
};

export default Users;
