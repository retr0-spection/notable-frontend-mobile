class NoteCanvas {
    constructor(data) {
        if (data){
            this.metadata = data.metadata
            this.initContents = data.contents
        }
    }
}


export default NoteCanvas;