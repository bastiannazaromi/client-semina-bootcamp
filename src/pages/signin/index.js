import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Card, Container } from "react-bootstrap";
import { config } from "../../configs";
import axios from "axios";
import SAlert from "../../components/Alert";
import SForm from "./form";

function PageSignin() {
    const token = localStorage.getItem("token");

    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setAlert({
            status: false,
        });
    };

    const [alert, setAlert] = useState({
        status: false,
        message: "",
        type: "",
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const res = await axios.post(
                `${config.api_host_dev}/cms/auth/signin`,
                form
            );

            const token = res.data.data.token;

            setIsLoading(false);

            setAlert({
                status: true,
                message: "Success Login",
                type: "success",
            });

            localStorage.setItem("token", token);
            navigate("/");
        } catch (err) {
            setIsLoading(false);

            const msg = err?.response?.data?.msg ?? "Internal server error";
            setAlert({
                status: true,
                message: msg,
                type: "danger",
            });
        }
    };

    if (token) return <Navigate to="/" replace={true} />;

    return (
        <Container md={12}>
            <div className="m-auto mt-2" style={{ width: "50%" }}>
                {alert.status && (
                    <SAlert message={alert.message} type={alert.type} />
                )}
            </div>
            <Card style={{ width: "50%" }} className="m-auto mt-5">
                <Card.Header>
                    <Card.Title>Form Login</Card.Title>
                </Card.Header>
                <Card.Body>
                    <SForm
                        form={form}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        isLoading={isLoading}
                    />
                </Card.Body>
            </Card>
        </Container>
    );
}

export default PageSignin;
