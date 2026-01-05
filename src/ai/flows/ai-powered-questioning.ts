'use server';
/**
 * @fileOverview Implements the AI-Powered Questioning flow, allowing users to ask natural language questions about data.
 *
 * - askQuestion - A function that handles the question asking process.
 * - AskQuestionInput - The input type for the askQuestion function.
 * - AskQuestionOutput - The return type for the askQuestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AskQuestionInputSchema = z.object({
  question: z.string().describe('The natural language question about the data.'),
  dashboardData: z.string().optional().describe('The relevant data from the dashboard, in JSON format.'),
  externalDocumentation: z.string().optional().describe('Relevant external documentation to enhance the query.'),
});

export type AskQuestionInput = z.infer<typeof AskQuestionInputSchema>;

const AskQuestionOutputSchema = z.object({
  answer: z.string().describe('The AI-generated answer to the question.'),
});

export type AskQuestionOutput = z.infer<typeof AskQuestionOutputSchema>;

const fetchDataTool = ai.defineTool({
    name: 'fetchData',
    description: 'Fetches relevant data to answer the question.  Call this tool if the question requires specific data that is not available in the dashboardData or externalDocumentation.',
    inputSchema: z.object({
      query: z.string().describe('A query to retrieve the relevant data.'),
    }),
    outputSchema: z.string().describe('The data retrieved from the data source.'),
  },
  async (input) => {
    // Placeholder implementation - replace with actual data fetching logic
    console.log(`Executing data fetch with query: ${input.query}`);
    return `Data for query: ${input.query}`;
  }
);


export async function askQuestion(input: AskQuestionInput): Promise<AskQuestionOutput> {
  return askQuestionFlow(input);
}

const askQuestionPrompt = ai.definePrompt({
  name: 'askQuestionPrompt',
  input: {schema: AskQuestionInputSchema},
  output: {schema: AskQuestionOutputSchema},
  tools: [fetchDataTool],
  prompt: `You are an AI assistant helping executives get insights from their dashboards.

  You have access to the following information:
  - Dashboard Data: {{{dashboardData}}}
  - External Documentation: {{{externalDocumentation}}}

  The user is asking the following question: {{{question}}}

  Answer the question based on the available information. If the information is not available, use the fetchData tool to retrieve the data.  If you use the fetchData tool, incorporate that data into your response to the user.
`,
});

const askQuestionFlow = ai.defineFlow(
  {
    name: 'askQuestionFlow',
    inputSchema: AskQuestionInputSchema,
    outputSchema: AskQuestionOutputSchema,
  },
  async input => {
    const {output} = await askQuestionPrompt(input);
    return output!;
  }
);
