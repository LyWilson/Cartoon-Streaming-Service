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

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CssBaseline from '@mui/material/CssBaseline';

export function App() {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <CssBaseline />
                <BrowserRouter>
                    <Navbar/>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="*" element={<NoMatch/>}/>
                        <Route path="/details/:tvshowId" element={<Details/>}/>
                        <Route path="/season/:seasonId" element={<Season/>}/>
                        <Route path="/episode/:episodeId" element={<Episode/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/history" element={<Historique/>}/>
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </QueryClientProvider>
    );
}
