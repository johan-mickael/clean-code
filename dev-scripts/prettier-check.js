const { execSync } = require('child_process');

const formatCodes = () => {
  console.log('\x1b[36m%s\x1b[0m', '🔍 Running Prettier formatting...'); // Cyan color
  const prettierResult = execSync('npm run prettier-format', {
    encoding: 'utf-8',
  });
  console.log(prettierResult);
  console.log(
    '\x1b[32m%s\x1b[0m',
    '🎨 Prettier formatting completed successfully!',
  ); // Green color
};

formatCodes();
