import ContactSection from "@/components/ContactSection";
import DownloadProfile from "@/components/DownloadProfile";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | Lexxusmoon",
  description:
    "Browse our portfolio of architectural 3D renders, interior designs, and exterior visualizations.",
};

const collageSection1 = [
  { src: "https://static.wixstatic.com/media/5dbb31_9aa6ef48623f432dac3051447e73043e~mv2.jpg/v1/fill/w_400,h_500,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/5dbb31_9aa6ef48623f432dac3051447e73043e~mv2.jpg", alt: "Interior render", wide: false },
  { src: "https://static.wixstatic.com/media/5dbb31_01f30be55e92485c9952fc1762e9249e~mv2.jpg/v1/fill/w_350,h_460,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/5dbb31_01f30be55e92485c9952fc1762e9249e~mv2.jpg", alt: "Architectural photo", wide: false },
  { src: "https://static.wixstatic.com/media/5dbb31_5414df7a3c784767bd1bd761101bff0b~mv2.webp/v1/fill/w_400,h_580,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/5dbb31_5414df7a3c784767bd1bd761101bff0b~mv2.webp", alt: "Interior design", wide: false },
];


export default function GalleryPage() {
  return (
    <div style={{ paddingTop: 108, backgroundColor: "#fff" }}>
      {/* Hero - Collage: scattered on desktop, grid on mobile */}
      <section className="bg-white relative overflow-visible h-[75vh] md:h-[calc(100vh-108px)]">
        {/* Mobile: scattered collage like desktop */}
        <div className="md:hidden relative w-full h-full">
          {/* Large center bedroom */}
          <Link href="/" className="absolute overflow-hidden" style={{ left: "18%", top: "2%", width: "55%", height: "70%", zIndex: 20 }}>
            <Image src={collageSection1[0].src} alt={collageSection1[0].alt} fill sizes="55vw" className="object-cover" />
          </Link>
          {/* Bottom-left small kitchen */}
          <Link href="/" className="absolute overflow-hidden" style={{ left: "3%", bottom: "3%", width: "32%", height: "42%", zIndex: 25 }}>
            <Image src="/gallery-bottom-left.jpg" alt="Kitchen interior" fill sizes="32vw" className="object-cover" />
          </Link>
          {/* Right exterior */}
          <Link href="/" className="absolute overflow-hidden" style={{ right: "3%", top: "15%", width: "30%", height: "55%", zIndex: 15 }}>
            <Image src="/gallery-exterior.jpg" alt="Exterior building" fill sizes="30vw" className="object-cover" />
          </Link>
          {/* Bottom right orange kitchen */}
          <Link href="/" className="absolute overflow-hidden" style={{ right: "5%", bottom: "5%", width: "28%", height: "38%", zIndex: 10 }}>
            <Image src={collageSection1[1].src} alt={collageSection1[1].alt} fill sizes="28vw" className="object-cover" />
          </Link>
        </div>
        {/* Desktop: scattered absolute - matching reference layout */}
        {/* Bottom-left small image - dark kitchen */}
        <Link href="/" className="hidden md:block absolute overflow-hidden cursor-pointer" style={{ left: "11%", bottom: "-12%", width: "20%", height: "65%", zIndex: 25 }}>
          <Image src="/gallery-bottom-left.jpg" alt="Kitchen interior" fill sizes="27vw" className="object-cover" />
        </Link>
        {/* Center large image - bedroom */}
        <Link href="/" className="hidden md:block absolute overflow-hidden cursor-pointer" style={{ left: "24%", top: "0%", width: "32%", height: "105%", zIndex: 20 }}>
          <Image src={collageSection1[0].src} alt={collageSection1[0].alt} fill sizes="30vw" className="object-cover" />
        </Link>
        {/* Right-center image - exterior building */}
        <Link href="/" className="hidden md:block absolute overflow-hidden cursor-pointer" style={{ left: "54%", top: "8%", width: "22%", height: "78%", zIndex: 15 }}>
          <Image src="/gallery-exterior.jpg" alt="Exterior building" fill sizes="22vw" className="object-cover" />
        </Link>
        {/* Far right - orange kitchen */}
        <Link href="/" className="hidden md:block absolute overflow-hidden cursor-pointer" style={{ right: "10%", top: "0%", width: "20%", height: "66%", zIndex: 10 }}>
          <Image src={collageSection1[1].src} alt={collageSection1[1].alt} fill sizes="20vw" className="object-cover" />
        </Link>
      </section>

      {/* Gap */}
      <div className="h-12 md:h-40" />

      {/* Full Width Living Room Image */}
      <section className="relative w-full overflow-hidden h-[50vh] md:h-[100vh] mt-16 md:mt-[140px]">
        <Image
          src="/image2.png"
          alt="Luxury living room interior"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </section>

      {/* Gap */}
      <div className="h-12 md:h-40" />

      {/* Asymmetric Two Images - small left center, big right full */}
      <style>{`
        @media (min-width: 768px) {
          .gallery-asym-row { gap: 30px !important; height: 130vh !important; padding-left: 9% !important; padding-right: 9% !important; }
          .gallery-asym-row .asym-left { width: 38% !important; height: 55% !important; align-self: center !important; margin-bottom: 0 !important; }
          .gallery-asym-row .asym-right { width: 56% !important; height: 100% !important; }
        }
      `}</style>
      <section
        className="gallery-asym-row flex flex-row items-center md:items-stretch justify-between gap-3 px-6 md:px-[8%] h-[55vh]"
        style={{ paddingLeft: "50px", paddingRight: "50px" }}
      >
        <div className="asym-left relative overflow-hidden w-[32%] h-[40%] flex-shrink-0">
          <Image
            src="/image3.png"
            alt="Modern living room with cherry blossom"
            fill
            sizes="(max-width: 768px) 32vw, 25vw"
            className="object-cover"
          />
        </div>
        <div className="asym-right relative overflow-hidden w-[50%] h-full flex-shrink-0">
          <Image
            src="/image.png"
            alt="Luxury interior with pendant light"
            fill
            sizes="(max-width: 768px) 50vw, 60vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* Gap */}
      <div className="h-12 md:h-40" />

      {/* Two Images - Left and Right with Overlap */}
      <section className="relative h-[80vh] md:h-[170vh] px-6 md:px-0">
        <div className="absolute overflow-hidden left-[6%] bottom-[-15%] w-[60%] h-[55%] z-10 md:left-[10%] md:bottom-[-55%] md:w-[60%] md:h-full">
          <Image
            src="/images/image.png"
            alt="Modern glass building at night"
            fill
            sizes="(max-width: 768px) 60vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="absolute overflow-hidden right-[6%] top-[5%] w-[55%] h-[80%] z-20 md:right-[10%] md:top-0 md:w-[58%] md:h-full">
          <Image
            src="/images/image1.png"
            alt="Commercial building exterior"
            fill
            sizes="(max-width: 768px) 55vw, 55vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* Gap above panoramic image */}
      <div className="h-32 md:hidden" />
      <div className="hidden md:block" style={{ height: 750 }} />

      {/* Full Width Panoramic Image */}
      <section className="relative w-full overflow-hidden h-[50vh] md:h-[120vh]">
        <Image
          src="/images/imagen.png"
          alt="Panoramic living room view"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </section>

      {/* Gap */}
      <div className="h-12 md:h-40" />

      {/* Two Bedroom Images - Large Left, Small Right */}
      <style>{`
        @media (min-width: 768px) {
          .gallery-bedroom-row { padding-left: 10% !important; padding-right: 10% !important; }
          .gallery-bedroom-row .bed-left { width: 48% !important; }
          .gallery-bedroom-row .bed-right { width: 38% !important; }
        }
      `}</style>
      <section className="gallery-bedroom-row flex flex-row items-center justify-between gap-3 md:gap-[60px] px-3 h-[60vh] md:h-[120vh]">
        <div className="bed-left relative overflow-hidden w-[55%] md:w-[48%] h-full md:h-full flex-shrink-0">
          <Image
            src="/images/imagenow.png"
            alt="Bedroom with chandelier"
            fill
            sizes="(max-width: 768px) 55vw, 55vw"
            className="object-cover"
          />
        </div>
        <div className="bed-right relative overflow-hidden w-[35%] md:w-[38%] h-[35%] md:h-[30%] flex-shrink-0">
          <Image
            src="/images/imagenow2.png"
            alt="Bedroom detail view"
            fill
            sizes="(max-width: 768px) 35vw, 30vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* Gap */}
      <div className="h-12 md:h-40" />

      {/* Full Width Image - Luxury Living Space */}
      <section className="relative w-full overflow-hidden h-[50vh] md:h-[100vh]">
        <Image
          src="/images/imagenext.png"
          alt="Luxury living space with marble table"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </section>

      {/* Gap */}
      <div className="h-12 md:h-40" />

      {/* Download Profile */}
      <div className="bg-white">
        <DownloadProfile />
      </div>

      <div className="h-12 md:h-40" />

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}
