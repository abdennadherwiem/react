import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';

const TitleTable = () => {
  const [titles, setTitles] = useState([]);

  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const response = await axios.get('http://localhost:8080/titles/all');
        setTitles(response.data);
        console.log(response.data); // Ajoutez cette ligne pour déboguer
      } catch (error) {
        console.error('Error fetching titles:', error.message);
      }
    };
  
    fetchTitles();
  }, []);
  

  return (
    <div>
      <h1>List of Titles</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {titles.map((title) => (
              <TableRow key={title}>
                <TableCell>{title}</TableCell>
                <TableCell>{title}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TitleTable;










