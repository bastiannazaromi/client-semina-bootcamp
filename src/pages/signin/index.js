import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Container } from "react-bootstrap";
import SAlert from "../../components/Alert";
import SForm from "./form";
import { postData } from "../../utils/fetch";
import { useDispatch } from "react-redux";
import { userLogin } from "../../redux/auth/actions";

function PageSignin() {
    const dispatch = useDispatch();

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
            const res = await postData(`/cms/auth/signin`, form);
            const token = res.data.data.token;
            const role = res.data.data.role;

            setIsLoading(false);

            dispatch(userLogin(token, role));
            navigate("/");
        } catch (err) {
            setIsLoading(false);

            console.log(err);
            const msg = err?.response?.data?.msg ?? "Internal server error";
            setAlert({
                status: true,
                message: msg,
                type: "danger",
            });
        }
    };

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
