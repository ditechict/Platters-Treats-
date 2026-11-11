import { createOpenAI } from 'npm:@ai-sdk/openai@4.0.114';
import { Output, streamText, type ModelMessage } from 'npm:ai@7.0.169';
import {
  createLovableAiGatewayRunIdFetch,
  getLovableAiGatewayRunId,
  getLovableAiGatewayResponseHeaders,
} from './run-id.ts';

export function createResponsesCall(
  request: Request,
  config: { baseURL: string; apiKey: string; model: string },
  messages: ModelMessage[],
  outputSchema: Parameters<typeof Output.object>[0]['schema'],
  instructions: string,
) {
  const runIdFetch = createLovableAiGatewayRunIdFetch(getLovableAiGatewayRunId(request));
  const provider = createOpenAI({
    baseURL: `${config.baseURL.replace(/\/+$/, '').replace(/\/v1$/, '')}/v1`,
    apiKey: config.apiKey,
    headers: { 'Lovable-API-Key': config.apiKey, 'X-Lovable-AIG-SDK': 'vercel-ai-sdk' },
    fetch: runIdFetch.fetch,
  });
  const result = streamText({
    model: provider.responses(config.model),
    instructions,
    messages,
    abortSignal: request.signal,
    output: Output.object({ schema: outputSchema }),
    providerOptions: {
      openai: {
        forceReasoning: true,
        reasoningEffort: 'low',
        reasoningSummary: 'auto',
        store: false,
        include: ['reasoning.encrypted_content'],
      },
    },
  });

  return {
    result,
    responseHeaders: async (init?: HeadersInit) => {
      const headers = getLovableAiGatewayResponseHeaders(undefined, init);
      const runId = await runIdFetch.waitForRunId();
      if (runId) headers.set('X-Lovable-AIG-Run-ID', runId);
      return headers;
    },
  };
}