'use client';

import React, { useState, useEffect } from 'react';
import { getSpareOrders, createSpareOrder, getSpareParts } from '../../api';

const SpareOrdersPage = () => {
  const [spareOrders, setSpareOrders] = useState<any[]>([]);
  const [orderForm, setOrderForm] = useState({
    spareId: '',
    quantity: 0,
    price: 0,
    deliveryDelayDays: 0
  });
  const [spareParts, setSpareParts] = useState<any[]>([]);

  const fetchSpareOrders = async () => {
    try {
      const data = await getSpareOrders();
      setSpareOrders(data);
    } catch (error) {
      console.error('Erreur lors du chargement des commandes', error);
    }
  };

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
    fetchSpareOrders();
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
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const newQuantity = value === '' ? 0 : parseInt(value);
    const selectedPart = spareParts.find(part => part.id === orderForm.spareId);
    
    setOrderForm({
      ...orderForm,
      quantity: newQuantity,
      price: selectedPart ? selectedPart.price * newQuantity : 0
    });
  };

  const handleCreateOrder = async () => {
    if (!orderForm.spareId || orderForm.quantity <= 0) {
      alert('Veuillez remplir tous les champs correctement.');
      return;
    }

    try {
      await createSpareOrder(orderForm);
      setOrderForm({
        spareId: '',
        quantity: 0,
        price: 0,
        deliveryDelayDays: 0
      });
      fetchSpareOrders();
    } catch (error) {
      console.error('Erreur lors de la création de la commande', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Commandes de Pièces</h1>

      <div className="mb-4">
        <h2 className="text-2xl font-semibold">Liste des Commandes</h2>
        <ul className="list-disc pl-6">
          {spareOrders.length > 0 ? (
            spareOrders.map((order) => (
              <li key={order.id} className="text-gray-700 mb-2">
                Pièce ID: {order.spareId} - Quantité: {order.quantity} - 
                Prix: {order.price}€ - Délai: {order.deliveryDelayDays} jours
              </li>
            ))
          ) : (
            <p className="text-gray-500">Aucune commande trouvée.</p>
          )}
        </ul>
      </div>

      <div className="grid grid-cols-1 gap-4 mb-6">
        <div className="flex flex-col">
          <label htmlFor="sparePart" className="mb-2 font-semibold">
            Pièce détachée
          </label>
          <select
            id="sparePart"
            value={orderForm.spareId}
            onChange={handleSparePartChange}
            className="border border-gray-300 rounded-md px-4 py-2"
          >
            <option value="">Sélectionnez une pièce</option>
            {spareParts.map((part) => (
              <option key={part.id} value={part.id}>
                {part.name} - Prix: {part.price}€ - Stock: {part.quantity}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="quantity" className="mb-2 font-semibold">
            Quantité
          </label>
          <input
            type="number"
            id="quantity"
            value={orderForm.quantity}
            onChange={handleQuantityChange}
            placeholder="Saisir la quantité"
            className="border border-gray-300 rounded-md px-4 py-2"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="price" className="mb-2 font-semibold">
            Prix total (€)
          </label>
          <input
            type="number"
            id="price"
            value={orderForm.price}
            readOnly
            className="border border-gray-300 rounded-md px-4 py-2 bg-gray-100"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="deliveryDelay" className="mb-2 font-semibold">
            Délai de livraison (jours)
          </label>
          <input
            type="number"
            id="deliveryDelay"
            value={orderForm.deliveryDelayDays}
            onChange={(e) => setOrderForm({...orderForm, deliveryDelayDays: parseInt(e.target.value)})}
            placeholder="Saisir le délai de livraison"
            className="border border-gray-300 rounded-md px-4 py-2"
          />
        </div>

        <button
          onClick={handleCreateOrder}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition mt-4"
        >
          Créer une commande
        </button>
      </div>
    </div>
  );
};

export default SpareOrdersPage;