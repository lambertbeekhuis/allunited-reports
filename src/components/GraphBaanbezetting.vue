<script>
    import { Line } from 'vue-chartjs'

    export default {
        extends: Line,
        name: "GraphBaanbezetting",

        data: () => ({
            data: {
                labels: ['red', 'green', 'yellow'],
                datasets: [
                    {
                        label: "test",
                        data: [1, 2, 5],
                    }
                ]
            },
            options: {},
        }),

        methods: {
            produceData() {

            }
        },

        mounted () {
            this.renderChart(this.data, this.options);
        }
    }
</script>

<style scoped>

</style>