import validator from 'validator';
import { normalizeEmail } from '@privacy/privacy-pack';

interface PiiClassification {
  pii: string;
  type: 'email' | 'phone' | 'other';
  normalized: string;
}

export const piiClassifier = (pii: string) => {
  const normalized = pii.toLowerCase().trim();
  const classification: PiiClassification = {
    pii,
    type: 'other',
    normalized,
  };
  if (validator.isEmail(pii)) {
    classification.type = 'email';
    classification.normalized = normalizeEmail(pii);
  } else if (validator.isMobilePhone(pii)) {
    classification.type = 'phone';
  }
  return classification;
};
