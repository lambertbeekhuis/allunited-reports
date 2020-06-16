<template>
    <v-container>

        <v-row class="text-center">
            <v-col class="mb-4">
                <v-tabs
                    v-model="tab"
                    color="blue"
                    grow
                >
                    <v-tab
                        v-for="item in tabItems"
                        :key="item.label"
                    >
                        {{ item.label }}
                    </v-tab>
                </v-tabs>
            </v-col>
        </v-row>

        <v-row class="text-center">
            <v-col class="mb-4">
                <component v-bind:is="tabItems[tab].component"></component>
            </v-col>
        </v-row>

        <v-row>
            <v-col class="mb-4" cols="3">
                <v-file-input
                        accept=".csv"
                        v-model="chosenFile"
                        label="AllUnited report file"
                >
                </v-file-input>
                <v-btn right @click="importFile">Import</v-btn>

                <div>Aantal regels: {{fileLineCount}}</div>
                <div>Eerste dag: {{firstDate}}</div>
                <div>Laatste dag: {{lastDate}}</div>



            </v-col>
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

            <v-col class="mb-4" cols="6">
                <graph-baanbezetting v-if="firstDate" :range="range"></graph-baanbezetting>
            </v-col>

        </v-row>

    </v-container>
</template>
<script>
    import GraphBaanbezetting from "./GraphBaanbezetting";
    import {dateFns} from "../utils/dateHelper";
    import FileUpload from "./FileUpload";
    import Thanks from "./Thanks";
    import Rapportage from "./Rapportage";

    export default {
        name: "MainPage",
        components: {
            Rapportage,
            Thanks,
            FileUpload,
            GraphBaanbezetting
        },
        data: () => ({
            chosenFile: null,
            tab: 0,  // the choosen tab
            tabItems: [
                {label: 'File upload', component: 'FileUpload'},
                {label: 'Rapportage', component: 'Rapportage'},
                {label: 'Thanks', component: 'Thanks'}
            ],
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

        methods: {
            importFile() {
                if (!this.chosenFile) {
                    this.data = "No File Chosen"
                    return;
                }
                let fileReader = new FileReader();
                fileReader.name = this.chosenFile.name; // inject the filename, so I can retrieve it again from File

                // Use the javascript reader object to load the contents
                // of the file in the v-model prop
                fileReader.readAsText(this.chosenFile);
                fileReader.onload = () => {
                    this.$store.commit('SET_INPUT_DATA', fileReader);
                }
            }
        }

    }
</script>

<style scoped>

</style>