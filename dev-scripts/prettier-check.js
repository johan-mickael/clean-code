// execute docker compose run --rm app npm run format

const { execSync } = require('child_process');

const command = 'npm run format';

try {
  execSync(command, { stdio: 'inherit' });
}
catch (error) {
  process.exit(1);
}