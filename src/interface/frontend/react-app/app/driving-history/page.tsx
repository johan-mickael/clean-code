'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getDrivingHistories, deleteDrivingHistory } from '../../api';

const DrivingHistoryPage = () => {
  const [histories, setHistories] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchDrivingHistories = async () => {
      try {
        const data = await getDrivingHistories();
        setHistories(data);
      } catch (error) {
        console.error('Erreur lors du chargement des historiques de conduite', error);
      }
    };

    fetchDrivingHistories();
  }, []);

  const handleAddHistory = () => {
    router.push('/driving-history/add');
  };

  const handleDeleteHistory = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet historique ?')) {
      try {
        await deleteDrivingHistory(id);
        setHistories(histories.filter((history) => history.id !== id));
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'historique', error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4 text-blue-600">Historique de conduite</h1>

      <button
        onClick={handleAddHistory}
        className="bg-blue-600 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-700"
      >
        Ajouter un historique
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Driver ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Bike ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Label</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {histories.length > 0 ? (
              histories.map((history) => (
                <tr key={history.id} className="hover:bg-gray-50">
                  <td className="border-t px-6 py-3 text-sm text-gray-700">{history.id}</td>
                  <td className="border-t px-6 py-3 text-sm text-gray-700">{history.driverId}</td>
                  <td className="border-t px-6 py-3 text-sm text-gray-700">{history.bikeId}</td>
                  <td className="border-t px-6 py-3 text-sm text-gray-700">{history.label}</td>
                  <td className="border-t px-6 py-3 text-sm text-gray-700 flex gap-2">
                    <button
                      onClick={() => router.push(`/driving-history/edit/${history.id}`)}
                      className="text-blue-600 hover:underline"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDeleteHistory(history.id)}
                      className="text-red-600 hover:underline"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  Aucun historique trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DrivingHistoryPage;
