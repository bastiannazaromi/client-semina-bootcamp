import { useState } from "react";
import "./App.css";
import Button from "./components/Button";
import Input from "./components/Input";

function App() {
    const [count, setCount] = useState(0);

    const [form, setForm] = useState({
        name: "",
        usia: "",
        tahunLahir: "",
    });

    const [error, setError] = useState("");

    const klik = () => {
        setCount(count + 1);
    };

    const handleSubmit = () => {
        if (form.name === "") {
            setError("Nama tidak boleh kosong");
        } else if (form.tahunLahir === "") {
            setError("Tahun lahir tidak boleh kosong");
        } else {
            setForm({ ...form, usia: 2022 - form.tahunLahir });
        }
    };

    const handleChange = (e) => {
        setError("");
        if (e.target.name === "name") {
            if (e.target.value.length < 3) {
                setError("Minimal 3 karakter");
            }
        }
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <>
            <div>
                <h1>Counter App</h1>
                <p>Nilai Counter saat ini {count}</p>
                <Button onClick={klik}>Click me</Button>
                <hr />
                <h1>Aplikasi input data diri</h1>
                Name :{" "}
                <Input
                    type="text"
                    value={form.name}
                    name="name"
                    handleChange={handleChange}
                />
                <hr />
                Tahun Lahir :{" "}
                <Input
                    type="number"
                    value={form.tahunLahir}
                    name="tahunLahir"
                    handleChange={handleChange}
                />
                <hr />
                Umur saya : {form.usia}
                <hr />
                <Button onClick={handleSubmit}>Submit</Button>
                <p style={{ color: "red" }}>{error}</p>
            </div>
        </>
    );
}

export default App;
