"use client";

const footerLinks = ["About", "Services", "Portfolio", "Contact"];

export default function Footer() {
    const handleFooterClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
        e.preventDefault();
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <footer className="bg-[#020918] text-white px-6 md:px-16 py-16 md:py-20">
            <div className="mx-auto w-full">
                <div className="grid gap-12 lg:grid-cols-[1.2fr_0.9fr_0.9fr] lg:gap-24">
                    <div>
                        <div className="flex flex-col items-start gap-4">
                            <h2
                                className="text-[4rem] sm:text-[5.5rem] md:text-[6.5rem] font-black uppercase leading-none text-red-500"
                                style={{ fontFamily: "'Anton', sans-serif" }}
                            >
                                REXTON
                            </h2>

                            <div className="flex items-center gap-2 text-lg md:text-xl text-white/60">
                                <span className="h-px w-16 bg-white/50" />
                                <span>Since 2019</span>
                            </div>
                        </div>

                        <p className="mt-12 max-w-md text-lg md:text-xl leading-9 text-white/60">
                            We are a full-service digital agency helping brands grow through
                            strategy, design, development, and digital marketing.
                        </p>
                    </div>

                    <div>
                        <h3
                            className="text-4xl md:text-4xl font-black uppercase leading-none"
                            style={{ fontFamily: "'Anton', sans-serif" }}
                        >
                            Office Address
                        </h3>
                        <address className="mt-8 not-italic text-lg md:text-lg leading-9 text-white/60">
                            245 Market Street, Suite 310
                            <br />
                            San Francisco, CA 94103 
                            <br />
                            United States
                        </address>
                    </div>

                    <div>
                        <h3
                            className="text-4xl md:text-4xl font-black uppercase leading-none"
                            style={{ fontFamily: "'Anton', sans-serif" }}
                        >
                            Contact Info
                        </h3>
                        <div className="mt-8 flex flex-col gap-2 text-lg md:text-lg text-white/60">
                            <a
                                href="mailto:hello@rextonstudio.com"
                                className="transition-colors hover:text-white"
                            >
                                Email: hello@rextonstudio.com
                            </a>
                            <a
                                href="tel:+10000000000"
                                className="transition-colors hover:text-white"
                            >
                                Phone: +1 (000) 000-0000
                            </a>
                            <p>Location: United States</p>
                        </div>
                    </div>
                </div>

                <div className="mt-20 border-t border-white/15 pt-8 md:mt-24">
                    <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                        <p className="text-lg md:text-xl text-white/60">
                            ©Copyright 2026 REXTON All Right Reserves.
                        </p>

                        <nav className="flex flex-wrap gap-x-10 gap-y-4 text-lg md:text-xl font-semibold text-white/85">
                            <a
                                href="#about"
                                onClick={(e) => handleFooterClick(e, "about")}
                                className="transition-colors hover:text-red-500 cursor-pointer"
                            >
                                About
                            </a>
                            <a
                                href="#services"
                                onClick={(e) => handleFooterClick(e, "services")}
                                className="transition-colors hover:text-red-500 cursor-pointer"
                            >
                                Services
                            </a>
                            <a
                                href="#projects"
                                onClick={(e) => handleFooterClick(e, "projects")}
                                className="transition-colors hover:text-red-500 cursor-pointer"
                            >
                                Projects
                            </a>
                            <a
                                href="#contact"
                                onClick={(e) => handleFooterClick(e, "contact")}
                                className="transition-colors hover:text-red-500 cursor-pointer"
                            >
                                Contact
                            </a>
                        </nav>
                    </div>
                </div>
            </div>
        </footer>
    );
}
