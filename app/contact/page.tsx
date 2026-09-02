import Hero from "@/components/Hero";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact — Rafael Turse",
};

export default function ContactsPage() {
  return (
    <div>
      <Hero />

      <div className="relative z-10 mx-auto max-w-3xl px-6 pb-28 pt-6 sm:pb-36 sm:pt-8">
        <header className="text-center">
          <p className="font-body text-xs uppercase tracking-[0.4em] text-gold-soft">Contact</p>
          <h1 className="mt-5 font-display text-5xl tracking-[0.05em] text-ink sm:text-6xl">
            Let&apos;s Talk
          </h1>
          <p className="mx-auto mt-6 max-w-md font-body text-sm leading-relaxed text-muted">
            Send a message below and I'll get back to you.
          </p>
        </header>

        <ContactForm />
      </div>
    </div>
  );
}