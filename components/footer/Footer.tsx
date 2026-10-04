import ContactIcons from "@/components/sessions/ContactIcons";
import BackToTopButton from "@/components/link/BackToTopButton";

export default function Footer() {
    return (
        <div>
            <div className="mx-auto flex max-w-5xl justify-center px-5 py-4">
                <BackToTopButton />
            </div>

            <footer className="border-t border-line">
                <div className="mx-auto max-w-5xl px-5 py-8">
                    <div className="flex justify-center">
                        <ContactIcons size={24} className="gap-5 text-muted" />
                    </div>

                    <div className="mt-6 flex justify-center">
                        <span className="font-accent text-sm tracking-wide text-muted">
                            developed by <span className="text-muted-light transition-colors hover:text-gold-soft">Rafael Turse</span> with{" "}
                            <span className="text-muted-light transition-colors hover:text-gold-soft">Next.js</span> and{" "}
                            <span className="text-muted-light transition-colors hover:text-gold-soft">Tailwind</span>
                        </span>
                    </div>
                </div>
            </footer>
        </div>
    );
}