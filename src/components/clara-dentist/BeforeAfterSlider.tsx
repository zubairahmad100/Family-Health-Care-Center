"use client";

import { CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import { ReactCompareSlider } from 'react-compare-slider';

export default function BeforeAfterSlider() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                {/* Text Content - Left Side */}
                <div className="max-w-xl">
                    <span className="text-[var(--color-special-smiles-primary)] font-bold tracking-wider uppercase text-sm mb-4 block">
                        Real Results
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                        See the difference <br /> a glowing smile makes.
                    </h2>
                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                        Experience the life-changing impact of our advanced dental treatments.
                        From professional whitening to complete smile makeovers, we deliver
                        stunning, natural-looking results that boost your confidence.
                    </p>

                    <ul className="space-y-4 mb-10">
                        {[
                            "Noticeable results in just one visit",
                            "Pain-free and comfortable procedures",
                            "Long-lasting, natural appearance",
                            "Personalized treatment plans"
                        ].map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-3 text-gray-700 font-medium">
                                <CheckCircle2 className="text-[var(--color-special-smiles-primary)] shrink-0" size={20} />
                                {feature}
                            </li>
                        ))}
                    </ul>

                    <div className="flex gap-4">
                        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex-1 text-center">
                            <div className="text-3xl font-bold text-gray-900 mb-1">98%</div>
                            <div className="text-sm text-gray-500 font-medium">Patient Satisfaction</div>
                        </div>
                        <div className="bg-[var(--color-special-smiles-primary)]/10 border border-[var(--color-special-smiles-primary)]/20 rounded-2xl p-4 flex-1 text-center">
                            <div className="text-3xl font-bold text-[var(--color-special-smiles-primary)] mb-1">5k+</div>
                            <div className="text-sm text-[var(--color-special-smiles-primary)]/80 font-medium">Smiles Restored</div>
                        </div>
                    </div>
                </div>

                {/* Slider - Right Side */}
                <div className="relative">
                    <div className="absolute -inset-4 bg-[var(--color-special-smiles-primary)]/10 rounded-full blur-2xl -z-10" />

                    <div className="rounded-3xl overflow-hidden shadow-2xl shadow-black/10 border-[6px] border-white bg-white">
                        <div className="relative w-full" style={{ aspectRatio: '4/5' }}>
                            <ReactCompareSlider
                                itemOne={
                                    <div className="relative w-full h-full">
                                        <Image
                                            src="/images/before-after/before.jpg"
                                            alt="Before Treatment"
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 1024px) 100vw, 50vw"
                                        />
                                    </div>
                                }
                                itemTwo={
                                    <div className="relative w-full h-full">
                                        <Image
                                            src="/images/before-after/after.jpg"
                                            alt="After Treatment"
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 1024px) 100vw, 50vw"
                                        />
                                    </div>
                                }
                                style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
                            />
                            <div className="absolute top-6 left-6 right-6 flex justify-between z-10 pointer-events-none">
                                <span className="bg-white/90 backdrop-blur-md text-xs font-bold text-gray-900 tracking-widest px-4 py-2 rounded-full uppercase shadow-lg border border-white/50">
                                    Before
                                </span>
                                <span className="bg-[var(--color-special-smiles-primary)]/90 backdrop-blur-md text-xs font-bold text-white tracking-widest px-4 py-2 rounded-full uppercase shadow-lg">
                                    After
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="absolute -bottom-6 -right-4 lg:-right-8 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 z-20">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-[var(--color-special-smiles-primary)]/10 flex items-center justify-center text-[var(--color-special-smiles-primary)] text-xl">
                                ✨
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-900">Professional Whitening</p>
                                <p className="text-xs text-gray-500 font-medium">8 shades lighter in 45 mins</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
