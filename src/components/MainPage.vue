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


                <h3>Elements {{fileLines.length}}</h3>
                <div>
                    <span v-for="(field, indexF) in fileFields" :key="indexF">{{field}}, </span>
                </div>
                <div v-for="(line, indexL) in fileData" :key="indexL">
                    <span v-for="(element, indexE) in line" :key="indexL + indexE" class="ms-3">{{element}}</span>
                </div>

                <h3>Lines</h3>
                <div v-for="(line, index) in fileLines" :key="index">{{line}}</div>

                <h3>Text</h3>
                {{fileText}}
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
            fileText: null,
            fileLines: [],
            fileData: [],
            fileFields: []
        }),

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
                    this.fileText = reader.result;

                    // Split By lines
                    var lines = this.fileText.split('\n');
                    for(var nr = 0; nr < lines.length; nr++) {
                        this.fileLines.push(line);
                        let line = lines[nr].trim().replace(',,', ',"",');  // replace empty values (,,), by ,"",
                        let data = JSON.parse('[' + line + ']')
                        if (nr === 0 ) {
                            this.fileFields = data;
                            continue;
                        }
                        this.fileData.push(data);
                    }

                }
            }
        }

    }
</script>

<style scoped>

</style>