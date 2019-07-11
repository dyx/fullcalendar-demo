import moment from 'moment';

const mockData = {}

mockData.users = [
    {id: 1, name: '张三'},
    {id: 2, name: '李四'},
    {id: 3, name: '王五'}
]

let formatStr = 'YYYY-MM-DD hh:mm:ss'
mockData.schedules = [
    {id: 1, userId: 1, date: moment().format(formatStr), state: 0},
    {id: 2, userId: 2, date: moment().add(1, 'months').format(formatStr), state: 0},
    {id: 3, userId: 3, date: moment().add(1, 'days').format(formatStr), state: 1},
    {id: 4, userId: 2, date: moment().subtract(1, 'months').format(formatStr), state: 2},
    {id: 5, userId: 3, date: moment().subtract(1, 'days').format(formatStr), state: 1},
    {id: 6, userId: 3, date: moment().format(formatStr), state: 0},
    {id: 7, userId: 3, date: moment().format(formatStr), state: 1},
    {id: 8, userId: 3, date: moment().format(formatStr), state: 0},
    {id: 9, userId: 2, date: moment().format(formatStr), state: 0},
    {id: 10, userId: 1, date: moment().format(formatStr), state: 0}
]

mockData.saveSchedule = (userId, date) => {
    mockData.schedules.push({
        id: new Date().getTime(),
        userId,
        date,
        state: 0
    })
}

mockData.getScheduleById = (id) => {
    return mockData.schedules.find(item => item.id === id);
}

mockData.removeSchedule = (id) => {
    mockData.schedules.splice(mockData.schedules.findIndex(item => item.id === id), 1);
}

mockData.getUserName = (id) => {
    let item = mockData.users.find(item => item.id === id);
    return item ? item.name : ''
}

export default mockData
