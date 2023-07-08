import { Model, ORM, fk } from "redux-orm";

class NoteBlock extends Model {}
NoteBlock.modelName = 'NoteBlock';
NoteBlock.fields = {
  noteId: fk({
    to:'Note',
    as: 'note',
    relatedName: 'blocks'

  })
}


export default NoteBlock