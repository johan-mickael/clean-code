import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const modelName = 'Maintenance';

const MaintenanceSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    label: {
      type: String,
      required: true,
    },
    bike_id: {
      type: String,
      required: true,
    },
    maintenance_date: {
      type: Date,
    },
    status: {
      type: Number,
      required: true,
    },
  },
  {
    collection: 'maintenances',
  },
);

export default mongoose.model(modelName, MaintenanceSchema);
