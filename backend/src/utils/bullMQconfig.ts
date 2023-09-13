import 'dotenv/config';

export default {
  concurrency: parseInt(process.env.QUEUE_CONCURRENCY || '1'),
  queueName: process.env.QUEUE_NAME || 'mailbot',
  connection: {
    host: process.env.REDIS_HOST || 'redis',
    port: parseInt(process.env.REDIS_PORT || '6379'),
  }
}