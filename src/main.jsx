import React from "react"
import ReactDOM from "react-dom/client"
import {App} from "./App.jsx"
import {HistoryProvider} from "./History.jsx";
import "bulma/css/bulma.min.css"
import "font-awesome/css/font-awesome.min.css"

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <HistoryProvider>
            <div className="container">
                <App/>
            </div>
        </HistoryProvider>
    </React.StrictMode>
);
