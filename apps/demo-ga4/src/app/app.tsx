// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NxWelcome from './nx-welcome';
import { setUp, track } from '@privacy-one/browser';
import { useEffect } from 'react';

export function App() {
  setUp({
    endpoint: 'http://localhost:3333/collect',
  });
  const page = 'page';
  useEffect(() => {
    track('Page Viewed', {}).then(() => console.log('tracked'));
  }, [page]);
  return (
    <>
      <NxWelcome title="demo-ga4" />
      <div />
    </>
  );
}

export default App;
