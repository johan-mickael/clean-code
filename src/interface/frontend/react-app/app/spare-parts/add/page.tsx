'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createSparePart } from '../../../api';

const AddSparePartPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    quantity: 0
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || formData.price <= 0) {
      alert('Veuillez remplir tous les champs correctement.');
      return;
    }

    try {
      await createSparePart(formData);
      router.push('/spare-parts');
    } catch (error) {
      console.error('Erreur lors de la création de la pièce', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Nouvelle Pièce Détachée</h1>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-2 font-semibold">Nom de la pièce</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="border border-gray-300 rounded-md px-4 py-2"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="price" className="mb-2 font-semibold">Prix (€)</label>
          <input
            type="number"
            id="price"
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
            className="border border-gray-300 rounded-md px-4 py-2"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="quantity" className="mb-2 font-semibold">Quantité en stock</label>
          <input
            type="number"
            id="quantity"
            value={formData.quantity}
            onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value)})}
            className="border border-gray-300 rounded-md px-4 py-2"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Créer la pièce
        </button>
      </form>
    </div>
  );
};

export default AddSparePartPage;