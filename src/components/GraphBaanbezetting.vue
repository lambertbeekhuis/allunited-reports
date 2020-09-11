<script>
    import { Line } from 'vue-chartjs'
    import parseISO from 'date-fns/parseISO'
    import format from 'date-fns/format'
    import {dateFns} from "../utils/dateHelper";

    export default {
        extends: Line,
        name: "GraphBaanbezetting",

        // range is object with start- and end-properties containing a Date-object
        props: {
            range: Object,
            categories: Array
        },

        data: () => ({
            options: {
                scales: {
                    xAxes: [{
                    }],
                    yAxes: [{
                        stacked: true
                    }]
                }
            }
        }),

        computed: {
            fileFields () {
                return this.$store.state.fileFields;
            },


            // there is a watcher on this on, so if input changes, then entries changes and graph is re-drawn
            entries () {
                return this.$store.getters.getEntriesStartEnd(this.range.start, this.range.end, this.categories);
                // return this.$store.state.entries;
            },

            chartData () {

                // array of date-Objects for the x-axis
                let dateTimesArray = dateFns.daysWithTimeInterval(this.range.start, this.range.end, '08:00', '23:00', 15);
                //let dateTimesArray = dateFns.daysWithTimeInterval(this.$store.getters.firstDate, this.$store.getters.lastDate, '08:00', '23:00', 15);

                // make the labels
                let labels = dateTimesArray.map(date => {
                    if (dateFns.dateFormat(date, 'kk') === '08') {
                        return dateFns.dateFormat(date, 'eeeeee dd MMM kk:mm');
                    }
                    if (dateFns.dateFormat(date, 'mm') === '00') {
                        return dateFns.dateFormat(date, 'kk:mm');
                    } else {
                        return dateFns.dateFormat(date, 'kk:mm');
                    }
                });

                // make the initial dataObject to collect all information. The keys are the unix-timestamps
                let initialDataObject = dateTimesArray.reduce((acc, date) => {
                    acc[date.getTime()] = [];
                    return acc;
                }, {});


                // fill the dataObject with the data from the entries
                // https://medium.com/poka-techblog/simplify-your-javascript-use-map-reduce-and-filter-bd02c593cc2d
                let dataObject = this.entries.reduce((acc, entry) => {
                    let key = entry.startDate.getTime();
                    let endKey = entry.endDate.getTime();
                    // let key = dateFns.dateFormat(entry.startDate, 'eeeeee dd-MM-yyyy kk:mo');
                    // skip if key does not exist
                    if (!Object.prototype.hasOwnProperty.call(acc, key)) {
                        console.log('key/date not found', key, dateFns.dateFormat(entry.startDate, 'eeeeee dd-MM-yyyy kk:mm'));
                        return acc; // do nothing for now
                    }

                    // push the entry until the endTime is reached
                    // @todo: endTime is after the window to show??
                    do {
                        acc[key].push(entry);
                        key = key + (15 * 60000);
                    }
                    while (key < endKey);
                    return acc;
                }, initialDataObject);


                let datasetStack = []; // one single Stack

                // https://gomakethings.com/the-es6-way-to-loop-through-objects-with-vanilla-javascript/
                // add the accumulated results to the chartData-set
                Object.keys(dataObject).forEach(function (dateLabel) {
                    datasetStack.push(dataObject[dateLabel].length);
                });

                let chartData = {
                    labels: labels,
                    datasets: [
                        {
                            label: "#totaal",
                            backgroundColor: '#f87979',
                            borderColor: '#f87979',
                            fill: false,
                            data: datasetStack,
                        },
                        {
                            label: "#totaal2",
                            backgroundColor: '#88F909',
                            borderColor: '#88F909',
                            fill: false,
                            data: datasetStack,
                        }
                    ]
                }
                return chartData;




                /*
                // https://medium.com/poka-techblog/simplify-your-javascript-use-map-reduce-and-filter-bd02c593cc2d
                // accumulate reservations per day
                let resPerDay = this.$store.state.entries.reduce((acc, entry) => {
                    // acc.hasOwnProperty() replaced by below, see https://eslint.org/docs/rules/no-prototype-builtins
                    if (!Object.prototype.hasOwnProperty.call(acc, entry['Vanaf datum'])) {
                        acc[entry['Vanaf datum']] = [];
                    }
                    acc[entry['Vanaf datum']].push(entry);
                    return acc;
                }, {});


                // https://gomakethings.com/the-es6-way-to-loop-through-objects-with-vanilla-javascript/
                // add the accumulated results to the chartData-set
                Object.keys(resPerDay).forEach(function (key) {
                    chartData.labels.push(format(parseISO(key), 'eeeeee d MMM yyyy'));
                    chartData.datasets[0].data.push(resPerDay[key].length);
                });
                return chartData;
                */

                // keep this here for reference
                /*
                return {
                    labels: ['red', 'green', 'yellow'],
                    datasets: [
                        {
                            label: "test",
                            data: [1, 2, 5],
                        }
                    ]
                }
                */
            }
        },


        methods: {
            produceData() {

            }
        },

        watch: {
            entries () {
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