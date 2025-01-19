"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Brain, Microscope, ChartColumnIncreasing } from "lucide-react";

export default function Home() {
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

  const renderCards = () => {
    const cards = [
      {
        title: "Diffusion Models",
        description: "Leveraging state-of-the-art diffusion models for accurate skin disease image generation",
        icon: <Microscope className="h-6 w-6 text-primary" />,
      },
      {
        title: "Adversarial Training",
        description: "Enhancing model robustness through advanced adversarial training techniques",
        icon: <Brain className="h-6 w-6 text-primary" />,
      },
      {
        title: "Improve and Evaluate CNNs performance",
        description: "Evaluating the impact of synthetic data on CNNs performance for skin disease classification",
        icon: <ChartColumnIncreasing className="h-6 w-6 text-primary" />,
      },
    ];
    

    return cards.map((card, index) => (
      <Card
        key={index}
        data-index={index}
        className={`animated-card p-6 space-y-4 transition-all duration-700 ease-out transform ${
          visibleIndexes.includes(index)
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4"
        }`}
      >
        <div className="flex items-center space-x-4">
          {card.icon}
          <h3 className="text-lg font-semibold">{card.title}</h3>
        </div>
        <p className="text-muted-foreground">{card.description}</p>
      </Card>
    ));
  };

  return (
    <div className="space-y-12">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Skin Disease Diagnosis with Adversarial Training and Diffusion Models
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Advancing dermatological diagnostics through innovative machine learning approaches
        </p>
      </section>

      <div className="grid md:grid-cols-3 gap-6">{renderCards()}</div>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">About Me</h2>
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <p className="text-lg text-muted-foreground">
            [Your introduction and background here]
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">Motivation</h2>
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <p className="text-lg text-muted-foreground">
          Skin lesions are a growing health concern requiring early and accurate diagnosis for successful
treatment. Dermatologists rely on visual examination and biopsies, but subjectivity in visual assessment
and limitations in access to specialists can create difficulties for early detection. Deep learning has
achieved remarkable success in medical image analysis, with convolutional neural networks (CNNs)
demonstrating promising results in skin lesion classification. However, a significant challenge in
training these models lies in the limited availability of high-quality, labeled medical data. Generative
models can address this problem by creating synthetic images that augment the real dataset, enhancing
the model's ability to generalize predictions. While Generative Adversarial Networks (GANs) have been a
popular choice for generating images, diffusion models offer advantages in the context of skin
lesion diagnosis. First, by learning the underlying distribution of real data, these models often provide
more realistic and diverse images compared to GANs, who suffer from artifacts and inconsistencies. 
Second, GANs involve a complex training process where a generator and a discriminator compete
with each other, making them unstable and prone to collapse. Conversely, diffusion models follow a well-
defined training procedure with a clear objective, leading to more stable and reliable training.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">Objectives</h2>
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <ol className="list-decimal pl-5 space-y-2 text-lg text-muted-foreground">
            <li>
              Train a deep CNN classifier for skin lesion classification using a dataset of dermoscopy images.
            </li>
            <li>
              Develop a diffusion model to generate synthetic skin lesion images that are similar to real data.
            </li>
            <li>
              Implement an adversarial (iterative) training process where the diffusion model is guided to generate synthetic data that targets challenging cases identified on a held-out test set.
            </li>
            <li>
              Evaluate the impact of the generated synthetic data on the classifier's performance, comparing its accuracy, sensitivity, and specificity on the test set before and after adversarial training.
            </li>
          </ol>
        </div>
      </section>


      
    </div>
  );
}
