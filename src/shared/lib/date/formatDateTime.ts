import moment from 'moment';

export const formatDateTime = (isoString: string): string => {
  const m = moment(isoString);

  if (!m.isValid()) {
    return isoString;
  }

  return m.format('DD.MM.YYYY, HH:mm:ss');
};
