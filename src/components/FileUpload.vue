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

            <v-btn right @click="importDemoFile">Demo</v-btn>

            <div>Aantal regels: {{fileLineCount}}</div>
            <div>Eerste dag: {{firstDate}}</div>
            <div>Laatste dag: {{lastDate}}</div>

        </v-col>

        <v-col class="mb-4" cols="9">
            <h3>Hoe maak ik het juiste export-bestand vanuit AllUnited?</h3>
            <div>Definieer een export-wizard zoals onderstaand en exporteer met Komma/"waarde"</div>

            <v-img src="./../assets/selectie-wizard2.jpg"></v-img>

            <div>Exporteer vervolgens met Komma/"waarde"</div>

            <v-img src="./../assets/Selectie-wizard-export.jpg"></v-img>
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
            },


            // https://medium.com/@sampath.katari/read-file-as-data-url-using-filereader-javascript-f84b1662c58c
            importDemoFile() {
                this.$store.commit('SET_INPUT_DATA_DEMO');
                this.$store.commit('SET_INPUT_DATA', false);
            }
        }

    }
</script>

<style scoped>

</style>