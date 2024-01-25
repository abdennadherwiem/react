import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

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

  const handleDeleteModel = async (modelId) => {
    try {
      await axios.delete(`http://localhost:8080/models/delete/${modelId}`);
      // Mettre à jour la liste des modèles après la suppression
      const updatedModels = models.filter((model) => model.id !== modelId);
      setModels(updatedModels);
    } catch (error) {
      console.error('Erreur lors de la suppression du modèle :', error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nom du Modèle</TableCell>
            <TableCell>Action</TableCell>
            {/* Ajoutez d'autres colonnes en fonction de vos données de modèle */}
          </TableRow>
        </TableHead>
        <TableBody>
          {models.map(model => (
            <TableRow key={model}>
             
              <TableCell>{model.name}</TableCell>
              <TableCell>{model.id}</TableCell>
              <TableCell>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDeleteModel(model.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
              {/* Ajoutez d'autres cellules en fonction de vos données de modèle */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ModelTable;
