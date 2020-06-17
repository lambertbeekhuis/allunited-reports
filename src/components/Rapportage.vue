<template>
    <v-row>
        <v-col class="mb-4" cols="3">
            <div v-if="firstDate">

                <vc-date-picker
                        mode="range"
                        v-model="range"
                        color="blue"
                        is-inline
                        :attributes="attributesCalendar"
                />
            </div>

        </v-col>

        <v-col class="mb-4" cols="9">
            <graph-baanbezetting v-if="firstDate" :range="range"></graph-baanbezetting>
        </v-col>

    </v-row>
</template>

<script>
    import GraphBaanbezetting from "./GraphBaanbezetting";

    export default {
        name: "Rapportage",

        components: {
            GraphBaanbezetting
        },

        data: () => ({
        }),

        computed: {
            range: {
                get () {
                    return this.$store.state.range;
                },
                set (range) {
                    this.$store.commit('SET_RANGE', range);
                }
            },

            fileFields () {
                return this.$store.state.fileFields;
            },

            fileLineCount () {
                return this.$store.state.fileLineCount;
            },

            firstDate () {
                return this.$store.getters.firstDate;
            },

            lastDate () {
                return this.$store.getters.lastDate;
            },

            attributesCalendar () {
                return [
                    {
                        dot: {
                            color: 'blue'
                        },
                        dates: this.$store.getters.fileDatesArray
                    }
                ]
            }

        },

    }
</script>

<style scoped>

</style>