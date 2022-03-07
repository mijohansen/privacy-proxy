import { Express, json } from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import { collectDefaultMetrics } from 'prom-client';
import { ALLOWED_ORIGINS, COOKIE_NAME } from '../config';
import { generateTrackingUuid } from '@privacy/privacy-pack';

export const configureServer = (app: Express) => {
  collectDefaultMetrics({});
  app.use(compression());
  app.use(json());
  app.use(cookieParser());
  app.use(
    cors({
      allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
      exposedHeaders: ['*', 'Authorization', 'Cookie', 'Set-Cookie'],
      credentials: true,
      methods: ['POST', 'OPTIONS'],
      optionsSuccessStatus: 204,
      origin: ALLOWED_ORIGINS,
      preflightContinue: false,
    })
  );
  app.use((req, res, next) => {
    // check if client sent cookie
    const cookie = req.cookies[COOKIE_NAME];
    if (cookie === undefined && req.method !== 'OPTIONS') {
      res.cookie(COOKIE_NAME, generateTrackingUuid(), {
        maxAge: 900000,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });
      console.log('cookie created successfully', req.method, req.url);
    } else {
      console.log('cookie exists', cookie);
    }
    next(); // <-- important!
  });
};
