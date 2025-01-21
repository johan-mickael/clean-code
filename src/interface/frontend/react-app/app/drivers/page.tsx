'use client';

import React, { useState, useEffect } from 'react';
import { getDrivers, getDriverLicense } from '../../api';
import { useRouter } from 'next/navigation';

const DriversPage = () => {
  const [drivers, setDrivers] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const data = await getDrivers();
        setDrivers(data);
      } catch (error) {
        console.error('Erreur lors du chargement des conducteurs', error);
      }
    };

    fetchDrivers();
  }, []);

  const handleAddDriverLicense = (driverId: number) => {
    router.push(`/driver-licenses/add?id=${driverId}`);
  };

  const handleEditDriverLicense = (driverId: number) => {
    router.push(`/driver-licenses/edit?id=${driverId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4 text-blue-600">Gestion des Conducteurs</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100">
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Nom</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Prénom</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">License</th>
            </tr>
          </thead>
          <tbody>
            {drivers.length > 0 ? (
              drivers.map((driver) => (
                <tr key={driver.id} className="hover:bg-gray-50">
                    <td className="border-t px-6 py-3 text-sm text-gray-700">{driver.lastname}</td>
                  <td className="border-t px-6 py-3 text-sm text-gray-700">{driver.firstname}</td>
                  <td className="border-t px-6 py-3 text-sm text-gray-700 flex items-center gap-2">
                    {driver.license ? (
                      <>
                        <span
                          title={`Émis le ${new Date(driver.license.issueDate).toLocaleDateString(
                            'fr-FR',
                            {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                            }
                          )}`}
                        >
                          {`${driver.license.licenseClass} (${driver.license.stateIssued})`}
                        </span>
                        <svg
                          onClick={() => handleEditDriverLicense(driver.id)}
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-blue-600 cursor-pointer hover:text-blue-800"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M17.414 2.586a2 2 0 010 2.828l-10 10A2 2 0 016 16H4a1 1 0 01-1-1v-2a2 2 0 01.586-1.414l10-10a2 2 0 012.828 0zM12 5l3 3m-9 7h3m4-14h6m-3 0v6m-7.5 7.5H4a1 1 0 01-1-1v-2a2 2 0 01.586-1.414l10-10A2 2 0 0113.5 2l.5.5" />
                        </svg>
                      </>
                    ) : (
                      <button
                        onClick={() => handleAddDriverLicense(driver.id)}
                        className="bg-blue-600 text-white px-2 py-1 rounded-md hover:bg-blue-700"
                      >
                        Ajouter
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  Aucun conducteur trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DriversPage;
