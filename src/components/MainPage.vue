<template>
    <v-container>
        <v-row class="text-center">
            <v-col class="mb-4">
                <h1 class="display-2 font-weight-bold mb-3">
Reports voor AllUnited baanbezetting
                </h1>

                <v-btn>1. Upload file</v-btn>

                <v-btn>2. Kies report</v-btn>

                <v-btn>3. Kies period</v-btn>

            </v-col>
        </v-row>

        <v-row>
            <v-col class="mb-4">
                <v-file-input
                        accept=".csv"
                        v-model="chosenFile"
                        label="AllUnited report file"
                >
                </v-file-input>
                <v-btn right @click="importFile">Import</v-btn>

                <h3>Elements {{fileData.length}}</h3>
                <div>
                    <span v-for="(field, indexF) in fileFields" :key="indexF">{{field}}, </span>
                </div>
                <div v-for="(line, indexL) in fileData" :key="indexL">
                    <span v-for="(element, indexE) in line" :key="indexL + indexE" class="ms-3">{{element}}</span>
                </div>
            </v-col>
            <v-col class="mb-4">
                <div>firstDate: {{firstDate}}</div>
                <div>lastDate: {{lastDate}}</div>
                <div>-- times -- </div>
                <div v-for="(time, index) in times" :key="index">{{time}}</div>
                <div>-- days -- </div>
                <div v-for="(day, index) in days" :key="index">{{day}}</div>

            </v-col>

            <v-col class="mb-4">
                <graph-baanbezetting v-if="fileData.length"></graph-baanbezetting>
            </v-col>

        </v-row>

    </v-container>
</template>
<script>
    import GraphBaanbezetting from "./GraphBaanbezetting";
    import {dateFns} from "../utils/dateHelper";

    export default {
        name: "MainPage",
        components: {
            GraphBaanbezetting
        },
        data: () => ({
            chosenFile: null,
        }),

        computed: {
            fileFields () {
                return this.$store.state.fileFields;
            },

            fileData () {
                return this.$store.state.fileData;
            },

            firstDate () {
                return this.$store.state.entries.reduce((firstDate, entry) => {
                    if (entry['Vanaf datum'] < firstDate || firstDate === false) {
                        return entry['Vanaf datum'];
                    }
                    return firstDate;
                }, false);
            },

            lastDate () {
                return this.$store.state.entries.reduce((lastDate, entry) => {
                    if (entry['Vanaf datum'] > lastDate || lastDate === false) {
                        return entry['Vanaf datum'];
                    }
                    return lastDate;
                }, false);
            },

            days () {
                if (this.firstDate) {
                    return dateFns.datesFromStartToEnd(this.firstDate, this.lastDate);
                } else {
                    return []
                }
            },

            times () {
                if (this.firstDate) {
                    return dateFns.dateTimesFromStartTimeToEndTime(this.firstDate, '10:00', '11:00', 15);
                } else {
                    return []
                }
            },

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