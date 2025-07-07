import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import SBreadCrumb from "../../components/Breadcrumb";
import SAlert from "../../components/Alert";
import Form from "./form";
import { useNavigate, useParams } from "react-router-dom";
import { getData, putData } from "../../utils/fetch";
import { useDispatch } from "react-redux";
import { setNotif } from "../../redux/notif/actions";

function ParticipantEdit() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { participantId } = useParams();
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const [alert, setAlert] = useState({
        status: false,
        type: "",
        message: "",
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const fetchOneParticipants = async () => {
        const res = await getData(`/participants/${participantId}`);

        setForm({
            ...form,
            firstName: res.data.data.firstName,
            lastName: res.data.data.lastName,
            email: res.data.data.email,
        });
    };

    useEffect(() => {
        fetchOneParticipants();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = async () => {
        setIsLoading(true);
        const res = await putData(`/participants/${participantId}`, form);
        if (res?.data?.data) {
            dispatch(
                setNotif(
                    true,
                    "success",
                    `berhasil ubah participant ${res.data.data.firstName} ${res.data.data.lastName}`
                )
            );
            navigate("/participants");
            setIsLoading(false);
        } else {
            setIsLoading(false);
            setAlert({
                ...alert,
                status: true,
                type: "danger",
                message: res.response.data.msg,
            });
        }
    };

    return (
        <Container className="mt-3">
            <SBreadCrumb
                textSecound={"Participants"}
                urlSecound={"/participants"}
                textThird="Edit"
            />
            {alert.status && (
                <SAlert type={alert.type} message={alert.message} />
            )}
            <Form
                edit
                form={form}
                isLoading={isLoading}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </Container>
    );
}

export default ParticipantEdit;
