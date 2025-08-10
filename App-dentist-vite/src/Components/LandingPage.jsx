import React, { useState } from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      alert("Por favor ingresa un email válido");
      return;
    }

    try {
      const response = await fetch("https://app-dentist.onrender.com/api/emailCta/register-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const data = await response.json();
        alert(data.message || "Error al registrar el email");
      }
    } catch (error) {
      alert("Error de conexión con el servidor");
      console.error(error);
    }
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-slate-50 justify-between overflow-x-hidden font-sans">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <img
  src="./Logo.png"
  alt="Logo AgenDent"
  className="h-12 w-auto object-contain"
/>

          <div className="flex items-center space-x-4 mr-4 ml-4 mt-4 mb-4">
            <Link
              to="/login"
              className="bg-[#0d80f2] text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition cursor-pointer"
            >
              Iniciar sesión
            </Link>
            <Link
              to="/Registro"
              className="bg-[#0d80f2] text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition cursor-pointer"
            >
              Crear cuenta
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="mt-16">
        <div
          className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat sm:gap-8 sm:rounded-xl items-start justify-end px-4 pb-10 sm:px-10"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCsxpeUZQCrz70khDgiA1_jRHqWxtSVcchAMTgZ9qS62zKAYm-gZrCIjCOS2txQ_mUYkvjW9bTNGkepA5D_CVY_EDe_r7_j2-B8WTBnzNBu6B_3ZdQK3QI9wbiEd7SMcteZyNfaNhaH5ANixRTdtDItuMvOW6CIr8w1ncTLh4PtT0fhBLCmOgzTKUYYwSA3ggIQOeiFn76kfQNc0c7f5ox04cD9U_vKh1wJxdobR4fac0YmzQLs2WNbKl-522v6ksuj9ddYrvkky0eY")`,
          }}
        >
          <div className="flex flex-col gap-2 text-left">
            <h1 className="text-white text-4xl font-black leading-tight sm:text-5xl">
              Optimiza tu clínica dental con nuestra app
            </h1>
            <h2 className="text-white text-sm sm:text-base">
              Gestiona citas, pacientes y más desde cualquier dispositivo.
            </h2>
          </div>
          <button className="bg-[#0d80f2] text-white px-5 py-3 rounded-xl font-bold hover:bg-blue-700 transition">
            Comienza ahora
          </button>
        </div>
      </header>

      {/* Beneficios */}
      <section className="flex flex-col gap-10 px-4 py-10">
        <div className="flex flex-col gap-4">
          <h2 className="text-[#0d141c] text-3xl sm:text-4xl font-black">
            Beneficios clave
          </h2>
          <p className="text-[#0d141c] text-base">
            Nuestra app te ayuda a optimizar tu clínica dental de manera eficiente.
          </p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3">
          {[
            {
              title: "Optimización de citas",
              desc: "Programa y gestiona citas de manera eficiente, reduciendo tiempos muertos y mejorando la satisfacción del paciente.",
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7Wuq7WmKVDu7It0qUh-r0wraF3xsVTvSUOMNDprEvCR-Kwk8mLsjll4ysYvjyy3oSWsqgIXnPRkcgFH6n3PvQIpp-TBIMHGM61hOyCtTvcbxGYDiiTIF2z8ZoUuGwcLxWUEwgp5m0y46_aOFIeIQoSYbnGY_DbOdxbX3JISAzorWNcTn6rEmheodmW8rB4fp6a0YGRIWcaZxd7I0Sm5jwkPgTHDhK15Ap3iwznPK5XXgxEj_nVz-pdDT1O4FZQ0fzLw3zUVe0F1kS",
            },
            {
              title: "Gestión simplificada de pacientes",
              desc: "Accede a la información de tus pacientes de forma rápida y segura, con un historial completo y actualizado.",
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAUQ455WB4hZf-QM0OlSh95lZsyAuslkTse0WEQQuuw9QtVoCYk_lNq_v72GooKKLWs1cn2cNGJOzfZiJcTYICsruFmHTjN5X3LD_JtWBZBDsYdUV5jxfBZwGXv22lQO76tCJSoPJzvlH4MIUB0MRt-bDq4uejeFPEZto4KllBIqVdp1VcztglW5xuQPOFkPo2ORxXF9Rz2HpS-cxme06V-Y88PasHWMhWtQqBMQLRwVDfTTCgjKy7oVlA8xTC5q6Z3sFOKGsIeXUqA",
            },
            {
              title: "Acceso desde cualquier dispositivo",
              desc: "Utiliza la app en tu teléfono, tableta o computadora, con sincronización en tiempo real para una gestión flexible.",
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCUBl5g7dMCfaYaFPIvBQ6Z8l1pqDBHdTOP6kRgHYl-87IrfGQiv75tdnygDa0X45jW8zNvmgQVGRcIMzg3ZpxrAy25hsGHjAeYR9fCwENAsQp6g-ntIK7F7mU9OJwQ9nzDeB1fQnHPdXqO05trMCpZGtpmR5HNjkYAnr_BStRnmgycWD6V-6qu3V0kIbLDRz-PM5Hpnx-WlP8EHLPXZWZPhFpRghl2-jspBltvjOcSsJ_jo0zltiK2R9KUKXqzrP1VycrkdvRhuLES",
            },
          ].map((benefit, index) => (
            <div key={index} className="flex flex-col gap-3 pb-3">
              <div
                className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl transform transition-transform duration-300 hover:scale-105"
                style={{ backgroundImage: `url("${benefit.img}")` }}
              ></div>
              <div>
                <p className="text-[#0d141c] text-base font-medium">{benefit.title}</p>
                <p className="text-[#49739c] text-sm">{benefit.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Final */}
      <section className="flex flex-col justify-end gap-6 px-4 py-10 sm:px-10 sm:py-20 text-center">
        <h2 className="text-[#0d141c] text-3xl sm:text-4xl font-black">
          Prueba nuestra app gratis
        </h2>
        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex justify-center">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-3 rounded-l-xl bg-[#e7edf4] text-[#0d141c] focus:outline-none"
            />
            <button
              type="submit"
              className="bg-[#0d80f2] text-white px-5 py-3 rounded-r-xl font-bold hover:bg-blue-700 transition cursor-pointer"
            >
              Regístrate
            </button>
          </form>
        ) : (
          <p className="text-green-600 font-semibold">¡Gracias por registrarte!</p>
        )}
      </section>

      {/* Footer */}
      <footer className="flex flex-col gap-6 px-5 py-10 text-center">
        <div className="flex flex-wrap justify-center gap-6">
          <a className="text-[#49739c]" href="#">
            Contacto
          </a>
          <a className="text-[#49739c]" href="#">
            Términos de servicio
          </a>
          <a className="text-[#49739c]" href="#">
            Política de privacidad
          </a>
        </div>
        <p className="text-[#49739c] text-sm">© 2024 AgenDent. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
