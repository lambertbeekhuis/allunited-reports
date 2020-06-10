
export class Entry {

    constructor(data, fields) {
        fields.forEach((field, index) => {
            this[field] = data[index];
        });

        /*
        {
         "Reserveringstypecode":"BO",
         "Reserveringstype":"Baanonderhoud",
         "Tijd vanaf":"07:00:00",
         "Tijd t/m":"10:30:00",
         "Zoek":"",
         "Vanaf datum":"2020-06-08",
         "Aantal":"1",
         "Locatiecode":"BAAN8"
        }
        */
    }

    getCourt() {
        return this['Locatiecode'];
    }

    /*
    addEvent(event) {

    }

    */



}