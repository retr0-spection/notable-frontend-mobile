import TitleComponent from "./titleComponent";
import NoteTextInput from "./noteTextInput";
import CheckBoxComponent from "./checkboxComponent";
import LatexComponent from "./latexComponent";

// components mapped by key
const components = {
    'TitleComponent' : <TitleComponent />,
    'ParagraphComponent' : <NoteTextInput />,
    'CheckBoxComponent' : <CheckBoxComponent />,
    'LatexComponent': <LatexComponent />

}



export default components;
