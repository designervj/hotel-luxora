const fs = require('fs');
const path = require('path');

function readEnvValue(env, name) {
  const match = env.match(new RegExp(`^\\s*${name}\\s*=\\s*(.+?)\\s*$`, 'm'));
  return match ? match[1].trim().replace(/^['"]|['"]$/g, '') : undefined;
}

function readMongoEnv() {
  const envPath = path.join(__dirname, '..', '.env');
  const env = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : '';
  const uri = process.env.MONGODB_URI || readEnvValue(env, 'MONGODB_URI');
  const dbName = process.env.MONGODB_DB || readEnvValue(env, 'MONGODB_DB');

  if (!uri) throw new Error('MONGODB_URI is not set');
  if (!dbName) throw new Error('MONGODB_DB is not set');

  return { uri, dbName };
}

module.exports = { readMongoEnv };
