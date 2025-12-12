import facebook from "@/assets/icons/socialIcons/facebook.png";
import instagram from "@/assets/icons/socialIcons/instagram.png";
import whatsapp from "@/assets/icons/socialIcons/whatsapp.png";
import youtube from "@/assets/icons/socialIcons/youtube.png";
import logo from "@/assets/icons/logo-icon.svg";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex justify-center items-center gap-2">
          <Image
            src={logo}
            className="w-24"
            alt="logo"
            width={96}
            height={96}
          />
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground">
          Pure, natural honey delivered from the hive to your home. Taste the
          sweetness of nature with our premium, sustainably sourced honey
          products.
        </p>

        {/* Social Links */}
        <ul className="mt-8 flex flex-wrap justify-center gap-5">
          <li>
            <Link
              className="w-10 h-10 text-foreground/80 transition hover:text-foreground"
              href={"/"}
            >
              <Image src={facebook} alt="facebook" className="w-6 h-6" />
            </Link>
          </li>
          <li>
            <Link
              className="w-10 h-10 text-foreground/80 transition hover:text-foreground"
              href={"/"}
            >
              <Image src={instagram} alt="instagram" className="w-6 h-6" />
            </Link>
          </li>
          <li>
            <Link
              className="w-10 h-10 text-foreground/80 transition hover:text-foreground"
              href={"/"}
            >
              <Image src={youtube} alt="youtube" className="w-6 h-6" />
            </Link>
          </li>
          <li>
            <Link
              className="w-10 h-10 text-foreground/80 transition hover:text-foreground"
              href={"/"}
            >
              <Image src={whatsapp} alt="whatsapp" className="w-6 h-6" />
            </Link>
          </li>
        </ul>
        <div>
          <p className="text-center mt-6 -mb-5 text-muted-foreground text-sm">
            © 2025 Moucak. All Right Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
