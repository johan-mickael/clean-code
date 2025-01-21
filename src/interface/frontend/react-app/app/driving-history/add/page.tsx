'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getDrivingHistories, addDrivingIncident } from '../../../api';

const AddDrivingIncidentPage = () => {
  const [drivingHistories, setDrivingHistories] = useState<any[]>([]);
  const [drivingHistoryId, setDrivingHistoryId] = useState('');
  const [label, setLabel] = useState('');
  const [comments, setComments] = useState('');
  const router = useRouter();

  // Récupérer les historiques de conduite
  useEffect(() => {
    const fetchDrivingHistories = async () => {
      try {
        const data = await getDrivingHistories();
        setDrivingHistories(data);
      } catch (error) {
        console.error('Erreur lors du chargement des historiques de conduite', error);
      }
    };

    fetchDrivingHistories();
  }, []);

  // Soumettre le formulaire d'incident
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!drivingHistoryId || !label || !comments) {
      alert('Tous les champs sont obligatoires');
      return;
    }

    try {
      await addDrivingIncident(parseInt(drivingHistoryId), label, comments);
      router.push('/driving-incidents');
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'incident', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4 text-blue-600">Ajouter un incident de conduite</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Sélectionner l'historique de conduite */}
        <div>
          <label htmlFor="drivingHistoryId" className="block text-sm font-medium text-gray-700">
            Historique de conduite
          </label>
          <select
            id="drivingHistoryId"
            value={drivingHistoryId}
            onChange={(e) => setDrivingHistoryId(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Sélectionner un historique de conduite</option>
            {drivingHistories.map((history) => (
              <option key={history.id} value={history.id}>
                {history.id}
              </option>
            ))}
          </select>
        </div>

        {/* Label de l'incident */}
        <div>
          <label htmlFor="label" className="block text-sm font-medium text-gray-700">
            Label
          </label>
          <input
            type="text"
            id="label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Commentaires de l'incident */}
        <div>
          <label htmlFor="comments" className="block text-sm font-medium text-gray-700">
            Commentaires
          </label>
          <textarea
            id="comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Bouton de soumission */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
};

export default AddDrivingIncidentPage;
