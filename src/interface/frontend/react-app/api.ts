import axios from 'axios';

const API_BIKES_URL = 'http://localhost:3000/bikes';
const API_BIKEMODELS_URL = 'http://localhost:3000/bike-models';
const API_DRIVERS_URL = 'http://localhost:3000/drivers';
const API_DRIVER_LICENSES_URL = 'http://localhost:3000/driver-licenses';
const API_DRIVING_URL = 'http://localhost:3000/drivinglicenses';
const API_DRIVING_HISTORY_URL = 'http://localhost:3000/driving-history';
const API_DRIVING_INCIDENTS_URL = 'http://localhost:3000/driving-incidents';
const API_PARTNERS_URL = 'http://localhost:3000/partners';

export const getMotos = async () => {
  try {
    const response = await axios.get(API_BIKES_URL);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des motos', error);
    throw error;
  }
};

export const createMoto = async (newMoto: any) => {
  try {
    const response = await axios.post(API_BIKES_URL, newMoto);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création de la moto', error);
    throw error;
  }
};

export const getBikeModels = async () => {
  try {
    const response = await axios.get(API_BIKEMODELS_URL);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des modèles de motos', error);
    throw error;
  }
};

export const createBikeModel = async (name: string) => {
  try {
    const response = await axios.post(API_BIKEMODELS_URL, { name });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création du modèle de moto', error);
    throw error;
  }
};

export const createDrivingLicense = async (customerId: string, date: string, status: string, country: string) => {
  try {
    const response = await axios.post(API_DRIVING_URL, {
      customerId,
      date,
      status,
      country,
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création du permis de conduire', error);
    throw error;
  }
};

export const getDrivers = async () => {
  try {
    const response = await axios.get(API_DRIVERS_URL);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des conducteurs', error);
    throw error;
  }
};

export const getDriverLicense = async () => {
  try {
    const response = await axios.get(API_DRIVER_LICENSES_URL);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des permis de conduire', error);
    throw error;
  }
};

export const createDriverLicense = async (newDriverLicense: any) => {
  try {
    const response = await axios.post(API_DRIVER_LICENSES_URL, newDriverLicense);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création de la licence de conducteur', error);
    throw error;
  }
};

export const getDrivingHistories = async () => {
  try {
    const response = await axios.get(API_DRIVING_HISTORY_URL);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des historiques de conduite', error);
    throw error;
  }
};

export const createDrivingHistory = async (newHistory: any) => {
  try {
    const response = await axios.post(API_DRIVING_HISTORY_URL, newHistory);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création d'un historique de conduite", error);
    throw error;
  }
};

export const deleteDrivingHistory = async (id: string) => {
  try {
    const response = await axios.delete(`${API_DRIVING_HISTORY_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la suppression de l'historique de conduite", error);
    throw error;
  }
};

export const getDrivingIncidents = async () => {
  try {
    const response = await axios.get(`${API_DRIVING_INCIDENTS_URL}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des incidents de conduite', error);
    throw error;
  }
};

export const createDrivingIncident = async (newIncident: any) => {
  try {
    const response = await axios.post(API_DRIVING_INCIDENTS_URL, newIncident);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création de l'incident de conduite", error);
    throw error;
  }
};

export const deleteDrivingIncident = async (id: string) => {
  try {
    const response = await axios.delete(`${API_DRIVING_INCIDENTS_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la suppression de l'incident de conduite", error);
    throw error;
  }
};

export const getPartners = async () => {
  try {
    const response = await axios.get(`${API_PARTNERS_URL}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des partenaires.', error);
    throw error;
  }
};
