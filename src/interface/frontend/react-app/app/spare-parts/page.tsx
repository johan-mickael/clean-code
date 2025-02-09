'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSpareParts, deleteSparePart } from '../../api';

const SparePartsPage = () => {
  const [spareParts, setSpareParts] = useState<any[]>([]);
  const router = useRouter();

  const fetchSpareParts = async () => {
    try {
      const data = await getSpareParts();
      setSpareParts(data);
    } catch (error) {
      console.error('Erreur lors du chargement des pièces', error);
    }
  };

  useEffect(() => {
    fetchSpareParts();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette pièce ?')) {
      try {
        await deleteSparePart(id);
        fetchSpareParts();
      } catch (error) {
        console.error('Erreur lors de la suppression', error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Pièces Détachées</h1>

      <div className="flex justify-end mb-6">
        <button
          onClick={() => router.push('/spare-parts/add')}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Nouvelle Pièce
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left">Nom</th>
              <th className="px-6 py-3 text-left">Prix</th>
              <th className="px-6 py-3 text-left">Quantité en stock</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {spareParts.map((part) => (
                <tr key={part.id} className="border-t">
                <td className="px-6 py-4">{part.name}</td>
                <td className="px-6 py-4">{part.price}€</td>
                <td className="px-6 py-4">{part.quantity}</td>
                <td className="px-6 py-4 space-x-4">
                    <button
                    onClick={() => router.push(`/spare-parts/edit/${part.id}`)}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                    Modifier
                    </button>
                    <button
                    onClick={() => handleDelete(part.id)}
                    className="text-red-600 hover:text-red-800 font-medium"
                    >
                    Supprimer
                    </button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default SparePartsPage;