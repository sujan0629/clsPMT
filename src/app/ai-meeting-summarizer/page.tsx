import { MeetingSummarizerForm } from "@/components/ai/meeting-summarizer-form";

export default function AiMeetingSummarizerPage() {
  return (
    <div className="flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">AI Meeting Summarizer</h1>
        <p className="text-muted-foreground mt-1">
          Paste your meeting notes or transcript below to get a concise, structured summary.
        </p>
      </div>
      <MeetingSummarizerForm />
    </div>
  );
}
