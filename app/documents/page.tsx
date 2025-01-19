"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { FileText, Download, ScrollText, BookText } from "lucide-react";
import { Button } from "@/components/ui/button";

const documents = {
  sprints: [
    {
      title: "Sprint 1",
      date: "October 15th, 2024",
      description: "Initial research and project setup",
      downloadUrl: "/documents/sprints/PDE_Sprint_1_103668.pptx",
    },
    {
      title: "Sprint 2",
      date: "November 5th, 2024",
      description: "Data collection and preprocessing",
      downloadUrl: "/documents/sprints/PDE_Sprint_2_103668.pptx",
    },
    {
      title: "Sprint 3",
      date: "November 25th, 2024",
      description: "Model development and training",
      downloadUrl: "/documents/sprints/PDE_Sprint_3_103668.pptx",
    },
    {
      title: "Sprint 4",
      date: "December 17th 2024",
      description: "Evaluation and optimization",
      downloadUrl: "/documents/sprints/PDE_Sprint_4_103668.pptx",
    },
  ],
  thesis: [
    {
      title: "Thesis Proposal",
      
      description: "Detailed research proposal and methodology",
      downloadUrl: "/documents/thesis/Thesis_proposal.pdf",
    },
    {
      title: "Pre-Thesis Document",
      description: "Preliminary findings and progress report",
      downloadUrl: "/documents/thesis/Pre_Thesis_Document_103668.pdf",
    },
  ],
};

export default function Documents() {
  const [visibleIndexes, setVisibleIndexes] = useState<number[]>([]);

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute("data-index"));
          setVisibleIndexes((prev) => [...new Set([...prev, index])]);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
    });

    document.querySelectorAll(".animated-card").forEach((card) => {
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  const renderCards = (documentsArray: any[], typeOffset: number) =>
    documentsArray.map((doc, index) => {
      const cardIndex = typeOffset + index; // To keep unique indices across sections
      return (
        <Card
          key={index}
          data-index={cardIndex}
          className={`animated-card p-6 transition-all duration-700 ease-out transform ${
            visibleIndexes.includes(cardIndex)
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          } hover:shadow-lg`}
        >
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">{doc.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{doc.date}</p>
              </div>
              <Button variant="outline" size="icon" asChild>
                <a href={doc.downloadUrl} download>
                  <Download className="h-4 w-4" />
                </a>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">{doc.description}</p>
          </div>
        </Card>
      );
    });

  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Documents</h1>
        <p className="text-xl text-muted-foreground">
          Sprint reports and thesis documents
        </p>
      </section>

      <section className="space-y-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <ScrollText className="h-6 w-6" />
            Sprint Documents
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {renderCards(documents.sprints, 0)}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <BookText className="h-6 w-6" />
            Thesis Documents
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {renderCards(documents.thesis, documents.sprints.length)}
          </div>
        </div>
      </section>
    </div>
  );
}
