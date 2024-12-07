import NestApplication from './nest-application';

const serverName = 'Nest';
const serverPort = Number(process.env.PORT || 3000);
const nestApplication = new NestApplication(serverPort);

nestApplication.initialize().then((app) => {
  app.listen(serverPort, () => {
    console.log(`${serverName} server running on port ${serverPort}`);
  });
});
