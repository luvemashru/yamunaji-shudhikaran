import React from "react";
import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";
import { useState, useRef } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import SignatureCanvas from "react-signature-canvas";

export default function BodyLeft() {
    const [value, setValue] = useState("ß");
    const [name, setName] = useState("");
    const [state, setState] = useState("Maharashtra");
    const signatureCanvasRef = useRef(null);
    const [signatureData, setSignatureData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const clearSignature = async () => {
        signatureCanvasRef.current.clear();
        setSignatureData(null);
    };

    const handleSignatureChange = (data) => {
        setSignatureData(data.target);
    };

    const handleResetForm = () => {
        setName("");
        setValue("");
        setState("");
        clearSignature();
        setIsLoading(false);
    };

    const handleSubmit = async (event) => {
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("number", value);
            formData.append("state", state);
            if(signatureData){
            formData.append("signature", signatureData.toDataURL());}
            setIsLoading(true)
            await fetch(
                `https://script.google.com/macros/s/AKfycby1AQoVTO7udHFOLu28Qjz5ni2L9D0g31w94Keu-5_o3-R1FLBVB_IIuy1S7XvAWE40ZA/exec`,
                {
                method: "POST",
                body: formData,
                },
            )
        } catch (error) {
        console.log("Error submitting data", error);
        }
        handleResetForm();
    };


    const footer = () => {
        return (
        <>
            <hr />
            {isLoading?<Button
                    disabled={true}
                    icon= "pi pi-spin pi-spinner"
                    className="shadow-8 py-2"
                    text raised
                >Submitting</Button>
                :<Button
                onClick={() => handleSubmit()}
                icon="pi pi-check"
                className="shadow-8 py-2"
                disabled={!(name && state && value && signatureData)}
                
                text raised
            >Save</Button>}
            <Button
                className="shadow-8 py-2"
                label="Cancel"
                severity="secondary"
                icon="pi pi-times"
                style={{ marginLeft: "0.5em" }}
                onClick={handleResetForm}
                text raised
            />
        </>
        );
    };

    const header = () => {
        return(
            <div className="rm-1 m-1 p-1">
                <h1>
                <i className="pi pi-user p-1" style={{fontSize:"large"}}></i>
                Personal Information
                </h1>
                <hr/>
            </div>
        )
    }

    return (
        <div className="card flex justify-content-center">
            <Card
                className="card shadow-8"
                header={header}
                subtitle="Yamunaji Abhiyan"
                footer={footer}
                style={{ border: "1px solid black" }}
            >
                <div className="grid py-0">
                <div className="col-6">Name</div>
                <div className="col-6"></div>
                <div className="col-6">
                    <InputText
                    id="username"
                    value={name}
                    label="Name"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    />
                </div>
                <div className="col-6"></div>

                <div className="col-6">Number</div>
                <div className="col-6"></div>
                <div className="col-6">
                    <InputMask
                    id="username"
                    mask="99-9999999999"
                    placeholder="99-9999999999"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    defaultValue={91}
                    />
                </div>
                <div className="col-6"></div>

                <div className="col-6">State</div>
                <div className="col-6"></div>
                <div className="col-6">
                    <InputText
                        id="username"
                        value={state}
                        label="Name"
                        onChange={(e) => setState(e.target.value)}
                        placeholder="State"
                    />
                </div>
                <div className="col-6"></div>
                <div className="col-6">Signature</div>
                <div className="col-6"></div>
                <div className="col-6">
                <div className="signature-container">
                    <SignatureCanvas
                        ref={signatureCanvasRef}
                        onEnd={handleSignatureChange}
                        backgroundColor="#fff"
                        canvasProps={{ width: 300, height: 150 }}
                    />
                    <div className="buttons">
                        <Button className="shadow-8" icon="pi pi-refresh" onClick={clearSignature}></Button>
                    </div>
                </div>
                </div>
                <div className="col-6"></div>
                </div>
            </Card>
    </div>
    );
}
