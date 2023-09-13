import Queue from 'bull';
import nodemailer from './nodemailerUtils';

const emailQueue = new Queue('emailNotifications', {
  redis: {
    host: 'redis',
    port: 6379,
    maxRetriesPerRequest: 5,    
  },
});

emailQueue.process(async (job, done) => {
  const { data } = job;
  console.log('2', data);
  
  await nodemailer.sendEmail(data);
  done();
  done(new Error('error email not sent'))
});

export default {
  emailQueue,
};
