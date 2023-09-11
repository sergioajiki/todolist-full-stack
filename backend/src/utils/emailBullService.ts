import Queue from 'bull';
import nodemailer from './nodemailerUtils';

const emailQueue = new Queue('emailNotifications', {
  redis: {
    host: 'redis',
    port: 6379,
  },
});

emailQueue.process(async (job) => {
  const { data } = job;
  await nodemailer.sendEmail(data);
});

export default {
  emailQueue,
};