import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, ShieldCheck, Camera, Image as ImageIcon } from "lucide-react";
import { HospitalityHeader } from "../components/HospitalityHeader";
import { HospitalityFooter } from "../components/HospitalityFooter";
import { RADHANAGARI_PLACES } from "../data/radhanagari";
import { useLanguage } from "@/lib/i18n";
import "../theme/hospitality-theme.css";

export function Credits() {
  const { t, language } = useLanguage();
  const isMr = language === "mr";

  const realPhotos = RADHANAGARI_PLACES.filter((p) => p.image && p.image.isReal);
  const pendingPhotos = RADHANAGARI_PLACES.filter((p) => !p.image || !p.image.isReal);

  return (
    <div className="hospitality-theme min-h-screen bg-[#FAF8F5] text-[#1A2E24] flex flex-col justify-between">
      <HospitalityHeader />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 pt-32 pb-20 w-full">
        {/* Back navigation */}
        <div className="mb-8">
          <Link
            to="/hospitality"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#B5472A] hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{isMr ? "राधानगरी मुख्य पानावर परत जा" : "Back to Radhanagari Home"}</span>
          </Link>
        </div>

        {/* Page Title & Intro */}
        <div className="space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#173327]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#173327]">
            <ShieldCheck className="h-4 w-4 text-[#173327]" />
            {isMr ? "पारदर्शक श्रेय व परवाने" : "Attribution & Licenses"}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-display text-[#173327]">
            {isMr ? "छायाचित्र श्रेय आणि परवाने" : "Photo Credits & Open Licenses"}
          </h1>
          <p className="text-[#5C6E64] max-w-2xl text-base leading-relaxed">
            {isMr
              ? "राधानगरी परिसरातील खरी छायाचित्रे मुक्त परवान्यांतर्गत (Wikimedia Commons) वापरण्यात आली आहेत."
              : "All real place photos are sourced exclusively under verified open licenses from Wikimedia Commons with complete creator attribution."}
          </p>
        </div>

        {/* Real Photos List */}
        <div className="space-y-6 mb-16">
          <h2 className="text-xl font-bold font-display text-[#173327] flex items-center gap-2">
            <Camera className="h-5 w-5 text-[#B5472A]" />
            {isMr ? "वापरलेली खरी छायाचित्रे" : "Verified Real Place Photos"}
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {realPhotos.map((place) => {
              const img = place.image;
              const credits = img.credits;
              return (
                <article
                  key={place.id}
                  className="rounded-2xl bg-white border border-[#E2E7E3] shadow-soft overflow-hidden flex flex-col justify-between"
                >
                  <div className="relative h-48 bg-[#E2E7E3] overflow-hidden">
                    <img
                      src={img.src}
                      srcSet={`${img.srcMobile} 400w, ${img.src} 1200w`}
                      sizes="(max-width: 640px) 100vw, 350px"
                      alt={isMr ? img.alt.mr : img.alt.en}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute top-3 left-3 rounded-full bg-[#173327]/90 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 backdrop-blur-sm">
                      {isMr ? "वास्तविक छायाचित्र" : "Real Photo"}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="text-base font-bold text-[#1A2E24]">
                        {isMr ? place.name.mr : place.name.en}
                      </h3>
                      <p className="text-xs text-[#5C6E64] mt-1 line-clamp-2">
                        {isMr ? place.blurb.mr : place.blurb.en}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#E2E7E3] space-y-2 text-xs text-[#5C6E64]">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-[#1A2E24]">{isMr ? "छायाचित्रकार" : "Creator"}:</span>
                        <span className="font-medium text-[#1A2E24]">{credits.author}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-[#1A2E24]">{isMr ? "परवाना" : "License"}:</span>
                        <a
                          href={credits.license_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-[#B5472A] hover:underline inline-flex items-center gap-1"
                        >
                          {credits.license}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="font-semibold text-[#1A2E24]">{isMr ? "मूळ स्रोत" : "Source"}:</span>
                        {credits.source_url && credits.source_url !== "#" ? (
                          <a
                            href={credits.source_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#173327] hover:underline inline-flex items-center gap-1 font-medium"
                          >
                            {credits.source_name || "Wikimedia Commons"}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        ) : (
                          <span className="text-[#173327] font-medium">
                            {isMr ? "स्थानिक छायाचित्रण" : "Direct Contribution"}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Fallback & Missing Photos Notice (if any) */}
        {pendingPhotos.length > 0 ? (
          <div className="rounded-2xl bg-[#F0EBE1] p-6 border border-[#E0D7C6] space-y-4 mb-12">
            <h2 className="text-lg font-bold font-display text-[#173327] flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-[#B5472A]" />
              {isMr ? "प्रलंबित छायाचित्रे (हंगामी व दुर्गम ठिकाणे)" : "Pending Photography (Gradient Fallbacks)"}
            </h2>
            <p className="text-xs sm:text-sm text-[#5C6E64] leading-relaxed">
              {isMr
                ? "ठिकाणांसाठी सार्वजनिक परवान्यांतर्गत खात्रीशीर छायाचित्रे उपलब्ध होईपर्यंत ग्रेडियंट फॉलबॅक वापरण्यात आला आहे. Google वरून अनधिकृत छायाचित्रे डाऊनलोड न करण्याचे आमचे धोरण आहे."
                : "In strict accordance with project guidelines, Google scraping is prohibited. Locations without verified, openly licensed photography display an intentional terracotta gradient fallback until authentic field photos are contributed."}
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {pendingPhotos.map((p) => (
                <span
                  key={p.id}
                  className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#173327] border border-[#D5C9B5]"
                >
                  {isMr ? p.name.mr : p.name.en} (Photo needed)
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className="rounded-2xl bg-[#E8F0EC] p-6 border border-[#C5D9CE] space-y-2 mb-12">
            <h2 className="text-lg font-bold font-display text-[#173327] flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-[#1E5631]" />
              {isMr ? "सर्व छायाचित्रे समाविष्ट" : "Full Photographic Coverage"}
            </h2>
            <p className="text-xs sm:text-sm text-[#2E4D3E] leading-relaxed">
              {isMr
                ? "राधानगरी परिसरातील सर्व ६ मुख्य ठिकाणांची अस्सल छायाचित्रे समाविष्ट करण्यात आली आहेत. यामध्ये कोणतेही कृत्रिम अथवा इंटरनेटवरून अनधिकृतपणे घेतलेले चित्र नाही."
                : "All 6 Radhanagari destination cards feature verified authentic photography under open licenses and direct community contributions. No placeholder farmhouses or unverified images are used."}
            </p>
          </div>
        )}

        {/* Farmhouse Sample Photos Disclaimer */}
        <div className="rounded-2xl bg-white p-6 border border-[#E2E7E3] space-y-2 text-xs text-[#5C6E64]">
          <h3 className="font-bold text-[#1A2E24] text-sm">
            {isMr ? "शेतघर संकल्पना छायाचित्रे" : "Farmhouse Concept Visuals"}
          </h3>
          <p className="leading-relaxed">
            {isMr
              ? "प्रदर्शित शेतघरांची चित्रे केवळ वास्तू संकल्पना आणि नमुना म्हणून दाखवण्यात आली आहेत. ती वास्तविक ठिकाण कार्डवर कधीही वापरली जात नाहीत."
              : "Farmhouse images are architectural concept samples and artist impressions. They are never conflated with real regional destinations."}
          </p>
        </div>
      </main>

      <HospitalityFooter />
    </div>
  );
}

export default Credits;
