import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const modelName = 'MaintenanceSchedule';

const MaintenanceScheduleSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    label: {
      type: String,
      required: true,
    },
    bike_model_id: {
      type: String,
      required: true,
    },
    month_interval: {
      type: Number,
    },
    mileage_interval: {
      type: Number,
    },
  },
  {
    collection: 'maintenance_schedules',
  },
);

export default mongoose.model(modelName, MaintenanceScheduleSchema);
