import { FileDropzone } from "@/components/ui/file-dropzone";
import { Button } from "@/components/ui/button";
import { TimelineSection } from "@/components/timeline-section"; // Ajuste o caminho conforme necessário

const Home = () => {
    return (
        <div className="flex min-h-screen flex-col gap-24">
            <div className="container mx-auto px-6">
                <h1 className="mb-6 text-4xl font-bold">
                    <span className="text-foreground">Gerador de EDL</span> e{" "}
                    <span className="text-primary">Identificador</span> de trilhas sonoras
                </h1>

                <FileDropzone />

                <div className="mt-6 flex items-center justify-between">
                    <p className="text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas quis auctor leo,
                        eget cursus odio. Integer ipsum odio, congue ac ex vitae, vulputate laoreet sem.
                    </p>

                    <div className="flex gap-2">
                        <Button variant="glass" size="icon">
                            {/* Ícone aqui */}
                        </Button>
                        <Button variant="glass" size="icon">
                            {/* Ícone aqui */}
                        </Button>
                    </div>
                </div>
            </div>

            <TimelineSection />
        </div>
    );
};

export default Home;