import passport from 'passport';
import jwt from 'jsonwebtoken';

const dev = process.env.NODE_ENV !== 'production';

export const COOKIE_OPTIONS = {
  httpOnly: true,
  // Since localhost is not having https protocol,
  // secure cookies do not work correctly (in postman)
  secure: !dev,
  signed: true,
  maxAge: 60 * 60 * 24 * 30 * 1000,
  sameSite: 'none',
};

export const getToken = (user) => jwt.sign(user, process.env.JWT_SECRET, {
  expiresIn: 60 * 15,
});

export const getRefreshToken = (user) => {
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: 60 * 60 * 24 * 30,
  });
  return refreshToken;
};

export const verifyUser = passport.authenticate('jwt', { session: false });
