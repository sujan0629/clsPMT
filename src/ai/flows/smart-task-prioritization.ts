'use server';

/**
 * @fileOverview An AI agent that suggests priority levels for tasks based on description and project context.
 *
 * - suggestTaskPriority - A function that handles the task priority suggestion process.
 * - SuggestTaskPriorityInput - The input type for the suggestTaskPriority function.
 * - SuggestTaskPriorityOutput - The return type for the suggestTaskPriority function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestTaskPriorityInputSchema = z.object({
  taskDescription: z.string().describe('The description of the task.'),
  projectContext: z.string().describe('The context of the project the task belongs to.'),
});
export type SuggestTaskPriorityInput = z.infer<typeof SuggestTaskPriorityInputSchema>;

const SuggestTaskPriorityOutputSchema = z.object({
  priority: z.enum(['Low', 'Medium', 'High']).describe('The suggested priority level for the task.'),
  reasoning: z.string().describe('The AI reasoning behind the suggested priority.'),
});
export type SuggestTaskPriorityOutput = z.infer<typeof SuggestTaskPriorityOutputSchema>;

export async function suggestTaskPriority(input: SuggestTaskPriorityInput): Promise<SuggestTaskPriorityOutput> {
  return suggestTaskPriorityFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestTaskPriorityPrompt',
  input: {schema: SuggestTaskPriorityInputSchema},
  output: {schema: SuggestTaskPriorityOutputSchema},
  prompt: `You are an AI assistant helping project managers prioritize tasks.

  Based on the task description and project context, suggest a priority level for the task (Low, Medium, or High).
  Also, explain your reasoning behind the suggested priority.

  Task Description: {{{taskDescription}}}
  Project Context: {{{projectContext}}}

  Your suggested priority:`,
});

const suggestTaskPriorityFlow = ai.defineFlow(
  {
    name: 'suggestTaskPriorityFlow',
    inputSchema: SuggestTaskPriorityInputSchema,
    outputSchema: SuggestTaskPriorityOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
