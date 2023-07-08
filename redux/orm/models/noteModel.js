import { Model, ORM } from "redux-orm";

class Note extends Model {
    static reducer(action, Note, session){
        let note;
        switch(action.type){
            case 'CREATE_NOTE':
                Note.create(action.payload);
                break;
            case 'UPDATE_NOTE':
                Note.get({hash:action.payload.hash});
                Note.update(action.payload)
        }
    }
}
Note.modelName = 'Note';


export default Note