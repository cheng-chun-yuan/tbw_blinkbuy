// sets properties that are in K but not in T to optional never
type AssignNever<T, K> = K & {[B in Exclude<keyof T, keyof K>]?: never};
type BuildUniqueInterfaces<CompleteInterface, Interfaces> = Interfaces extends object
  ? AssignNever<CompleteInterface, Interfaces>
  : never;

type UnionToIntersection<U> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

export type ToolCalls = {function: {name: string; arguments: string}; id: string}[];

export interface ToolAPI {
  tool_calls?: ToolCalls;
  tool_call_id?: string;
  name?: string;
}

export type InterfacesUnion<Interfaces> = BuildUniqueInterfaces<UnionToIntersection<Interfaces>, Interfaces>;

export type OpenAIMessage = {
    role: 'user' | 'system' | 'ai' | 'tool';
    content: string;
  } & ToolAPI;
export type ResultChoice = InterfacesUnion<
  {text: string} | {message: OpenAIMessage} | {delta: OpenAIMessage; finish_reason?: string}
>;
export interface OpenAIConverseResult {
    choices: ResultChoice[];
    usage: {total_tokens: number};
    error?: {code: string; message: string};
  }
export type MessageFileType = 'image' | 'audio' | 'any';
export type MessageFile = {src?: string; name?: string; type?: MessageFileType; ref?: File};
export type MessageContent = {role?: string; text?: string; files?: MessageFile[]; html?: string; _sessionId?: string};
export interface DeepChatTextRequestBody {
    messages: MessageContent[];
  }
export type DeepChatOpenAITextRequestBody = DeepChatTextRequestBody & {model?: string};

export function createReqChatBody(body: DeepChatOpenAITextRequestBody, stream?: boolean) {
  // Text messages are stored inside request body using the Deep Chat JSON format:
  // https://deepchat.dev/docs/connect
  const chatBody = {
    messages: body.messages.map((message) => {
      return {role: message.role === 'ai' ? 'assistant' : message.role, content: message.text};
    }),
    model: body.model,
  } as {stream?: boolean};
  if (stream) chatBody.stream = true;
  return chatBody;
}