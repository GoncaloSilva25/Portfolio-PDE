"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

const timelineEvents = [
  {
    date: "December 6th, 2024",
    title: "Optare Solutions lecture",
    description: `Attended a lecture given by Optare Solutions. In this lecture, I leaned more about the company and their place in the market. I also gained insights into cutting-edge Research and Development (R&D) projects in the field of 6G. The presentation offered a unique perspective on the innovations shaping the next generation of telecommunications networks, highlighting advancements that promise to revolutionize connectivity and network capabilities.`,
    side: "left",
  },
  {
    date: "October 29th, 2024",
    title: "Managing Bibliographic References with Mendeley Reference Manager Webinar",
    description: `Attended a webinar on managing bibliographic references with Mendeley Reference Manager.The webinar provided an in-depth guide on managing bibliographic references using Mendeley. It covered the essentials of the software, including its installation, compatibility, and collaborative features. Participants learned how to import references automatically via the Web Importer or manually through DOI and metadata entry. Advanced functionalities, such as detecting duplicate entries, tagging references, and organizing them into collections or groups, were highlighted. Integration with Microsoft Word was demonstrated for seamless citation insertion, editing, and bibliography formatting using various citation styles. Finally, best practices for avoiding plagiarism and finalizing documents by breaking links to Mendeley were discussed.`, 
    side: "right",
  },
  {
    date: "October 22nd, 2024",
    title: "Searching for Scientific Information Webinar",
    description: `Attended a webinar on how to search for scientific information, which covered the basics of how to conduct scientific and academic research.It covered the importance of peer-reviewed publications, differentiating between scientific articles, books, and conference papers. Key steps in research were outlined, including selecting reliable sources, defining topics with relevant keywords, and developing a search strategy using Boolean operators and truncation. It emphasized the role of academic databases and repositories like Scopus and PubMed and explored the integration of generative AI tools for literature review, synthesis, and decision-making. Practical tips, such as leveraging bibliographic references and refining search terms, were also provided.`,
    side: "left",
  },
  {
    date: "October 2nd, 2024",
    title: "High Performance Computing Introduction Workshop",
    description: `Attended a workshop on High Performance Computing (HPC) on the university. The workshop covered the basics of HPC, how to connect to the university's HPC cluster, and how to run jobs 
    on the cluster, this being very useful for parallel programming using MPI and other parallel programming libraries. It was also used to introduce the EuroCC2 project to the participants.`,
    side: "right",
  },


];

const MAX_DESCRIPTION_LENGTH = 100;

export default function Portfolio() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0");
          entry.target.classList.remove("opacity-0", "translate-y-4");
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
    });

    document.querySelectorAll(".timeline-item").forEach((item) => {
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="space-y-12 max-w-5xl mx-auto">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Portfolio</h1>
        <p className="text-xl text-muted-foreground">
          Key milestones and achievements in our research journey
        </p>
      </section>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-1/2 top-4 bottom-4 w-[2px] bg-primary/20 transform -translate-x-1/2" />

        <div className="space-y-16">
          {timelineEvents.map((event, index) => (
            <div
              key={index}
              className={`timeline-item opacity-0 translate-y-4 transition-all duration-700 ease-out relative ${
                event.side === "left" ? "mr-auto pr-[50%]" : "ml-auto pl-[50%]"
              }`}
            >
              {/* Dot on the timeline */}
              <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2" />

              <div className={`${event.side === "left" ? "pr-8" : "pl-8"}`}>
                <Card
                  className={cn(
                    "p-6 transition-all hover:shadow-lg max-w-xl cursor-pointer",
                    expandedCard === index && "shadow-lg"
                  )}
                  onClick={() =>
                    setExpandedCard(expandedCard === index ? null : index)
                  }
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="p-2 bg-primary/10 rounded-full">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{event.title}</h3>
                        <span className="text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">
                          {event.date}
                        </span>
                      </div>
                      <p className="text-muted-foreground">
                        {expandedCard === index
                          ? event.description
                          : `${event.description.slice(0, MAX_DESCRIPTION_LENGTH)}${
                              event.description.length > MAX_DESCRIPTION_LENGTH
                                ? "..."
                                : ""
                            }`}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
