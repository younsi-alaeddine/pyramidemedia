const DEPLOY_PATH = process.env.PYRAMIDE_DEPLOY_PATH || '/var/www/pyramidemedia';

module.exports = {
  apps: [
    {
      name: 'pyramide-api',
      script: 'dist/main.js',
      cwd: `${DEPLOY_PATH}/apps/api`,
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3011,
      },
      error_file: `${DEPLOY_PATH}/logs/api-error.log`,
      out_file: `${DEPLOY_PATH}/logs/api-out.log`,
      log_file: `${DEPLOY_PATH}/logs/api-combined.log`,
      time: true,
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
    },
    {
      name: 'pyramide-web',
      script: 'npm',
      args: 'start',
      cwd: `${DEPLOY_PATH}/apps/web`,
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3010,
        API_URL: 'http://127.0.0.1:3011',
        NEXT_PUBLIC_SITE_URL: 'https://pyramidemedia.com',
      },
      error_file: `${DEPLOY_PATH}/logs/web-error.log`,
      out_file: `${DEPLOY_PATH}/logs/web-out.log`,
      log_file: `${DEPLOY_PATH}/logs/web-combined.log`,
      time: true,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      node_args: '--max-old-space-size=1024',
    },
  ],
};
