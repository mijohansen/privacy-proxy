import { gzip } from 'zlib';
import { promisify } from 'util';

it('should', async () => {
  const zip = promisify(gzip);

  const input = 'Geek';

  // Calling gzip method
  const buffer = await zip(input);
  console.log(buffer);
});
