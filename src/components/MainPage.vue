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

        <v-row class="text-center">
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
                2
            </v-col>

            <v-col class="mb-4">
                <graph-baanbezetting></graph-baanbezetting>
            </v-col>

        </v-row>

    </v-container>
</template>
<script>
    import GraphBaanbezetting from "./GraphBaanbezetting";

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
        },

        methods: {
            importFile() {

                if (!this.chosenFile) {
                    this.data = "No File Chosen"
                }
                var reader = new FileReader();

                // Use the javascript reader object to load the contents
                // of the file in the v-model prop
                reader.readAsText(this.chosenFile);
                reader.onload = () => {
                    this.$store.commit('SET_INPUT_DATA', reader.result);
                }
            }
        }

    }
</script>

<style scoped>

</style>