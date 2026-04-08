import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import Nav from "@/components/Nav";
import FooterSection from "@/components/FooterSection";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  const paths = [];
  for (const locale of routing.locales) {
    paths.push({ locale, slug: "aviso-legal" });
    paths.push({ locale, slug: "privacidad" });
    paths.push({ locale, slug: "cookies" });
  }
  return paths;
}

export default async function LegalPage({ params }: { params: Promise<{ locale: string, slug: string }> }) {
  const resolvedParams = await params;
  setRequestLocale(resolvedParams.locale);
  
  const titles: Record<string, string> = {
    "aviso-legal": "Aviso Legal",
    "privacidad": "Política de Privacidad",
    "cookies": "Política de Cookies",
  };
  
  const title = titles[resolvedParams.slug];
  if (!title) return notFound();

  return (
    <>
      <Nav />
      <main className="min-h-screen pt-32 pb-20 overflow-hidden">
        <div className="section relative z-10 max-w-4xl">
          <span className="badge mb-6 inline-flex">LEGAL</span>
          <h1 className="display text-white mb-8">{title}</h1>
          <div className="text-white/60 space-y-6 text-lg leading-relaxed">
            <p>
              Este es un texto legal generado para la página de <strong>{title}</strong>. En un entorno de producción, aquí deberás incluir los términos legales específicos aplicables a tu jurisdicción y tipo de proyecto web.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in odio quis erat suscipit tempor eget tempor felis. Proin finibus, sem sed congue dignissim, augue velit varius nisl, at facilisis nibh ipsum ut nisl. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
            </p>
            <h3 className="text-white font-semibold text-xl mt-10 mb-4">Condiciones de uso</h3>
            <p>
              Phasellus quis lacinia magna. Duis accumsan scelerisque orci, ut posuere lacus tempus non. Aenean sodales fermentum leo et tincidunt. Etiam eget felis id magna fringilla feugiat. Sed vulputate risus nec lacus accumsan iaculis. Integer aliquet tincidunt varius.
            </p>
            <p>
              Suspendisse ut massa elementum, viverra sapien a, ultrices massa. Cras tincidunt lectus in iaculis euismod. Proin pretium orci vitae libero finibus, et viverra ligula convallis. Curabitur vel metus ex. Donec iaculis orci sit amet ante ullamcorper varius.
            </p>
          </div>
        </div>
      </main>
      <FooterSection />
    </>
  );
}
