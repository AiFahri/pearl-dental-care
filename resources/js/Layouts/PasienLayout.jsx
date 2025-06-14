import { useEffect, useRef } from "react";
import Navbar from "@/Components/Pasien/Navbar";
import bgKiri from "../../assets/bg-kiri.png";
import bgPasien from "../../assets/bg-pasien.png";

export default function PasienLayout({ children, isLandingPage = false }) {
    const containerRef = useRef(null);
    const leftBgRef = useRef(null);
    const rightBgRef = useRef(null);

    useEffect(() => {
        if (isLandingPage) return;

        const updateBackgroundHeight = () => {
            if (
                containerRef.current &&
                leftBgRef.current &&
                rightBgRef.current
            ) {
                const containerHeight = containerRef.current.scrollHeight;
                const viewportHeight = window.innerHeight;
                const finalHeight = Math.max(containerHeight, viewportHeight);

                leftBgRef.current.style.height = `${finalHeight}px`;
                rightBgRef.current.style.height = `${finalHeight}px`;
            }
        };

        updateBackgroundHeight();
        window.addEventListener("resize", updateBackgroundHeight);

        const observer = new MutationObserver(updateBackgroundHeight);
        if (containerRef.current) {
            observer.observe(containerRef.current, {
                childList: true,
                subtree: true,
                attributes: true,
            });
        }

        return () => {
            window.removeEventListener("resize", updateBackgroundHeight);
            observer.disconnect();
        };
    }, [isLandingPage]);

    return (
        <div
            ref={containerRef}
            className="min-h-screen font-lexend overflow-x-hidden relative"
        >
            <div
                ref={leftBgRef}
                className="hidden lg:block absolute w-[400px] z-0"
                style={{
                    top: 0,
                    left: 0,
                    height: isLandingPage ? "100vh" : "100vh",
                    minHeight: "100vh",
                }}
            >
                <img
                    src={bgKiri}
                    alt="Left Decoration"
                    className="w-full h-full object-contain"
                    style={{
                        objectPosition: isLandingPage
                            ? "left center"
                            : "left bottom",
                    }}
                />
            </div>

            <div
                ref={rightBgRef}
                className="hidden lg:block absolute top-0 right-0 w-1/3 z-0"
                style={{
                    height: isLandingPage ? "100vh" : "100vh",
                    minHeight: "100vh",
                }}
            >
                <img
                    src={bgPasien}
                    alt="Tooth Background"
                    className="w-full h-full object-cover"
                />
            </div>
            <Navbar />
            <main className="relative w-full z-20">{children}</main>
        </div>
    );
}
