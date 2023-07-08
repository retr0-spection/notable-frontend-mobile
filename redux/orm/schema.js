import { ORM } from "redux-orm";
import NoteBlock from "./models/noteBlockModel";
import Note from "./models/noteModel";


const orm = new ORM({
    stateSelector:state => state.orm
})
orm.register(Note, NoteBlock);
export default orm;