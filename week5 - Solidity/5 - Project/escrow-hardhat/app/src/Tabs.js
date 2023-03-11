import { useState } from "react";
import "./Tabs.css";

function Tabs(props) {
    const [toggleState, setToggleState] = useState(0);

    const toggleTab = (index) => {
        setToggleState(index);
    };

    return (
        <div className="container">
            <div className="bloc-tabs">
                {props.tabNames.map((name, index) => (
                    <button
                        key={index}
                        className={toggleState === index ? "tabs active-tabs" : "tabs"}
                        onClick={() => toggleTab(index)}
                    >
                        {name}
                    </button>
                ))}
            </div>

            <div className="content-tabs">
                {props.tabContents.map((content, index) => (
                    <div
                        className={toggleState === index ? "content  active-content" : "content"}
                        key={index}
                    >
                        {content}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Tabs;