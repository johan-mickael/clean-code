'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getDrivingHistories, createDrivingIncident } from '../../../api';

const AddDrivingIncidentPage = () => {
  const [drivingHistories, setDrivingHistories] = useState<any[]>([]);
  const [drivingHistoryId, setDrivingHistoryId] = useState('');
  const [label, setLabel] = useState('');
  const [comments, setComments] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!drivingHistoryId || !label || !comments) {
      setError('Tous les champs sont obligatoires.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const newIncident = { drivingHistoryId: drivingHistoryId, label, comments };
      await createDrivingIncident(newIncident);
      router.push('/driving-incidents');
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'incident', error);
      setError('Une erreur est survenue lors de l\'ajout de l\'incident.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4 text-blue-600">Ajouter un incident de conduite</h1>

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 shadow-md rounded-md">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Historique de conduite</label>
          <select
            id="drivingHistoryId"
            value={drivingHistoryId}
            onChange={(e) => setDrivingHistoryId(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
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

        <div className="mb-4">
          <label htmlFor="label" className="block text-gray-700 font-bold mb-2">Label</label>
          <input
            type="text"
            id="label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="comments" className="block text-gray-700 font-bold mb-2">Commentaires</label>
          <textarea
            id="comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Ajout en cours...' : 'Enregistrer'}
        </button>
      </form>
    </div>
  );
};

export default AddDrivingIncidentPage;
