import ExpressApp from './express-application';

const serverName = 'Express';
const serverPort = Number(process.env.PORT || 3000);
const expressApplication = new ExpressApp(serverPort);

expressApplication.initialize().listen(serverPort, () => {
  console.log(`\x1b[34m%s\x1b[0m`, `${serverName} server is running on port ${serverPort}`);
});
