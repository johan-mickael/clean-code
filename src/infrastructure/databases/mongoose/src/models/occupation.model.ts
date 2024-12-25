import mongoose from 'mongoose';

const modelName = 'Occupation';

const OccupationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

export default mongoose.model(modelName, OccupationSchema);