import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
    }

    enableShutdownHooks(app: INestApplication): void {
        this.$on(['beforeExit'] as never, async () => { // Fix: Update the type of the event parameter to be of type never
            await app.close();
        })
    }
}