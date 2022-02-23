import { sendSampleMessage } from '../db/connection';
import { AppContext } from '../types';

export const defaultRoutes = (context: AppContext) => {
  const { app } = context;
  app.get('/', (req, res) => {
    res.send({ message: 'Server is running' });
  });
  app.get('/api', (req, res) => {
    res.send({ message: 'Welcome to server!' });
  });
  app.get('/test-notification', async (req, res) => {
    const message = await sendSampleMessage();
    res.send({ message });
  });
};
