'use server';

/**
 * @fileOverview An AI agent that suggests priority levels for tasks based on description and project context.
 *
 * - prioritizeTask - A function that handles the task priority suggestion process.
 * - PrioritizeTaskInput - The input type for the prioritizeTask function.
 * - PrioritizeTaskOutput - The return type for the prioritizeTask function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PrioritizeTaskInputSchema = z.object({
  taskDescription: z.string().describe('The description of the task.'),
});
export type PrioritizeTaskInput = z.infer<typeof PrioritizeTaskInputSchema>;

const PrioritizeTaskOutputSchema = z.object({
  priority: z.enum(['Low', 'Medium', 'High']).describe('The suggested priority level for the task.'),
  reasoning: z.string().describe('The AI reasoning behind the suggested priority.'),
});
export type PrioritizeTaskOutput = z.infer<typeof PrioritizeTaskOutputSchema>;

export async function prioritizeTask(input: PrioritizeTaskInput): Promise<PrioritizeTaskOutput> {
  return prioritizeTaskFlow(input);
}

const prompt = ai.definePrompt({
  name: 'prioritizeTaskPrompt',
  input: {schema: PrioritizeTaskInputSchema},
  output: {schema: PrioritizeTaskOutputSchema},
  prompt: `You are an AI assistant helping project managers prioritize tasks, without project context.

  Based on the task description, suggest a priority level for the task (Low, Medium, or High).
  Also, explain your reasoning behind the suggested priority.

  Task Description: {{{taskDescription}}}

  Your suggested priority:`, // Removed project context
});

const prioritizeTaskFlow = ai.defineFlow(
  {
    name: 'prioritizeTaskFlow',
    inputSchema: PrioritizeTaskInputSchema,
    outputSchema: PrioritizeTaskOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
