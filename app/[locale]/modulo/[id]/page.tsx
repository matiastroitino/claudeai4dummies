import { notFound } from "next/navigation";
import { getModule, getAllModuleIds } from "@/lib/modules-data";
import ModuleReader from "@/components/ModuleReader";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

export async function generateStaticParams() {
  const ids = getAllModuleIds();
  return ids.map((id) => ({ id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, id } = await params;
  const mod = getModule(locale, id);
  if (!mod) return {};
  return {
    title: `Módulo ${mod.number}: ${mod.title} — Claude4Dummies`,
    description: mod.subtitle,
  };
}

export default async function ModulePage({ params }: Props) {
  const { locale, id } = await params;
  const mod = getModule(locale, id);
  if (!mod) notFound();
  return <ModuleReader module={mod} />;
}
