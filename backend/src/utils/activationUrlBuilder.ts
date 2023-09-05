import { ActivationUrlPayload } from '../interfaces/ActivationUrlPayload'
import 'dotenv/config';

const buildActivationUrl = (payload: ActivationUrlPayload): string => 
  `${process.env.HOST}:${process.env.APP_PORT}/activate/${payload.id}/${payload.activationCode}`;

export default buildActivationUrl;