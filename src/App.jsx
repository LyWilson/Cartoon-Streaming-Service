import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Home} from "./Home";
import {NoMatch} from "./NoMatch.jsx";
import {Navbar} from "./components/Navbar.jsx";
import {AuthProvider} from "./Auth";
import {Login} from "./Login.jsx";
import {Register} from "./Register.jsx";
import {Details} from "./Details.jsx";
import {Season} from "./Season.jsx";
import {Episode} from "./Episode.jsx";
import {Historique} from "./Historique.jsx";

export function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="*" element={<NoMatch/>}/>
                    <Route path="/details/:tvshowId" element={<Details/>}/>
                    <Route path="/episodes/:seasonsId" element={<Season/>}/>
                    <Route path="/episode/:episodeId" element={<Episode/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/history" element={<Historique/>}/>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}
