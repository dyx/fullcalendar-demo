
# vue集成fullcalendar
## 简介
- 集成日程控件 @fullcalendar/vue 5.3 [官网](https://fullcalendar.io/)

#### 环境依赖
- node 12.14+
- yarn 1.21+

#### Demo运行
- yarn install
- yarn run serve

#### UI展示
![](https://cdn.jsdelivr.net/gh/luhaidong/images@v1.0/fullcalendar-demo/%E6%BC%94%E7%A4%BA1.gif)

## 集成
[Vue集成文档地址](https://fullcalendar.io/docs/vue)
#### 安装所需包
- yarn add @fullcalendar/vue @fullcalendar/interaction @fullcalendar/daygrid @fullcalendar/timegrid @fullcalendar/list

### 5.3
#### 引用控件 schedule.vue
```html
<template>
    <FullCalendar ref="fullCalendar" :options="calendarOptions"></FullCalendar>
</template>
<script>
    import FullCalendar from '@fullcalendar/vue';
    import dayGridPlugin from '@fullcalendar/daygrid';
    import timeGridPlugin from '@fullcalendar/timegrid';
    import interactionPlugin from '@fullcalendar/interaction';
    import listPlugin from '@fullcalendar/list';
    export default {
        components: {FullCalendar},
        data () {
            return {
                calendarOptions: {
                  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
                  initialView: 'dayGridMonth',
            };
        }
    };
</script>
```
#### 参数说明
[文档地址](https://fullcalendar.io/docs#toc)
- locale:'zh' 国际化，中文

- initialView:'dayGridMonth' 默认显示视图，月视图

- minTime:'00:00:00' 时间网格中时间的最小值，0点
- maxTime:'23:00:00' 时间网格中时间的最大值，23点
- slotDuration:'00:15:00' 时间网格中时间间隔，15分钟
- defaultTimedEventDuration:'00:30' 日程事件在时间网格中占用的高度，30分钟的高度

- eventLimit:true 是否限制日程事件的数量，限制

- fixedWeekCount:false 是否固定月视图显示的周数，不固定
- showNonCurrentDates:false 是否显示非本月日期，不显示

- allDaySlot:false 是否显示全天，不显示；设置显示后会在时间网格头部显示

- weekends:true 是否显示周末，显示

- slotLabelFormat:slotLabelFormat 时间网格时间格式
- eventTimeFormat:eventTimeFormat 日程事件时间格式

- firstDay:1 星期的第一列显示，周一(0周日 1周一 2周二...)
- headerToolbar:header 头部工具条

- buttonText:buttonText 按钮文本

- plugins:plugins 绑定的控件
- events:events 日程事件
- validRange:validRange 全局日期范围；超出范围按钮会禁用
- datesSet:datesSet 日期渲染；修改日期范围后触发

- eventClick:handleEventClick 点击日程事件，显示详情
- dateClick:handleDateClick 点击日期，显示新增


### 4.2
#### 引用控件 schedule.vue
```html
<template>
    <FullCalendar defaultView="dayGridMonth" :plugins="plugins" />
</template>

<script>
    import FullCalendar from '@fullcalendar/vue';
    import dayGridPlugin from '@fullcalendar/daygrid';
    import timeGridPlugin from '@fullcalendar/timegrid';
    import interactionPlugin from '@fullcalendar/interaction';
    import listPlugin from '@fullcalendar/list';

    export default {
        components: {
            FullCalendar
        },
        data() {
            return {
                plugins: [
                    dayGridPlugin,
                    timeGridPlugin,
                    interactionPlugin,
                    listPlugin
                ]
            }
        }
    }
</script>
<style scoped>
    @import '~@fullcalendar/core/main.css';
    @import '~@fullcalendar/daygrid/main.css';
    @import '~@fullcalendar/timegrid/main.css';
    @import '~@fullcalendar/list/main.css';
</style>
```

#### 参数说明
[文档地址](https://fullcalendar.io/docs#toc)
- locale="zh" 国际化，中文

- defaultView="dayGridMonth" 默认显示视图，月视图

- minTime="00:00:00" 时间网格中时间的最小值，0点
- maxTime="23:00:00" 时间网格中时间的最大值，23点
- slotDuration="00:15:00" 时间网格中时间间隔，15分钟
- defaultTimedEventDuration="00:30" 日程事件在时间网格中占用的高度，30分钟的高度

- :eventLimit="true" 是否限制日程事件的数量，限制
- eventLimitText="查看所有" 日程事件超出限制数量后显示的文本

- :fixedWeekCount="false" 是否固定月视图显示的周数，不固定
- :showNonCurrentDates="false" 是否显示非本月日期，不显示

- :allDaySlot="false" 是否显示全天，不显示；设置显示后会在时间网格头部显示

- :weekends="true" 是否显示周末，显示

- :slotLabelFormat="slotLabelFormat" 时间网格时间格式
- :eventTimeFormat="eventTimeFormat" 日程事件时间格式

- :firstDay="1" 星期的第一列显示，周一(0周日 1周一 2周二...)
- :header="header" 头部工具条

- :buttonText="buttonText" 按钮文本

- :plugins="plugins" 绑定的控件
- :events="events" 日程事件
- :validRange="validRange" 全局日期范围；超出范围按钮会禁用
- :viewSkeletonRender="viewSkeletonRender" 视图渲染；修改视图类型后触发
- :datesRender="datesRender" 日期渲染；修改日期范围后触发

- @eventClick="handleEventClick" 点击日程事件，显示详情
- @dateClick="handleDateClick" 点击日期，显示新增


