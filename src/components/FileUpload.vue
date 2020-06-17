<template>
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

        <v-col class="mb-4" cols="9">
        plaatje
        </v-col>

    </v-row>
</template>

<script>
    export default {
        name: "FileUpload",

        data: () => ({
            chosenFile: null,
        }),

        computed: {
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