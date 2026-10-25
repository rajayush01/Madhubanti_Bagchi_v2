import { Award as AwardIcon } from "lucide-react";
import { awards, awardsFeature } from "../data/awards";
// import { press } from "../data/press";
import Eyebrow from "../components/ui/Eyebrow";
import Lines from "../components/ui/Lines";
import AwardEmblem from "../components/ui/AwardEmblem";
// import Media from '../components/ui/Media'

// const when = (d: string) =>
//   d
//     ? new Date(d).toLocaleDateString("en-IN", {
//         month: "short",
//         year: "numeric",
//       })
//     : "Date";

// function Block({
//   icon,
//   title,
//   children,
// }: {
//   icon: React.ReactNode;
//   title: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="mt-24 grid gap-8 lg:grid-cols-12">
//       <h3 className="label flex items-center gap-3 text-maroon lg:col-span-3">
//         {icon}
//         {title}
//       </h3>
//       <div className="lg:col-span-9">{children}</div>
//     </div>
//   );
// }

export default function PressSection() {
  return (
    <section
      id="press"
      className="bg-ivory px-6 py-28 text-ink md:px-12 md:py-40"
    >
      <div className="mx-auto max-w-[1500px]">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow>Recognition</Eyebrow>
            <Lines
              as="h2"
              lines={["Recognition"]}
              accentLast
              className="display mt-8 text-[clamp(3rem,7vw,6.5rem)]"
            />
          </div>
          {/* <p className="font-light leading-loose text-charcoal/70 lg:col-span-4 lg:col-start-9">
            Verified awards, nominations, interviews and features, each linked
            to its original source.
          </p> */}
        </div>

        <div className="mt-24 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <h3 className="label mb-6 flex items-center gap-3 text-maroon">
              <AwardIcon size={16} aria-hidden />
              Awards & nominations
            </h3>
            <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-md bg-sand/40 shadow-[0_24px_60px_-20px_rgba(16,16,18,0.35)]">
              {awardsFeature.image ? (
                <img
                  src={awardsFeature.image}
                  alt={awardsFeature.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              ) : (
                <>
                  <AwardEmblem className="w-3/4" />
                  <span className="label absolute bottom-4 left-4 text-[0.6rem] text-charcoal/50">
                    Placeholder — award image
                  </span>
                </>
              )}
            </div>
          </div>
          <div className="lg:col-span-8 lg:pt-12">
            {awards.length === 0 ? (
              <p className="font-serif text-2xl italic text-charcoal/60">
                Awards and nominations will be listed here once verified.
              </p>
            ) : (
              <ul className="divide-y divide-charcoal/15 border-y border-charcoal/15">
                {awards.map((a) => (
                  <li
                    key={a.id}
                    className="group grid items-center gap-4 py-7 md:grid-cols-[3.5rem_7rem_1fr_auto] md:gap-8"
                  >
                    <AwardEmblem className="hidden w-12 md:block" />
                    <p className="font-serif text-4xl font-light text-bronze md:text-5xl">
                      {a.year}
                    </p>
                    <div>
                      <p className="font-serif text-2xl transition-colors group-hover:text-maroon md:text-3xl">
                        {a.title}
                      </p>
                      <p className="mt-1 text-charcoal/60">
                        {[a.category, a.work].filter(Boolean).join(" · ")}
                      </p>
                      {a.placeholder && (
                        <p className="label mt-2 text-[0.6rem] text-maroon/70">
                          Placeholder — replace in data/awards.ts
                        </p>
                      )}
                    </div>
                    {a.result && (
                      <span className="label border border-gold px-4 py-2 text-maroon">
                        {a.result}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        
      </div>
    </section>
  );
}
