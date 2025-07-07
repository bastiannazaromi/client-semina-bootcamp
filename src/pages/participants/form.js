import React from "react";
import { Form } from "react-bootstrap";
import SButton from "../../components/Button";
import TextInputWithLabel from "../../components/TextInputWithLabel";

export default function CategoriesForm({
    handleSubmit,
    form,
    handleChange,
    isLoading,
    edit,
}) {
    return (
        <Form>
            <TextInputWithLabel
                placeholder={"Masukan nama depan"}
                label={"Nama Depan"}
                name="firstName"
                value={form.firstName}
                type="text"
                onChange={handleChange}
            />
            <TextInputWithLabel
                placeholder={"Masukan nama belakang"}
                label={"Nama Belakang"}
                name="lastName"
                value={form.lastName}
                type="text"
                onChange={handleChange}
            />
            <TextInputWithLabel
                placeholder={"Masukan email"}
                label={"Email"}
                name="email"
                value={form.email}
                type="email"
                onChange={handleChange}
            />
            {!edit && (
                <TextInputWithLabel
                    placeholder={"Masukan password"}
                    label={"Password"}
                    name="password"
                    value={form.password}
                    type="password"
                    onChange={handleChange}
                />
            )}
            <SButton
                variant="primary"
                action={handleSubmit}
                loading={isLoading}
            >
                {edit ? "Ubah" : "Simpan"}
            </SButton>
        </Form>
    );
}
