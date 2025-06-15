import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger, Logger, ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser'
import helmet from 'helmet';

async function bootstrap() {
  const {NODE_ENV, PORT = 5000} = process.env;
  const logger = new ConsoleLogger({
      prefix: 'TaskApp',
      json: true,
      colors: true,
      timestamp: true
    });

  const app = await NestFactory.create(AppModule, {
    logger 
  });

  //Help secure Express apps by setting HTTP response headers.
  app.use(helmet());
  app.enableCors({
    origin: '*', // Allow all origins
  });
  //automatically parse body to json
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}))

  //set api prefix globally
  app.setGlobalPrefix('v1');
  
  //enable validation globally
  //This will validate incoming requests based on the DTOs defined in the application.
  app.useGlobalPipes(new ValidationPipe());


  logger.log(`Environment: ${NODE_ENV} - Listening on port: ${PORT}`);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
