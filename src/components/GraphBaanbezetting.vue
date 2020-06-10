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

            entries () {
                return this.$store.state.entries;
            },

            chartData () {
                // https://medium.com/poka-techblog/simplify-your-javascript-use-map-reduce-and-filter-bd02c593cc2d
                // accumulate reservations per day
                let resPerDay = this.$store.state.entries.reduce((acc, entry) => {
                    if (!acc.hasOwnProperty(entry['Vanaf datum'])) {
                        acc[entry['Vanaf datum']] = [];
                    }
                    acc[entry['Vanaf datum']].push(entry);
                    return acc;
                }, {});

                // set initial/empty chartData
                let chartData = {
                    labels: [],
                    datasets: [
                        {
                            label: "#reserveringen per dag",
                            data: [],
                        }
                    ]
                }

                // https://gomakethings.com/the-es6-way-to-loop-through-objects-with-vanilla-javascript/
                // add the accumulated results to the chartData-set
                Object.keys(resPerDay).forEach(function (key) {
                    chartData.labels.push(key);
                    chartData.datasets[0].data.push(resPerDay[key].length);
                });
                return chartData;

                // keep this here for reference
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