import { v4 as uuidv4 } from 'uuid';
import { MailTemplate } from '../common/interfaces_types';

export const mailTemplateInitialValues: MailTemplate = {
  id: uuidv4(),
  name: '',
  content: '',
};
