<template>
    <v-row>
        <v-col class="mb-4" cols="3">
            <v-file-input
                    accept=".csv"
                    v-model="chosenFile"
                    label="Add AllUnited report-file"
            >
            </v-file-input>
            <v-btn right @click="importFile" v-bind="{disabled: !chosenFile}">Import</v-btn>

            <v-btn right @click="importDemoFile">Use demo data</v-btn>

            <div>Aantal regels: {{fileLineCount}}</div>
            <div>Eerste dag: {{firstDate}}</div>
            <div>Laatste dag: {{lastDate}}</div>

        </v-col>

        <v-col class="mb-4" cols="9">
            <h3>Hoe maak ik het juiste export-bestand vanuit AllUnited?</h3>
            <div>Stap 1) Definieer een export-wizard zoals onderstaand en exporteer met Komma/"waarde"</div>

            <v-img src="./../assets/selectie-wizard2.jpg"></v-img>
            <br/>

            <div>Stap 2) Exporteer vervolgens met Komma/"waarde"</div>

            <v-img src="./../assets/Selectie-wizard-export.jpg" max-width="550"></v-img>
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

            // https://vuejs.org/v2/cookbook/using-axios-to-consume-apis.html
            importDemoFile() {
                this.$store.dispatch('loadDemoData')
                    .then(response => {});

            }
        }

    }
</script>

<style scoped>

</style>