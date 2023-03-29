import _ from 'lodash';

export const getRandomNode = <T>(arr: T[]): T | undefined => {
  return _.sample(arr);
};
