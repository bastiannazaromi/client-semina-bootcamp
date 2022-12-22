import React from "react";
import TextInputWithLabel from "../../components/TextInputWithLabel";
import SButton from "../../components/Button";
import { Form } from "react-bootstrap";

export default function SForm({ form, handleChange, isLoading, handleSubmit }) {
    return (
        <Form>
            <TextInputWithLabel
                label="Email Address"
                type="email"
                name="email"
                value={form?.email}
                placeholder="Enter email"
                onChange={handleChange}
            />
            <TextInputWithLabel
                label="Password"
                type="password"
                name="password"
                value={form?.password}
                placeholder="Password"
                onChange={handleChange}
            />
            <SButton
                loading={isLoading}
                disabled={isLoading}
                variant="primary"
                action={handleSubmit}
            >
                Submit
            </SButton>
        </Form>
    );
}
