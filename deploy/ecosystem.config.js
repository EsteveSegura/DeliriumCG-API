module.exports = {
  apps: [
    {
      name: 'DeliriumCG-API',
      script: './src/index.js',
      instances: 3,
      exec_mode: 'cluster',
      watch: true,
      increment_var: 'PORT',
      env: {
        'PORT': 3000,
        'NODE_ENV': 'run',
      },
    },
  ],
};

