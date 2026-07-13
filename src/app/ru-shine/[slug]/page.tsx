// src/app/ru-shine/[slug]/page.tsx
import { notFound } from "next/navigation";
import Spotlight from "@/components/ru-shine-spotlight";
import { getAllSlugs, getAlumBySlug } from "../data";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default function RuShineSpotlightPage({
  params,
}: {
  params: { slug: string };
}) {
  const alum = getAlumBySlug(params.slug);
  if (!alum) return notFound();
  return <Spotlight alum={alum} />;
}
