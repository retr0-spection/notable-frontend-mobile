import TitleComponent from "./titleComponent";
import NoteTextInput from "./noteTextInput";
import CheckBoxComponent from "./checkboxComponent";
import LatexComponent from "./latexComponent";
import BulletComponent from "./bulletComponent";
import NumberedComponent from "./numberedComponent";

// components mapped by key
const components = {
    'TitleComponent' : <TitleComponent />,
    'ParagraphComponent' : <NoteTextInput />,
    'CheckBoxComponent' : <CheckBoxComponent />,
    'LatexComponent': <LatexComponent />,
    'BulletComponent': <BulletComponent />,
    'NumberedComponent': <NumberedComponent />,

}



export default components;
