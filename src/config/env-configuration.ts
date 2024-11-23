export default () => ({
  port: parseInt(process.env.APP_PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
});
