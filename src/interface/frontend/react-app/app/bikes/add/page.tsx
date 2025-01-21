'use client';

import React, { useState, useEffect } from 'react';
import { getPartners, getBikeModels, createMoto } from '../../../api';
import { useRouter } from 'next/navigation';

const AddBikePage = () => {
  const [partners, setPartners] = useState<any[]>([]); // Remplace 'customers' par 'partners'
  const [bikeModels, setBikeModels] = useState<any[]>([]);
  const [kilometers, setKilometers] = useState<number>(0);
  const [status, setStatus] = useState<number>(1);
  const [circulationDate, setCirculationDate] = useState<string>('');
  const [selectedPartner, setSelectedPartner] = useState<string>(''); // Remplace 'selectedCustomer' par 'selectedPartner'
  const [selectedBikeModel, setSelectedBikeModel] = useState<string>(''); // Remplace 'selectedBikeModel' par 'selectedBikeModel'

  const router = useRouter();

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const data = await getPartners(); // Remplace 'getCustomers' par 'getPartners'
        setPartners(data);
      } catch (error) {
        console.error('Erreur lors du chargement des partenaires', error);
      }
    };

    const fetchBikeModels = async () => {
      try {
        const data = await getBikeModels();
        setBikeModels(data);
      } catch (error) {
        console.error('Erreur lors du chargement des modèles de motos', error);
      }
    };

    fetchPartners();
    fetchBikeModels();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedPartner || !selectedBikeModel || !circulationDate) {
      alert("Tous les champs sont nécessaires !");
      return;
    }

    const newMoto = {
      partnerId: selectedPartner,  // Utilisation du 'partnerId'
      bikeModelId: selectedBikeModel,  // Utilisation du 'bikeModelId'
      mileage: kilometers,
      status: status,
      circulationDate: circulationDate
    };

    try {
      await createMoto(newMoto);
      router.push('/bikes');
    } catch (error) {
      console.error('Erreur lors de la création de la moto', error);
      alert('Erreur lors de l\'ajout de la moto');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4 text-blue-600">Ajouter une Moto</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Sélection du partenaire (anciennement client) */}
        <div className="flex flex-col">
          <label htmlFor="partner" className="mb-2 font-semibold">Partenaire</label>
          <select
            id="partner"
            value={selectedPartner}
            onChange={(e) => setSelectedPartner(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2"
          >
            <option value="">Sélectionner un partenaire</option>
            {partners.map((partner) => (
              <option key={partner.id} value={partner.id}>
                #{partner.id} &nbsp;
                {partner.name} {/* Affiche le nom du partenaire */}
              </option>
            ))}
          </select>
        </div>

        {/* Sélection du modèle de moto */}
        <div className="flex flex-col">
          <label htmlFor="bikeModel" className="mb-2 font-semibold">Modèle de Moto</label>
          <select
            id="bikeModel"
            value={selectedBikeModel}
            onChange={(e) => setSelectedBikeModel(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2"
          >
            <option value="">Sélectionner un modèle</option>
            {bikeModels.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
          </select>
        </div>

        {/* Kilométrage */}
        <div className="flex flex-col">
          <label htmlFor="kilometers" className="mb-2 font-semibold">Kilométrage</label>
          <input
            type="number"
            id="kilometers"
            value={kilometers}
            onChange={(e) => setKilometers(Number(e.target.value))}
            className="border border-gray-300 rounded-md px-4 py-2"
          />
        </div>

        {/* Statut */}
        <div className="flex flex-col">
          <label htmlFor="status" className="mb-2 font-semibold">Statut</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(Number(e.target.value))}
            className="border border-gray-300 rounded-md px-4 py-2"
          >
            <option value={1}>Actif</option>
            <option value={0}>Inactif</option>
          </select>
        </div>

        {/* Date de circulation */}
        <div className="flex flex-col">
          <label htmlFor="circulationDate" className="mb-2 font-semibold">Date de Circulation</label>
          <input
            type="date"
            id="circulationDate"
            value={circulationDate}
            onChange={(e) => setCirculationDate(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2"
          />
        </div>

        {/* Bouton de soumission */}
        <div className="flex justify-center mt-6">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
            Ajouter Moto
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBikePage;
