import NestApplication from './nest-application';

const serverName = 'Nest';
const serverPort = Number(process.env.PORT || 3000);
const nestApplication = new NestApplication(serverPort);

nestApplication.initialize().then((app) => {
  app.listen(serverPort, () => {
    console.log(`\x1b[34m%s\x1b[0m`, `${serverName} server is running on port ${serverPort}`);
  });
});
