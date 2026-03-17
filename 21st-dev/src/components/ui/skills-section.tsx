import OrbitingSkills from "@/components/ui/orbiting-skills";

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="w-full border-t border-white/10 bg-[#060b18] px-6 py-20 text-white md:px-10 lg:px-16"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-12 md:flex-row md:items-center">
        <div className="flex w-full items-center justify-start md:w-1/2">
          <h2
            className="text-5xl font-black uppercase tracking-[0.18em] text-white sm:text-6xl lg:text-7xl"
            style={{ fontFamily: "'Orbitron', 'Fira Code', monospace" }}
          >
            Skills
          </h2>
        </div>

        <div className="flex w-full items-center justify-center md:w-1/2 md:justify-end">
          <OrbitingSkills />
        </div>
      </div>
    </section>
  );
}
