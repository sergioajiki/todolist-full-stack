import crypto from 'crypto'

const generateActivationCode = (): string => 
  crypto.randomBytes(16).toString('hex');  

export default {
  generateActivationCode,
};