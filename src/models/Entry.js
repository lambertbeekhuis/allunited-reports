import { parseISO, intervalToDuration} from "date-fns";
export class Entry {

    constructor(data, fields) {
        fields.forEach((field, index) => {
            this[field] = data[index];
        });


        // should actually be startTime and endTime
        this.startDate = parseISO(this['Vanaf datum'] + 'T' + this['Tijd vanaf']);
        this.startTime = this.startDate.getTime();
        this.endDate = parseISO(this['Vanaf datum'] + 'T' + this['Tijd t/m']);
        this.endTime = this.endDate.getTime();

        let intervalObject = intervalToDuration({start: this.startDate, end: this.endDate});
        this.duration = intervalObject.hours * 60 + intervalObject.minutes;

        this.opponents = []


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

    addOpponent(entry) {
        this.opponents.push(entry);
    }

    // to filter double entries on the same court (=opponents)
    getObjectKey () {
        return this.startTime + '_' + this['Locatiecode'];
    }



    /*
    addEvent(event) {

    }

    */



}