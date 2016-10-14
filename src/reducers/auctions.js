import moment from 'moment';

const initialState = [
  {
    id: 1,
    name: 'Gavel',
    description: 'It pounds stuff',
    startDate: moment('2016-08-07T10:50:00-05:00'),
    endDate: moment('2016-10-14T10:50:00-05:00')
  },
  {
    id: 2,
    name: 'Hamster',
    description: 'It avoids getting pounded, or does it.',
    startDate: moment('2016-08-07T10:50:00-05:00'),
    endDate: moment('2016-10-13T10:50:00-05:00')
  }
];

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};