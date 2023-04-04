import logger from '../../core/logger';

/* Producer function returns an object of intended recipients for a channel type */
export const smsProducer = async (): Promise<
  Omit<any | 'email', 'state'>[]
> => {
  logger.info('SMS.producer started');
  const recipients: any[] = [];

  /* Notify Airtable that a producer has been created */
  const recordCreatedOption = {
    recipients: `${JSON.stringify(recipients.map(Object.values))}`,
    channel: 'SMS',
    message: `A ${
      'CHANNEL.SMS' || 'SMS'
    } worker has been initiated on ${new Date().toUTCString()} with ${
      recipients.length
    } Recipients`,
    time: new Date().toString(),
  };

  // airtable.createOneRecord('Scheduled_Messages', recordCreatedOption);
  logger.info(`SMS.producer payload generated`, recordCreatedOption);

  return recipients;
};
