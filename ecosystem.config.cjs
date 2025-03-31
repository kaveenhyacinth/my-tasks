module.exports = {
  apps: [
    {
      name: 'my-tasks-backend',
      script: 'npm',
      args: 'run start:prod',
      cwd: '/var/www/my-tasks/api',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '3G',
      env: {
        NODE_ENV: 'production',
        PORT: 8084,
      },
      error_file: '/var/log/pm2/my-tasks-backend-error.log',
      out_file: '/var/log/pm2/my-tasks-backend-out.log',
    },
    {
      name: 'my-tasks-frontend',
      script: 'npm',
      args: 'run start:prod',
      cwd: '/var/www/my-tasks/client',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '3G',
      env: {
        NODE_ENV: 'production',
        PORT: 5084,
      },
      error_file: '/var/log/pm2/my-tasks-frontend-error.log',
      out_file: '/var/log/pm2/my-tasks-frontend-out.log',
    }
  ],
};