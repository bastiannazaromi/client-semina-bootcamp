import { Route, Routes } from "react-router-dom";

import Participants from "../pages/participants";
import Create from "../pages/participants/create";
import Edit from "../pages/participants/edit";

export function ParticipantsRoute() {
    return (
        <Routes>
            <Route path="/" element={<Participants />} />
            <Route path="/create" element={<Create />} />
            <Route path="/edit/:participantId" element={<Edit />} />
        </Routes>
    );
}
