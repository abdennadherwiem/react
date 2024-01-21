import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';

const ModelTable = () => {
  const [models, setModels] = useState([]);

  useEffect(() => {
    // Charger les modèles depuis l'API
    axios.get('http://localhost:8080/models/all')
      .then(response => {
        setModels(response.data);
      })
      .catch(error => {
        console.error('Erreur lors du chargement des modèles :', error);
      });
  }, []); // La dépendance vide signifie que cela s'exécute uniquement une fois après le montage du composant

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nom du Modèle</TableCell>
            {/* Ajoutez d'autres colonnes en fonction de vos données de modèle */}
          </TableRow>
        </TableHead>
        <TableBody>
          {models.map(model => (
            <TableRow key={model}>
              <TableCell>{model}</TableCell>
              <TableCell>{model}</TableCell>
              {/* Ajoutez d'autres cellules en fonction de vos données de modèle */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ModelTable;
