'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSpareOrders, getSpareParts, deleteSpareOrder } from '../../api';

const SpareOrdersPage = () => {
  const [spareOrders, setSpareOrders] = useState<any[]>([]);
  const [spareParts, setSpareParts] = useState<any[]>([]);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const [ordersData, partsData] = await Promise.all([
        getSpareOrders(),
        getSpareParts()
      ]);
      setSpareOrders(ordersData);
      setSpareParts(partsData);
    } catch (error) {
      console.error('Erreur lors du chargement des données', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getSparePartName = (spareId: string) => {
    const sparePart = spareParts.find(part => part.id === spareId);
    return sparePart ? sparePart.name : 'Pièce inconnue';
  };

  const handleDelete = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette commande ?')) {
      try {
        await deleteSpareOrder(id);
        fetchData(); // Rafraîchir la liste après suppression
      } catch (error) {
        console.error('Erreur lors de la suppression', error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Commandes de Pièces</h1>

      <div className="flex justify-end mb-6">
        <button
          onClick={() => router.push('/spare-orders/add')}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Nouvelle Commande
        </button>
      </div>

      <div className="container mx-auto p-4">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left">Pièce</th>
              <th className="px-6 py-3 text-left">Quantité</th>
              <th className="px-6 py-3 text-left">Prix</th>
              <th className="px-6 py-3 text-left">Délai</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {spareOrders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="px-6 py-4">{getSparePartName(order.spareId)}</td>
                <td className="px-6 py-4">{order.quantity}</td>
                <td className="px-6 py-4">{order.price}€</td>
                <td className="px-6 py-4">{order.deliveryDelayDays} jours</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDelete(order.id)}
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

export default SpareOrdersPage;