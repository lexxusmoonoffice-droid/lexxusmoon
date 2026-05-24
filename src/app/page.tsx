import ContactSection from "@/components/ContactSection";
import StickyTextWithImages from "@/components/StickyTextWithImages";
import WhiteSpecializeSection from "@/components/WhiteSpecializeSection";
import StickyWhyChooseUs from "@/components/StickyWhyChooseUs";
import VideoSection from "@/components/VideoSection";
import FloatingGallery from "@/components/FloatingGallery";
import ClientsSection from "@/components/ClientsSection";

const introImages = [
  { src: "https://static.wixstatic.com/media/5dbb31_88bb229bbe5745149b6d1db96f9d368c~mv2.jpg/v1/fill/w_400,h_500,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/5dbb31_88bb229bbe5745149b6d1db96f9d368c~mv2.jpg", alt: "Architectural render 1" },
  { src: "https://static.wixstatic.com/media/5dbb31_9faccd0d90314e49b2d28ff0613931a4~mv2.jpg/v1/fill/w_400,h_500,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/5dbb31_9faccd0d90314e49b2d28ff0613931a4~mv2.jpg", alt: "Architectural render 2" },
  { src: "https://static.wixstatic.com/media/5dbb31_511046419ff642dd929cbdbfd7e62346~mv2.jpg/v1/fill/w_400,h_500,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/5dbb31_511046419ff642dd929cbdbfd7e62346~mv2.jpg", alt: "Architectural render 3" },
  { src: "https://static.wixstatic.com/media/5dbb31_3f0fde4eeb3848a58f977cef79774d6b~mv2.jpg/v1/fill/w_320,h_470,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/5dbb31_3f0fde4eeb3848a58f977cef79774d6b~mv2.jpg", alt: "Architectural render 4" },
  { src: "https://static.wixstatic.com/media/5dbb31_36c579afbcb14f229af64467e6eabf3f~mv2.jpg/v1/fill/w_600,h_450,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/5dbb31_36c579afbcb14f229af64467e6eabf3f~mv2.jpg", alt: "Architectural render 5" },
];

const whyChooseUs = [
  {
    num: "01",
    title: "Unmatched Quality",
    desc: "Our renders reflect the highest standards, ensuring every texture, shadow, and light brings realism to your projects.",
    img: "https://static.wixstatic.com/media/5dbb31_efb0d74fb5364626826b851bc0980d76~mv2.jpg/v1/fill/w_700,h_500,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/5dbb31_efb0d74fb5364626826b851bc0980d76~mv2.jpg",
    bg: "bg-[#E02222]",
  },
  {
    num: "02",
    title: "On-Time Delivery",
    desc: "Time is valuable, and we respect that. At Lexxusmoon, we always deliver on time without compromising quality.",
    img: "https://static.wixstatic.com/media/5dbb31_343dd2c15fc54627b4dc178a8cb3d1d0~mv2.jpg/v1/fill/w_700,h_500,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/5dbb31_343dd2c15fc54627b4dc178a8cb3d1d0~mv2.jpg",
    bg: "bg-black",
  },
  {
    num: "03",
    title: "Affordable Pricing",
    desc: "Premium rendering services don't have to break the bank. Our competitive rates make exceptional renders accessible for all.",
    img: "https://static.wixstatic.com/media/5dbb31_36c579afbcb14f229af64467e6eabf3f~mv2.jpg/v1/fill/w_700,h_500,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/5dbb31_36c579afbcb14f229af64467e6eabf3f~mv2.jpg",
    bg: "bg-[#E02222]",
  },
];

const masonryImages = [
  { src: "https://static.wixstatic.com/media/5dbb31_7cff247bf6b342f1b05bee60e1fb77a0~mv2.jpg/v1/fill/w_500,h_350,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/5dbb31_7cff247bf6b342f1b05bee60e1fb77a0~mv2.jpg", alt: "Project 1" },
  { src: "https://static.wixstatic.com/media/5dbb31_f04a31f382f04d1daf760dbb5bfebf0a~mv2.jpg/v1/fill/w_500,h_350,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/5dbb31_f04a31f382f04d1daf760dbb5bfebf0a~mv2.jpg", alt: "Project 2" },
  { src: "https://static.wixstatic.com/media/5dbb31_f5c6d9ed147c485ea71b6a131e6cbe93~mv2.jpg/v1/fill/w_500,h_350,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/5dbb31_f5c6d9ed147c485ea71b6a131e6cbe93~mv2.jpg", alt: "Project 3" },
  { src: "https://static.wixstatic.com/media/5dbb31_4e0aa080a8744180a3eedd449f1bf755~mv2.jpg/v1/fill/w_500,h_350,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/5dbb31_4e0aa080a8744180a3eedd449f1bf755~mv2.jpg", alt: "Project 4" },
  { src: "https://static.wixstatic.com/media/5dbb31_8f5a7c0defa740f7af7ed5beeb7d267d~mv2.jpg/v1/fill/w_500,h_350,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/5dbb31_8f5a7c0defa740f7af7ed5beeb7d267d~mv2.jpg", alt: "Project 5" },
  { src: "https://static.wixstatic.com/media/5dbb31_e3d16a805e2b4969a42d41e954a23857~mv2.jpg/v1/fill/w_500,h_350,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/5dbb31_e3d16a805e2b4969a42d41e954a23857~mv2.jpg", alt: "Project 6" },
];

const clientLogos = [
  "https://static.wixstatic.com/media/5dbb31_c815b7a534a84bcfa788fc7f75da2adf~mv2.png/v1/fill/w_200,h_200,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/1.png",
  "https://static.wixstatic.com/media/5dbb31_74121b2813934a3db39efa12430dabcf~mv2.png/v1/fill/w_200,h_200,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/2.png",
  "https://static.wixstatic.com/media/5dbb31_1d20db4ed1354303ab8116f7a0ba9857~mv2.png/v1/fill/w_200,h_200,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3.png",
  "https://static.wixstatic.com/media/5dbb31_93299331002f4980bf68469ff5ebec37~mv2.png/v1/fill/w_200,h_200,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/4.png",
  "https://static.wixstatic.com/media/5dbb31_31f8476d375a44ecbef293d7160f1e1c~mv2.png/v1/fill/w_200,h_200,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/5.png",
  "https://static.wixstatic.com/media/5dbb31_7933a069d1794329b92af48114fa4cbf~mv2.png/v1/fill/w_200,h_200,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/6.png",
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-screen bg-black overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url('https://static.wixstatic.com/media/5dbb31_1c5c44cc145b43dfacd716cd6324c4c8~mv2.jpg/v1/fill/w_1920,h_1280,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/5dbb31_1c5c44cc145b43dfacd716cd6324c4c8~mv2.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "48% 59%",
          }}
        />

        {/* LEXXUS - top left */}
        <h1
          className="absolute top-[35%] md:top-[18%] left-[5%] text-[3.5rem] sm:text-[4.5rem] md:text-[4rem] lg:text-[5.5rem] font-bold tracking-wider text-white leading-none z-10 uppercase"
          style={{ animation: 'slideFromLeft 1.2s ease-out forwards', opacity: 0 }}
        >
          LEXXUS
        </h1>

        {/* MOON - bottom right */}
        <span
          className="absolute bottom-[12%] right-[5%] text-[3.5rem] sm:text-[4.5rem] md:text-[4rem] lg:text-[5.5rem] font-bold tracking-wider text-white leading-none z-10 uppercase"
          style={{ animation: 'slideFromRight 1.2s ease-out forwards', opacity: 0 }}
        >
          MOON
        </span>

        {/* Tagline - bottom center */}
        <p className="absolute bottom-[5%] left-1/2 -translate-x-1/2 text-sm sm:text-lg md:text-2xl lg:text-3xl text-white font-semibold tracking-wider z-10 text-center px-4 md:whitespace-nowrap w-full md:w-auto">
          &ldquo;Your Vision, Our 3D Expertise&rdquo;
        </p>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 1: Sticky Text + Scrolling Images
      ═══════════════════════════════════════════════════════════ */}
      <StickyTextWithImages images={introImages} />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 1.5: We Specialize — Premium White Section
      ═══════════════════════════════════════════════════════════ */}
      <WhiteSpecializeSection />

      {/* Why Choose Us heading - plain white section (separate from grid) */}
      <section className="bg-white px-6 text-center" style={{ paddingTop: "100px", paddingBottom: "70px" }}>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#e50914] tracking-tight">
          Why Choose Us?
        </h2>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2: Why Choose Us — Stacked Sticky Cards
      ═══════════════════════════════════════════════════════════ */}
      <StickyWhyChooseUs items={whyChooseUs} />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 3: Project Showcase — Video + Large Visuals
      ═══════════════════════════════════════════════════════════ */}
      {/* Full-width video section */}
      <VideoSection />

      {/* Ready to Transform - black section */}
      <section className="bg-black px-6 md:px-[5vw]" style={{ paddingTop: "80px", paddingBottom: "20px" }}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white uppercase tracking-wide leading-tight md:whitespace-nowrap" style={{ marginLeft: "60px", transform: "translateY(-20px)" }}>
            READY TO TRANSFORM
          </h2>
          <p className="text-white font-light text-sm md:text-lg leading-relaxed max-w-sm py-6 md:py-8" style={{ marginRight: "60px" }}>
            we combine creativity, precision, and commitment to deliver visualisation services. we ensure international-standard high-quality renders, on time and within your{' '}budget.
          </p>
        </div>
      </section>

      {/* Showcase grid - floating cards */}
      <FloatingGallery images={masonryImages} />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 4: Clients / Brands
      ═══════════════════════════════════════════════════════════ */}
      <ClientsSection logos={clientLogos} />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 5: Contact
      ═══════════════════════════════════════════════════════════ */}
      <ContactSection />
    </>
  );
}
