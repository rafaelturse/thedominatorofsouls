import ContactIcons from "@/components/ContactIcons";

export default function FooterHome() {
    return (
        <div>
            <footer className="mt-10 border-t border-line">
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