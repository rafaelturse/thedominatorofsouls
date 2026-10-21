import BackToTopButton from "@/components/link/BackToTopButton";
import FooterContent from "./FooterContent";

export default function Footer() {
    return (
        <div>
            <div className="mx-auto flex max-w-5xl justify-center px-5 py-4">
                <BackToTopButton />
            </div>

            <footer className="border-t border-line bg-black">
                <FooterContent />
            </footer>
        </div>
    );
}