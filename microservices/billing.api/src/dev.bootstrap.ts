import { ConfigService } from '@nestjs/config';
import { start } from './fastify.bootstrap';

export const bootstrap = async () => {
  const app = await start();

  await app.listen(3002, '0.0.0.0');
};
