import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Container, Spinner, Table } from "react-bootstrap";
import SButton from "../../components/Button";
import SBreadCrumb from "../../components/Breadcrumb";
import SNavbar from "../../components/Navbar";
import axios from "axios";
import { config } from "../../configs";

export default function PageCategories() {
    const token = localStorage.getItem("token");

    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getCategoriesAPI = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get(
                `${config.api_host_dev}/cms/categories`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setTimeout(() => {
                setData(res.data.data);
                setIsLoading(false);
            }, 2000);
        } catch (err) {
            setIsLoading(false);
            console.log(err);
        }
    };

    useEffect(() => {
        getCategoriesAPI();
    }, []);

    if (!token) return <Navigate to="/signin" replace={true} />;
    return (
        <>
            {console.log("render")}
            <SNavbar />
            <Container className="mt-2">
                <SBreadCrumb textSecound="Categories" />
                <SButton action={() => navigate("/categories/create")}>
                    Tambah
                </SButton>
                <Table striped bordered hover variant="dark" className="mt-3">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td
                                    colSpan={data.length + 1}
                                    rowSpan="3"
                                    style={{ textAlign: "center" }}
                                >
                                    <div className="flex items-center justify-center">
                                        <Spinner
                                            animation="border"
                                            variant="light"
                                        />
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            data.map((dt, index) => (
                                <tr key={dt._id}>
                                    <td>{index + 1}</td>
                                    <td>{dt.name}</td>
                                    <td>@mdo</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
            </Container>
        </>
    );
}
