import { Module } from '@nestjs/common';
import CreateEventCommandHandler from '@triumph/application/queries/event/add/create-event-handler';
import SearchEventQueryHandler from '@triumph/application/queries/event/filter/search-event-query-handler';
import GetEventListQueryHandler from '@triumph/application/queries/event/get/get-event-list-query-handler';
import GetEventQueryHandler from '@triumph/application/queries/event/get/get-event-query-handler';
import SequelizeEventRepositoryReader from '@triumph/sequelize-adapter/src/repositories/event/event-repository-reader';
import SequelizeEventRepositoryWriter from '@triumph/sequelize-adapter/src/repositories/event/event-repository-writer';

import { EventReaderController } from '../../controllers/event/event-controller';
import { EventWriterController } from '../../controllers/event/event-controller-writer';
import { EventService } from '../../modules/event/event-services';

@Module({
  controllers: [EventWriterController, EventReaderController],
  providers: [
    EventService,
    {
      provide: 'EventRepositoryWriter',
      useClass: SequelizeEventRepositoryWriter,
    },
    {
      provide: 'EventRepositoryReader',
      useClass: SequelizeEventRepositoryReader,
    },
    CreateEventCommandHandler,
    GetEventListQueryHandler,
    GetEventQueryHandler,
    SearchEventQueryHandler,
  ],
})
export class EventModule {}
