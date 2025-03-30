module.exports = {
  apps: [
    {
      name: 'my-tasks-backend',
      script: 'npm',
      args: 'run start:prod',
      cwd: '/var/www/my-tasks/api',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '3G',
      env: {
        NODE_ENV: 'production',
        PORT: 8084,
      },
      exec_mode: 'fork',
    },
    {
      name: 'my-tasks-frontend',
      script: 'npm',
      args: 'run start:prod',
      cwd: '/var/www/my-tasks/client',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '3G',
      env: {
        NODE_ENV: 'production',
        PORT: 5084,
      },
      exec_mode: 'fork',
    }
  ],
};