<template>
  <Row id="medicalUserWork" type="flex" justify="center" :gutter="24" class="panel">
    <Col>
      <Tag type="dot" :color="NORMAL_COLOR">未预约</Tag>
      <Tag type="dot" :color="USED_COLOR">已预约</Tag>
      <Tag type="dot" :color="DISABLED_COLOR">已停用</Tag>
    </Col>
    <Col>
      <div class="calendar">
        <Row type="flex">
          <Col>
            <Form inline>
              <FormItem prop="name">
                <Select clearable placeholder="姓名" style="width: 150px;" v-model="params.userId">
                  <Option v-for="item in users" :value="item.id" :key="item.id">{{item.name}}</Option>
                </Select>
              </FormItem>
              <FormItem prop="name">
                <Button @click="search">查询</Button>
              </FormItem>
            </Form>
          </Col>
        </Row>
        <FullCalendar ref="fullCalendar" :options="calendarOptions"></FullCalendar>
        <save-schedule :visible="saveVisible"
              :userId="params.userId"
              :date="selectDate"
              @on-close="saveVisible=false"
              @on-success="search"></save-schedule>
        <view-schedule :visible="viewVisible"
              :id="selectId"
              @on-close="viewVisible=false"
              @on-refresh="search"></view-schedule>
      </div>
    </Col>
  </Row>
</template>

<script>
    import FullCalendar from '@fullcalendar/vue';
    import dayGridPlugin from '@fullcalendar/daygrid';
    import timeGridPlugin from '@fullcalendar/timegrid';
    import interactionPlugin from '@fullcalendar/interaction';
    import listPlugin from '@fullcalendar/list';
    import mockData from './mock'
    import SaveSchedule from "./save-schedule";
    import ViewSchedule from "./view-schedule";
    export default {
        name: 'FullCalendarDemo',
        components: {ViewSchedule, SaveSchedule, FullCalendar},
        data () {
            return {
                DISABLED_COLOR: '#c5c8ce',
                USED_COLOR: '#19be6b',
                NORMAL_COLOR: '#2db7f5',
                calendarOptions: {
                  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
                  initialView: 'dayGridMonth',
                  locale: 'zh',
                  firstDay: 1,
                  // 时间轴间距
                  slotMinTime: '00:00',
                  slotMaxTime: '23:00',
                  slotDuration: '00:15:00',
                  defaultTimedEventDuration: '00:30',
                  // 月视图，是否为指定周数高度，true 6周高度
                  fixedWeekCount: false,
                  // 月视图，是否显示非本月日期
                  showNonCurrentDates: false,
                  // 是否显示全天插槽
                  allDaySlot: false,
                  weekends: true,
                  dayMaxEvents: true,
                  slotLabelFormat: {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: false
                  },
                  eventTimeFormat: {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: false
                  },
                  buttonText: {
                    today: '今天',
                    month: '月',
                    week: '周',
                    day: '日',
                    list: '周列表'
                  },
                  headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay listWeek'
                  },
                  validRange: this.validRange,
                  events: [],
                  datesSet: this.datesSet,
                  eventClick: this.handleEventClick,
                  dateClick: this.handleDateClick,
                },
                validRange: {
                    start: '2019-01-01',
                    end: this.$moment().add(6, 'months').format('YYYY-MM-DD')
                },
                users: [],
                params: {},
                viewVisible: false,
                selectId: 0,
                selectDate: '',
                saveVisible: false
            };
        },
        methods: {
            getColor (event) {
                // 默认可预约
                let color = this.NORMAL_COLOR;
                if (event.state === 2) {
                    // 已禁用
                    color = this.DISABLED_COLOR;
                } else if (event.state === 1) {
                    // 已预约
                    color = this.USED_COLOR;
                }
                return color;
            },
            init () {
                this.params.startDate = this.$moment().startOf('month').format('YYYY-MM-DD HH:mm:ss');
                this.params.endDate = this.$moment().endOf('month').format('YYYY-MM-DD HH:mm:ss');
                this.users = mockData.users
                this.search();
            },
            search () {
                this.calendarOptions.events = [];
                mockData.schedules.filter(item => {
                    let isUser = true;
                    if (this.params.userId) {
                        isUser = item.userId === this.params.userId;
                    }
                    let isAfter = this.$moment(item.date).isAfter(this.params.startDate);
                    let isBefore = this.$moment(item.date).isBefore(this.params.endDate);
                    return isUser && isAfter && isBefore;
                }).forEach(item => {
                    let color = this.getColor(item);
                    this.calendarOptions.events.push({
                        backgroundColor: color,
                        borderColor: color,
                        title: mockData.getUserName(item.userId),
                        start: item.date,
                        extendedProps: item
                    });
                });
            },
            datesSet (info) {
                let date = info.view.activeStart;
                // 查询月份数据
                this.params.startDate = this.$moment(date).startOf('month').format('YYYY-MM-DD HH:mm:ss');
                this.params.endDate = this.$moment(date).endOf('month').format('YYYY-MM-DD HH:mm:ss');
                this.search();
            },
            handleDateClick (arg) {
                this.selectDate = this.$moment(arg.date).startOf('day').format('YYYY-MM-DD HH:mm:ss');
                this.saveVisible = true;
            },
            handleEventClick (info) {
                this.selectId = info.event.extendedProps.id;
                this.viewVisible = true;
            }
        },
        mounted () {
            this.init();
        }
    };
</script>

<style>
  #medicalUserWork .ivu-tag {
    display: block;
  }
</style>

<style scoped>
  .panel {
    padding-top: 64px;
  }
  .calendar {
    width: 820px;
  }
</style>
