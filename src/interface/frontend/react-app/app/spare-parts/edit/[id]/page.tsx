'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { getSparePartByIdentifiant, updateSparePart } from '@/api';

const EditSparePartPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const router = useRouter();
  const resolvedParams = use(params);
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    quantity: 0
  });

  useEffect(() => {
    const fetchSparePart = async () => {
      try {
        const data = await getSparePartByIdentifiant(resolvedParams.id);
        setFormData({
          name: data.name,
          price: data.price,
          quantity: data.quantity
        });
      } catch (error) {
        console.error('Erreur lors du chargement de la pièce', error);
      }
    };

    fetchSparePart();
  }, [resolvedParams.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || formData.price <= 0) {
      alert('Veuillez remplir tous les champs correctement.');
      return;
    }

    try {
      await updateSparePart(resolvedParams.id, formData);
      router.push('/spare-parts');
    } catch (error) {
      console.error('Erreur lors de la modification de la pièce', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Modifier la Pièce Détachée</h1>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-2 font-semibold">
            Nom de la pièce
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="border border-gray-300 rounded-md px-4 py-2"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="price" className="mb-2 font-semibold">
            Prix (€)
          </label>
          <input
            type="number"
            id="price"
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
            className="border border-gray-300 rounded-md px-4 py-2"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="quantity" className="mb-2 font-semibold">
            Quantité en stock
          </label>
          <input
            type="number"
            id="quantity"
            value={formData.quantity}
            onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value)})}
            className="border border-gray-300 rounded-md px-4 py-2"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.push('/spare-parts')}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditSparePartPage;