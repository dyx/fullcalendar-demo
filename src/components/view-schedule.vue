<template>
    <Modal footer-hide
           width="300"
           v-model="currentVisible"
           @on-visible-change="visibleChange">
        <Row class="row">
            <Col>姓名：{{getUserName}}</Col>
        </Row>
        <Row class="row">
            <Col>时间：{{form.date}}</Col>
        </Row>
        <Row class="row">
            <Col>
                是否预约：
                <Tag :color="form.state===1 ? '#19be6b' : '#2db7f5'">
                   {{form.state===1 ? '已预约' : '未预约'}}
                </Tag>
            </Col>
        </Row>
        <Row type="flex" justify="end" style="padding: 16px 0;">
            <Col>
                <Poptip confirm
                        title="确定要删除么"
                        @on-ok="remove">
                    <Button size="small" type="error" style="margin-left: 8px;">删除</Button>
                </Poptip>
            </Col>
        </Row>
    </Modal>
</template>

<script>
    import mockData from './mock'

    export default {
        name: 'ViewSchedule',
        components: {},
        props: {
            visible: Boolean,
            id: Number
        },
        data() {
            return {
                currentVisible: this.visible,
                form: {}
            };
        },
        computed: {
            getUserName () {
                return this.form && this.form.userId ? mockData.getUserName(this.form.userId) : '';
            }
        },
        methods: {
            init () {
                this.form = mockData.getScheduleById(this.id);
                this.currentVisible = true;
            },
            visibleChange (val) {
                if (!val) {
                    this.form = {};
                    this.$emit('on-close');
                }
            },
            remove () {
                mockData.removeSchedule(this.id);
                this.$emit('on-refresh');
                this.currentVisible = false;
            }
        },
        watch: {
            visible(val) {
                if (val) {
                    this.init();
                }
            }
        }
    };
</script>

<style scoped>
    .row {
        padding: 8px 16px;
        font-size: 14px;
    }
</style>
