import passport from 'passport';
import User from '../models/user.model';

const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
