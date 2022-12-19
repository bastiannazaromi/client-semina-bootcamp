import React from "react";

export default function SButton({ onClick, children }) {
    return <button onClick={onClick}>{children}</button>;
}
