"use client"

import Link from "next/link"
import { Instagram, Facebook, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block">
              <span className="text-3xl font-serif tracking-wider text-primary">
                LUXE
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Moda de alta gama para quienes aprecian la excelencia en cada detalle.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-medium tracking-widest uppercase text-primary mb-4">
              Navegación
            </h3>
            <ul className="space-y-3">
              {["Inicio", "Tienda", "Pedidos", "Mi Cuenta"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(" ", "-").replace("inicio", "")}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-medium tracking-widest uppercase text-primary mb-4">
              Contacto
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>info@luxe.com</li>
              <li>+34 900 123 456</li>
              <li>Lun - Vie: 10:00 - 20:00</li>
              <li>Sáb: 10:00 - 14:00</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-medium tracking-widest uppercase text-primary mb-4">
              Síguenos
            </h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center border border-border rounded-full text-muted-foreground hover:text-primary hover:border-primary transition-colors duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center border border-border rounded-full text-muted-foreground hover:text-primary hover:border-primary transition-colors duration-300"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center border border-border rounded-full text-muted-foreground hover:text-primary hover:border-primary transition-colors duration-300"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              © 2024 LUXE. Todos los derechos reservados.
            </p>
            <div className="flex gap-6 text-xs text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors duration-300">
                Política de Privacidad
              </a>
              <a href="#" className="hover:text-foreground transition-colors duration-300">
                Términos y Condiciones
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
