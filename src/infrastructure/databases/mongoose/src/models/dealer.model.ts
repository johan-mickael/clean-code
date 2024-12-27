import mongoose from 'mongoose';

const modelName = 'Dealer';

const DealerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

export default mongoose.model(modelName, DealerSchema);
