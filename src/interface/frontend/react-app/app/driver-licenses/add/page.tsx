'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createDriverLicense } from '../../../api';

const AddDriverLicensePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const driverId = searchParams.get('id'); // Récupère l'ID du conducteur depuis l'URL

  const [licenseClass, setLicenseClass] = useState('');
  const [stateIssued, setStateIssued] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!driverId || !licenseClass || !stateIssued || !issueDate) {
      setError('Tous les champs sont obligatoires.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await createDriverLicense({
        driverId, // Utilisation de l'ID récupéré
        licenseClass,
        stateIssued,
        issueDate,
      });
      router.push('/drivers'); // Redirige vers la liste des conducteurs après ajout
    } catch (err) {
      console.error('Erreur lors de l’ajout de la licence', err);
      setError('Une erreur est survenue lors de l’ajout de la licence.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4 text-blue-600">Ajouter une Licence de Conduite</h1>

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 shadow-md rounded-md">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Classe de Licence</label>
          <input
            type="text"
            value={licenseClass}
            onChange={(e) => setLicenseClass(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">État d'Émission</label>
          <input
            type="text"
            value={stateIssued}
            onChange={(e) => setStateIssued(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Date d'Émission</label>
          <input
            type="date"
            value={issueDate}
            onChange={(e) => setIssueDate(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Ajout en cours...' : 'Ajouter'}
        </button>
      </form>
    </div>
  );
};

export default AddDriverLicensePage;
