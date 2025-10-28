"use client"

import {useState} from "react";
import {FileDropzone} from "@/components/ui/file-dropzone";
import {Button} from "@/components/ui/button";
import {TimelineSection} from "@/components/timeline-section";
import {FaDropbox, FaGoogleDrive} from "react-icons/fa";
import {ProcessingTimeline} from "@/components/processing-timeline";
import BouncingDots from "@/components/ui/bouncing-dots";


const Home = () => {

    const [step, setStep] = useState<number | null>(null);

    const STEPS = ["Extração", "Separação", "Identificação", "Geração de EDL"];

    const handleFileAccepted = async (_formData: FormData) => {
        setStep(0);

        const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

        for (let i = 0; i < STEPS.length; i++) {
            setStep(i);
            await delay(5000);
        }

        await delay(5000);
        window.location.href = "/resultados";
    };


    return (
        <div className="flex flex-col gap-24">
            <div className="container mx-auto px-6">

                {step === null ? (
                    // mudar para componente
                    <>
                        <h1 className="mb-6 text-4xl">
                            <strong>Gerador de EDL</strong> e <strong>Identificador</strong> de trilhas sonoras
                        </h1>
                        <FileDropzone onUpload={handleFileAccepted}/>
                    </>
                ) : (

                    // mudar para componente
                    <>
                        <div className="flex items-center gap-4">
                            <h1 className="mb-6 text-4xl">
                                <strong>Aguarde</strong>, estamos trabalhando nisso
                                <BouncingDots />
                            </h1>
                        </div>
                        <ProcessingTimeline currentStep={step} steps={STEPS}/>
                    </>
                )
                }

                <div className="mt-6 flex items-center justify-between">
                    <p className="text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas quis auctor leo,
                        eget cursus odio. Integer ipsum odio, congue ac ex vitae, vulputate laoreet sem.
                    </p>

                    <div className="flex gap-2">
                        <Button className="cursor-pointer" variant="glass" size="icon">
                            <FaDropbox className="w-5 h-5"/>
                        </Button>
                        <Button className="cursor-pointer" variant="glass" size="icon">
                            <FaGoogleDrive className="w-5 h-5"/>
                        </Button>
                    </div>


                </div>
            </div>

            <TimelineSection/>
        </div>
    );
};

export default Home;