import { GET, POST, PUT, DELETE } from '@/web/common/api/request';
import type { CreateQuestionGuideParams } from '@/global/core/ai/api.d';

// 导出postQuestionGuide函数，用于创建问题指导
export const postQuestionGuide = (data: CreateQuestionGuideParams, cancelToken: AbortController) =>
  POST<string[]>('/core/ai/agent/createQuestionGuide', data, { cancelToken });
