<template>
    <v-row v-if="fileRange.start">
        <v-col class="mb-4" cols="3">

            <div class="py-2">
                <vc-date-picker
                        mode="range"
                        v-model="range"
                        color="blue"
                        is-inline
                        :attributes="attributesCalendar"
                />
            </div>
            <v-alert type="info" dismissible dense>
                Kies de grafiek-periode. <br/>De 1e klik is de start, de 2e klik is de einddatum.
            </v-alert>
            <div class="py-2">Exportfile: {{fileName}}<br/>({{fileRange.start}} until {{fileRange.end}})</div>
            <div class="py-2">LineCount: {{fileLineCount}}</div>
            <div class="py-2">FileFields: {{fileFields}}</div>
            <div class="py-2">Courts: {{courts}}</div>



        </v-col>

        <v-col class="mb-4" cols="9">
            <graph-baanbezetting :range="range"></graph-baanbezetting>
        </v-col>
    </v-row>
    <v-row v-else>
        Upload eerst een data-file, of gebruik de demo-data
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

            fileName () {
              return this.$store.state.fileName;
            },

            fileFields () {
                return this.$store.state.fileFields;
            },

            fileLineCount () {
                return this.$store.state.fileLineCount;
            },

            fileRange () {
                return this.$store.state.fileRange;
            },

            courts () {
                return this.$store.state.courts;
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