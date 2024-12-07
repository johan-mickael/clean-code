import ExpressApp from './express-application';

const serverName = 'Express';
const serverPort = Number(process.env.PORT || 3000);
const expressApplication = new ExpressApp(serverPort);

expressApplication.initialize().listen(serverPort, () => {
  console.log(`${serverName} server running on port ${serverPort}`);
});
