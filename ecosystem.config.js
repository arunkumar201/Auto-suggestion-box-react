module.exports = {
  apps: [
    {
      name: 'react-app-vite', // Replace with your application name
      script: 'pnpm',         // Command to start your application
      args: 'start',          // Arguments to pass to the script
      instances: 1,           // Number of instances to run (if applicable)
      exec_mode: 'fork',      // Execution mode: fork or cluster
      env: {
        PORT: 5173            // Environment variables specific to this app
      },
      watch: false,           // Enable/disable file watching
      max_memory_restart: '1G', // Maximum memory to restart the app (if applicable)
    }
  ]
};
