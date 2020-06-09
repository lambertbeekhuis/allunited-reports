<script>
    import { Line } from 'vue-chartjs'

    export default {
        extends: Line,
        name: "GraphBaanbezetting",

        data: () => ({
            options: {},
        }),

        computed: {
            fileFields () {
                return this.$store.state.fileFields;
            },

            fileData () {
                return this.$store.state.fileData;
            },
            chartData () {
                return {
                    labels: ['red', 'green', 'yellow'],
                        datasets: [
                        {
                            label: "test",
                            data: [1, 2, 5],
                        }
                    ]
                }
            }
        },


        methods: {
            produceData() {

            }
        },

        watch: {
            fileData () {
                //this.$data._chart.update();
                this.renderChart(this.chartData, this.options);
            }
        },

        mounted () {
            this.renderChart(this.chartData, this.options);
        }
    }
</script>

<style scoped>

</style>