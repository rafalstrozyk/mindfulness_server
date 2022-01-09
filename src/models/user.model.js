import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const Session = new mongoose.Schema({
  refreshToken: {
    type: String,
    default: '',
  },
});

const User = new mongoose.Schema({
  firstName: {
    type: String,
    default: '',
  },
  lastName: {
    type: String,
    default: '',
  },
  authStrategy: {
    type: String,
    default: 'local',
  },
  points: {
    type: Number,
    default: 50,
  },
  refreshToken: {
    type: [Session],
  },
});

// Remove refreshToken from the response
User.set('toJSON', {
  transform(doc, ret) {
    delete ret.refreshToken;
    return ret;
  },
});

User.plugin(passportLocalMongoose);

export default mongoose.model('users', User);
