import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SBreadCrumb from "../../components/Breadcrumb";
import SButton from "../../components/Button";
import Table from "../../components/TableWithAction";
import { useSelector, useDispatch } from "react-redux";
import { fetchParticipants } from "../../redux/participants/actions";
import SAlert from "../../components/Alert";
import Swal from "sweetalert2";
import { deleteData } from "../../utils/fetch";
import { setNotif } from "../../redux/notif/actions";
import { accessParticipant } from "../../const/access";

function Categories() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const notif = useSelector((state) => state.notif);
    const participants = useSelector((state) => state.participants);
    const [access, setAccess] = useState({
        tambah: false,
        hapus: false,
        edit: false,
    });

    const checkAccess = () => {
        let { role } = localStorage.getItem("auth")
            ? JSON.parse(localStorage.getItem("auth"))
            : {};
        const access = { tambah: false, hapus: false, edit: false };
        Object.keys(accessParticipant).forEach(function (key, index) {
            if (accessParticipant[key].indexOf(role) >= 0) {
                access[key] = true;
            }
        });

        setAccess(access);
    };

    useEffect(() => {
        checkAccess();
    }, []);

    useEffect(() => {
        dispatch(fetchParticipants());
    }, [dispatch]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Apa kamu yakin?",
            text: "Anda tidak akan dapat mengembalikan ini!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Iya, Hapus",
            cancelButtonText: "Batal",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await deleteData(`/participants/${id}`);
                dispatch(
                    setNotif(
                        true,
                        "success",
                        `berhasil hapus participant ${res.data.data.firstName} ${res.data.data.lastName}`
                    )
                );
                dispatch(fetchParticipants());
            }
        });
    };

    return (
        <Container className="mt-3">
            <SBreadCrumb textSecound={"Participants"} />

            {access.tambah && (
                <SButton
                    className={"mb-3"}
                    action={() => navigate("/participants/create")}
                >
                    Tambah
                </SButton>
            )}

            {notif.status && (
                <SAlert type={notif.typeNotif} message={notif.message} />
            )}

            <Table
                status={participants.status}
                thead={["First Name", "Last Name", "Email", "Status", "Aksi"]}
                data={participants.data}
                tbody={["firstName", "lastName", "email", "status"]}
                editUrl={access.edit ? `/participants/edit` : null}
                deleteAction={access.hapus ? (id) => handleDelete(id) : null}
                withoutPagination
            />
        </Container>
    );
}

export default Categories;
