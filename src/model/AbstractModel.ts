import { Model as ObjectionModel, Pojo } from 'objection';
import { format } from 'date-fns';

export class AbstractModel extends ObjectionModel {
    public static modelPaths = [__dirname];
    protected static dateFields = new Array<string>();

    $parseJson(json: Pojo, opt: any) {
        json = super.$parseJson(json, opt);
        //console.log(json);

        const constructor = this.constructor as any;
        constructor.dateFields.forEach((dateField: string) => {
            const fieldValue = json[dateField];
            if (fieldValue && typeof fieldValue === 'string') {
                //console.log(`Creating date from ${dateField}='${fieldValue}'.`);
                json[dateField] = new Date(fieldValue);
            } else {
                //console.log(`Creating [NOT] date from ${dateField}='${fieldValue}'.`);
            }
        });
        return json;
    }

    $beforeInsert() {
        const thisAny = this as any;
        const constructor = this.constructor as any;

        constructor.dateFields.forEach((dateField: string) => {
            const date = this[dateField];

            //console.log('Converting ',dateField,date)

            if (date) {
                if (dateField.match(/^Time.*$/g)) {
                    thisAny[dateField] = format(date, 'HH:mm:ss');
                } else {
                    thisAny[dateField] = format(date, 'yyyy-MM-dd HH:mm:ss');
                }
            }

            //console.log('Converted= ',thisAny[dateField])
        });
        //console.log(thisAny);
    }
}
