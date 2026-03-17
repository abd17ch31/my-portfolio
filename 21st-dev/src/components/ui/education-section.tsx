import {
  BarChart3,
  BookOpen,
  CalendarDays,
  GraduationCap,
  MapPin,
} from "lucide-react";

import { ContainerScroll } from "@/components/ui/container-scroll-animation";

const educationItems = [
  {
    title: "Class 10th",
    period: "2015-2017",
    school: "Uma Public School",
    location: "Greater Noida",
    score: "74%",
  },
  {
    title: "Class 12th",
    period: "2017-2019",
    school: "Uma Public School",
    location: "Greater Noida",
    score: "62%",
  },
  {
    title: "Graduation - BCA 1st Year",
    period: "Currently Pursuing",
    school: "A.S.M. Degree College",
    location: "Aligarh",
    score: "In Progress",
  },
];

export default function EducationSection() {
  return (
    <section
      id="education"
      className="overflow-hidden border-t border-white/10 bg-[#050814] pb-[320px] pt-[620px] text-white"
    >
      <ContainerScroll
        titleComponent={
          <>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.45em] text-cyan-300/80">
              Education
            </p>
            <h2 className="text-4xl font-semibold text-white md:text-6xl">
              Academic Journey
            </h2>
          </>
        }
      >
        <div className="grid h-full grid-cols-1 grid-rows-[18rem_minmax(0,1fr)] overflow-hidden rounded-2xl bg-[#0b1220] text-white md:grid-cols-[1.05fr_0.95fr] md:grid-rows-1">
          <div className="relative flex min-h-[18rem] flex-col justify-end overflow-hidden p-6 md:min-h-full md:p-8">
            <img
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80"
              alt="Education background"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/75 to-[#020617]/30" />
            <div className="absolute right-6 top-6 rounded-full border border-cyan-300/30 bg-cyan-300/10 p-3 backdrop-blur">
              <GraduationCap className="h-7 w-7 text-cyan-300" />
            </div>
            <div className="relative z-10 max-w-md">
              <p className="mb-3 text-sm uppercase tracking-[0.3em] text-cyan-300/80">
                Student Profile
              </p>
              <h3 className="text-3xl font-semibold md:text-4xl">
                Building a strong foundation in computer applications.
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-300 md:text-base">
                From school academics in Greater Noida to a currently ongoing BCA
                in Aligarh, this section highlights your educational milestones in
                a more portfolio-friendly format.
              </p>
            </div>
          </div>

          <div className="min-h-0 overflow-y-auto bg-[#0f172a] p-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:flex md:h-full md:flex-col md:justify-start md:overflow-y-auto md:p-8 md:pr-4 md:[scrollbar-width:thin] md:[scrollbar-color:rgba(34,211,238,0.45)_rgba(255,255,255,0.06)] md:[&::-webkit-scrollbar]:block md:[&::-webkit-scrollbar]:w-2 md:[&::-webkit-scrollbar-track]:rounded-full md:[&::-webkit-scrollbar-track]:bg-white/5 md:[&::-webkit-scrollbar-thumb]:rounded-full md:[&::-webkit-scrollbar-thumb]:bg-cyan-300/40 md:[&::-webkit-scrollbar-thumb]:border md:[&::-webkit-scrollbar-thumb]:border-[#0f172a]">
            <div className="grid gap-4">
              {educationItems.map((item) => (
                <article
                  key={`${item.title}-${item.period}`}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 hover:bg-white/[0.08] md:p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white md:text-xl">
                        {item.title}
                      </h3>
                      <p className="mt-1 flex items-center gap-2 text-sm text-slate-300">
                        <BookOpen className="h-4 w-4 text-cyan-300" />
                        {item.school}
                      </p>
                    </div>
                    <div className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-200">
                      {item.score}
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-300">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1">
                      <CalendarDays className="h-4 w-4 text-cyan-300" />
                      {item.period}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1">
                      <MapPin className="h-4 w-4 text-cyan-300" />
                      {item.location}
                    </span>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-emerald-300/10 bg-emerald-400/5 p-4 text-sm text-slate-300 md:p-5">
              <div className="flex items-center gap-2 text-white">
                <BarChart3 className="h-4 w-4 text-emerald-300" />
                <span className="font-medium">Current Focus</span>
              </div>
              <p className="mt-2 leading-7">
                Pursuing BCA 1st year while continuing to build practical web
                development skills through portfolio projects and modern frontend
                work.
              </p>
            </div>
          </div>
        </div>
      </ContainerScroll>
    </section>
  );
}
