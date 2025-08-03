'use server';

/**
 * @fileOverview An AI agent that summarizes meeting transcripts.
 *
 * - summarizeMeeting - A function that handles the meeting summarization process.
 * - SummarizeMeetingInput - The input type for the summarizeMeeting function.
 * - SummarizeMeetingOutput - The return type for the summarizeMeeting function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeMeetingInputSchema = z.object({
  transcript: z.string().describe('The full transcript or notes from the meeting.'),
});
export type SummarizeMeetingInput = z.infer<typeof SummarizeMeetingInputSchema>;

const SummarizeMeetingOutputSchema = z.object({
  title: z.string().describe('A concise and relevant title for the meeting.'),
  summary: z.string().describe('A brief, one-paragraph summary of the meeting.'),
  actionItems: z.array(z.string()).describe('A list of clear and actionable items discussed.'),
  keyDecisions: z.array(z.string()).describe('A list of key decisions made during the meeting.'),
});
export type SummarizeMeetingOutput = z.infer<typeof SummarizeMeetingOutputSchema>;

export async function summarizeMeeting(input: SummarizeMeetingInput): Promise<SummarizeMeetingOutput> {
  return summarizeMeetingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeMeetingPrompt',
  input: {schema: SummarizeMeetingInputSchema},
  output: {schema: SummarizeMeetingOutputSchema},
  prompt: `You are an expert meeting summarizer. Analyze the following meeting transcript and provide a structured summary.

  Your summary should include:
  1. A concise title for the meeting.
  2. A one-paragraph summary of the discussion.
  3. A list of action items, each starting with a verb.
  4. A list of key decisions that were made.

  If any of these sections are not applicable, return an empty array or empty string for that field.

  Meeting Transcript:
  {{{transcript}}}

  Please provide the output in the requested structured format.`,
});

const summarizeMeetingFlow = ai.defineFlow(
  {
    name: 'summarizeMeetingFlow',
    inputSchema: SummarizeMeetingInputSchema,
    outputSchema: SummarizeMeetingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
