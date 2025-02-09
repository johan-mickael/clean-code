'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createSpareOrder, getSpareParts } from '../../../api';

const AddSpareOrderPage = () => {
  const router = useRouter();
  const [spareParts, setSpareParts] = useState<any[]>([]);
  const [orderForm, setOrderForm] = useState({
    spareId: '',
    quantity: 0,
    price: 0,
    deliveryDelayDays: 0
  });

  useEffect(() => {
    const fetchSpareParts = async () => {
      try {
        const data = await getSpareParts();
        setSpareParts(data);
      } catch (error) {
        console.error('Erreur lors du chargement des pièces', error);
      }
    };

    fetchSpareParts();
  }, []);

  const handleSparePartChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPartId = e.target.value;
    const selectedPart = spareParts.find(part => part.id === selectedPartId);
    
    setOrderForm({
      ...orderForm,
      spareId: selectedPartId,
      price: selectedPart ? selectedPart.price * orderForm.quantity : 0
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!orderForm.spareId || orderForm.quantity <= 0) {
      alert('Veuillez remplir tous les champs correctement.');
      return;
    }

    try {
      await createSpareOrder(orderForm);
      router.push('/spare-orders');
    } catch (error) {
      console.error('Erreur lors de la création de la commande', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Nouvelle Commande</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Les champs du formulaire */}
        <div className="flex flex-col">
          <label htmlFor="sparePart" className="mb-2 font-semibold">Pièce</label>
          <select
            id="sparePart"
            value={orderForm.spareId}
            onChange={handleSparePartChange}
            className="border border-gray-300 rounded-md px-4 py-2"
          >
            <option value="">Sélectionner une pièce</option>
            {spareParts.map((part) => (
              <option key={part.id} value={part.id}>
                {part.name} - Prix: {part.price}€ - Stock: {part.quantity} unités
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="quantity" className="mb-2 font-semibold">Quantité</label>
          <input
            type="number"
            id="quantity"
            value={orderForm.quantity}
            onChange={(e) => setOrderForm({
              ...orderForm,
              quantity: parseInt(e.target.value),
              price: spareParts.find(p => p.id === orderForm.spareId)?.price * parseInt(e.target.value) || 0
            })}
            className="border border-gray-300 rounded-md px-4 py-2"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="deliveryDelay" className="mb-2 font-semibold">Délai de livraison (jours)</label>
          <input
            type="number"
            id="deliveryDelay"
            value={orderForm.deliveryDelayDays}
            onChange={(e) => setOrderForm({...orderForm, deliveryDelayDays: parseInt(e.target.value)})}
            className="border border-gray-300 rounded-md px-4 py-2"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-semibold">Prix total</label>
          <input
            type="number"
            value={orderForm.price}
            readOnly
            className="border border-gray-300 rounded-md px-4 py-2 bg-gray-100"
          />
        </div>

        <div className="flex justify-end mt-4 space-x-4">
          <button
            type="button"
            onClick={() => router.push('/spare-orders')}
            className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition"
          >
            Retour
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Créer la commande
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSpareOrderPage;