import Link from "next/link"
import {Button} from "@/components/ui/button"
import ThemeToggler from "@/components/ui/theme-toggler";

export default function Header() {
    return (
        <header>
            <div className="sticky top-0 container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <Link href="/" className="text-xl font-bold">
                        S<span className="text-primary">O</span>NAR
                    </Link>
                    <nav className="hidden md:flex items-center gap-6">
                        <Link href="#" className="text-sm  transition-colors">
                            Funcionalidades
                        </Link>
                        <Link href="#" className="text-sm transition-colors">
                            Documentação
                        </Link>
                        <Link href="#" className="text-sm transition-colors">
                            Sobre nós
                        </Link>
                    </nav>
                    <div className="flex items-center gap-6">
                        <Button variant="glass" className="bg-background text-foreground">
                            Logout
                        </Button>
                        <ThemeToggler/>
                    </div>
                </div>
            </div>
        </header>
    )
}
