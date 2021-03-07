import Session, { Store } from 'express-session';
import connectRedis from 'connect-redis';
import { redis as client } from '../redis';

const redisStore = connectRedis(Session as never);

export const session = Session({
  store: new redisStore({ client }) as Store,
  name: 'sessionId',
  secret: 'xJdX6NpZyv1J3NrfJG5IBjvXXeBmhmdY',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 1000 * 60 * 60 * 24 * 7 * 365,
  },
});
