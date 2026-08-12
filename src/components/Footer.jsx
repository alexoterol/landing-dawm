import { Instagram, Twitter } from "lucide-react";

function TikTokIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256" {...props}>
      <path d="M224,72a48.05,48.05,0,0,1-48-48,8,8,0,0,0-8-8H128a8,8,0,0,0-8,8V156a20,20,0,1,1-28.57-18.08A8,8,0,0,0,96,130.69V88a8,8,0,0,0-9.4-7.88C50.91,86.48,24,119.1,24,156a76,76,0,0,0,152,0V116.29A103.25,103.25,0,0,0,224,128a8,8,0,0,0,8-8V80A8,8,0,0,0,224,72Zm-8,39.64a87.19,87.19,0,0,1-43.33-16.15A8,8,0,0,0,160,102v54a60,60,0,0,1-120,0c0-25.9,16.64-49.13,40-57.6v27.67A36,36,0,1,0,136,156V32h24.5A64.14,64.14,0,0,0,216,87.5Z" />
    </svg>
  );
}

const SOCIALS = [
  { href: "https://www.instagram.com/rukito_gd?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", Icon: Instagram },
  { href: "https://www.tiktok.com/@rukito_gd?lang=es", Icon: TikTokIcon },
  { href: "https://x.com/rukito_grill", Icon: Twitter },
];

export default function Footer() {
  return (
    <footer className="border-t border-brand/20 px-6 py-10 text-center">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-6">
        <a href="#" className="text-white/50 hover:text-white">
          Política de Privacidad
        </a>
        <a href="#" className="text-white/50 hover:text-white">
          Términos de Servicio
        </a>
      </div>

      <div className="mt-6 flex justify-center gap-4">
        {SOCIALS.map(({ href, Icon }) => (
          <a key={href} href={href} target="_blank" rel="noreferrer" className="text-white/50 hover:text-brand">
            <Icon size={24} />
          </a>
        ))}
      </div>

      <p className="mt-6 text-sm text-white/40">© {new Date().getFullYear()} Rukito. Todos los derechos reservados.</p>
    </footer>
  );
}
