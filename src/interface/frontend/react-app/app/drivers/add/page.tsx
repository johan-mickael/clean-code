'use client';

import React, { useState } from 'react';
import { createDriver } from '../../../api';
import { useRouter } from 'next/navigation';

const AddDriverPage = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstname || !lastname || !profilePicture) {
      alert('Tous les champs sont nécessaires !');
      return;
    }

    const newDriver = {
      firstname,
      lastname,
      profilePicture,
    };

    try {
      await createDriver(newDriver);
      router.push('/drivers');
    } catch (error) {
      console.error('Erreur lors de la création du conducteur', error);
      alert('Erreur lors de l\'ajout du conducteur');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4 text-blue-600">Ajouter un Conducteur</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Prénom */}
        <div className="flex flex-col">
          <label htmlFor="firstname" className="mb-2 font-semibold">Prénom</label>
          <input
            type="text"
            id="firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2"
          />
        </div>

        {/* Nom */}
        <div className="flex flex-col">
          <label htmlFor="lastname" className="mb-2 font-semibold">Nom</label>
          <input
            type="text"
            id="lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2"
          />
        </div>

        {/* Photo de profil */}
        <div className="flex flex-col">
          <label htmlFor="profilePicture" className="mb-2 font-semibold">Photo de Profil (URL)</label>
          <input
            type="url"
            id="profilePicture"
            value={profilePicture}
            onChange={(e) => setProfilePicture(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2"
          />
        </div>

        {/* Bouton de soumission */}
        <div className="flex justify-center mt-6">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
            Ajouter Conducteur
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDriverPage;
