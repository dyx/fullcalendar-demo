<template>
    <Modal title="新建"
           width="330"
           v-model="currentVisible"
           @on-visible-change="visibleChange">
        <Form ref="form" :model="form" :rules="rules" :labelWidth="60">
            <FormItem label="姓名" prop="userId">
                <Select style="width: 200px;" v-model="form.userId">
                    <Option v-for="item in users" :value="item.id" :key="item.id">{{item.name}}</Option>
                </Select>
            </FormItem>
            <FormItem label="日期" prop="date">
                <DatePicker type="datetime" style="width: 200px;" v-model="form.date"></DatePicker>
            </FormItem>
        </Form>
        <template #footer>
            <Button @click="currentVisible = false">取消</Button>
            <Button type="primary" @click="submit">保存</Button>
        </template>
    </Modal>
</template>

<script>
    import mockData from './mock'
    export default {
        name: 'SaveSchedule',
        components: {},
        props: {
            visible: {
              type: Boolean
            },
            date: {
              type: String
            },
            userId: {
              type: Number
            }
        },
        data () {
            return {
                currentVisible: this.visible,
                form: {},
                rules: {
                    userId: [
                        { required: true, type: 'number', message: '姓名不能为空', trigger: 'blur' }
                    ],
                    date: [
                        { required: true, type: 'date', message: '日期不能为空', trigger: 'blur' }
                    ]
                },
                users: []
            };
        },
        methods: {
            init () {
                this.users = mockData.users;

                this.$set(this.form, 'date', this.date);
                if (this.userId) {
                    this.$set(this.form, 'userId', this.userId);
                }

                this.currentVisible = true;
            },
            visibleChange (val) {
                if (!val) {
                    this.form = {};
                    this.$refs.form.resetFields();
                    this.$emit('on-close');
                }
            },
            submit () {
                this.$refs.form.validate(valid => {
                    if (valid) {
                        mockData.saveSchedule(this.form.userId, this.$moment(this.form.date).format('YYYY-MM-DD HH:mm:ss'));
                        this.$emit('on-success');
                        this.currentVisible = false;
                    }
                })
            }
        },
        watch: {
            visible (val) {
                if (val) {
                    this.init();
                }
            }
        }
    };
</script>
