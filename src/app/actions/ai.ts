'use server';

import { askQuestion as askQuestionFlow, AskQuestionInput } from '@/ai/flows/ai-powered-questioning';

type FormState = {
    answer: string | null;
    error: string | null;
    query: string | null;
};

export async function askQuestionAction(
    prevState: FormState,
    formData: FormData
): Promise<FormState> {
    const question = formData.get('question') as string;
    if (!question) {
        return { answer: null, error: 'Please enter a question.', query: null };
    }

    const dashboardData = JSON.stringify({
      "kpi_metrics": {
        "total_assets": "12,847",
        "high_risk_assets": "247",
        "repair_cost_12m": "847K",
        "avg_downtime_asset": "4.2h"
      },
      "asset_categories": {
          "servers": 4231,
          "workstations": 5892,
          "network": 2724
      },
      "repair_cost_trend": "upward over last 8 months"
    });

    const input: AskQuestionInput = {
        question,
        dashboardData,
        externalDocumentation: "",
    };

    try {
        const output = await askQuestionFlow(input);
        return { answer: output.answer, error: null, query: question };
    } catch (e: any) {
        console.error(e);
        const errorMessage = e.message || 'An unexpected error occurred.';
        return { answer: null, error: errorMessage, query: question };
    }
}
