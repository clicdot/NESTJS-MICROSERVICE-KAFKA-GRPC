import { ConfigService } from '@nestjs/config';
import { start } from './fastify.bootstrap';
import { ShutdownService } from './core/services/shutdown/shutdown.service';
import { Logger } from '@nestjs/common';
declare const module: any;
export class DaemonixBootstrap {
  app;
  logger = new Logger(DaemonixBootstrap.name);
  constructor(env) {
    this.logger.log('DAEMONIX ENV', env);
  }

  async init(done) {
    this.app = await start();

    await this.app.listen(3001, '0.0.0.0');

    if (module.hot) {
      module.hot.accept();
      module.hot.dispose(() => this.app.close());
    }
    // this.logger.log(`App listening on port ${port}`);
    done();
  }

  dinit(done) {
    this.app.get(ShutdownService).subscribeToShutdown(() => this.app.close());
    done();
  }
}
