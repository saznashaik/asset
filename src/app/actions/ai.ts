'use server';

import { askQuestion as askQuestionFlow, AskQuestionInput } from '@/ai/flows/ai-powered-questioning';

type FormState = {
    answer: string;
    error: string | null;
};

export async function askQuestionAction(
    prevState: FormState,
    formData: FormData
): Promise<FormState> {
    const question = formData.get('question') as string;
    if (!question) {
        return { answer: '', error: 'Please enter a question.' };
    }

    const dashboardData = JSON.stringify({
      "kpi_metrics": {
        "total_revenue": "45,231.89",
        "new_customers": "+2,350",
        "customer_satisfaction_score": "98.2%"
      },
      "sales_trend": "upward over the last 6 months",
    });

    const input: AskQuestionInput = {
        question,
        dashboardData,
        externalDocumentation: "",
    };

    try {
        const output = await askQuestionFlow(input);
        return { answer: output.answer, error: null };
    } catch (e: any) {
        console.error(e);
        const errorMessage = e.message || 'An unexpected error occurred.';
        return { answer: '', error: errorMessage };
    }
}
