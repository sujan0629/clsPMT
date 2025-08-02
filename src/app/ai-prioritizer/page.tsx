import { SmartPrioritizerForm } from "@/components/ai/smart-prioritizer-form";

export default function AiPrioritizerPage() {
  return (
    <div className="flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Smart Task Prioritizer</h1>
        <p className="text-muted-foreground mt-1">
          Let our AI assistant suggest task priorities based on context and description.
        </p>
      </div>
      <SmartPrioritizerForm />
    </div>
  );
}
