// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NxWelcome from './nx-welcome';
import { setUp, track } from '@privacy-one/analytics-sdk';
import { useEffect } from 'react';

export function App() {
  setUp({
    endpoint: 'http://localhost:3333/collect',
  });
  const page = 'page';
  useEffect(() => {
    track({
      event: 'Page Viewed',
      props: [],
    }).then(() => console.log('tracked'));
  }, [page]);
  return (
    <>
      <NxWelcome title="demo-ga4" />
      <div />
    </>
  );
}

export default App;
