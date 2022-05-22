import { Textfit } from "react-textfit";
import "./Screen.css"

const Screen = ({value}) => {
    return (
        <Textfit 
            className = 'scree' 
            mode = 'single'
            max = {70}>
                {value}
            </Textfit>
    );
};

export default Screen;