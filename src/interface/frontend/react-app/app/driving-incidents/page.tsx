'use client';

import React, { useState, useEffect } from 'react';
import { getDrivingIncidents, deleteDrivingIncident } from '../../api';
import { useRouter } from 'next/navigation';

const DrivingIncidentsPage = () => {
  const [incidents, setIncidents] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchDrivingIncidents = async () => {
      try {
        const data = await getDrivingIncidents();
        setIncidents(data);
      } catch (error) {
        console.error('Erreur lors du chargement des incidents de conduite', error);
      }
    };

    fetchDrivingIncidents();
  }, []);

  const handleAddIncident = () => {
    router.push('/driving-incidents/add');
  };

  const handleDeleteIncident = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet incident ?')) {
      try {
        await deleteDrivingIncident(id);
        setIncidents(incidents.filter((incident) => incident.id !== id));
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'incident', error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4 text-blue-600">Incidents de conduite</h1>

      <button
        onClick={handleAddIncident}
        className="bg-blue-600 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-700"
      >
        Ajouter un incident
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Historique Conduite ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Label</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Commentaires</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {incidents.length > 0 ? (
              incidents.map((incident) => (
                <tr key={incident.id} className="hover:bg-gray-50">
                  <td className="border-t px-6 py-3 text-sm text-gray-700">{incident.id}</td>
                  <td className="border-t px-6 py-3 text-sm text-gray-700">{incident.drivingHistoryId}</td>
                  <td className="border-t px-6 py-3 text-sm text-gray-700">{incident.label}</td>
                  <td className="border-t px-6 py-3 text-sm text-gray-700">{incident.comments}</td>
                  <td className="border-t px-6 py-3 text-sm text-gray-700 flex gap-2">
                    <button
                      onClick={() => router.push(`/driving-incidents/edit/${incident.id}`)}
                      className="text-blue-600 hover:underline"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDeleteIncident(incident.id)}
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
                  Aucun incident trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DrivingIncidentsPage;
