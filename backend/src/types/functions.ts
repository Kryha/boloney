import { MatchLoopParams, MatchStage, Player } from "./match";

export type MessageCallback = (loopParams: MatchLoopParams, message: nkruntime.MatchMessage, sender: Player) => Promise<void>;
export type StageLogicCallback = (loopParams: MatchLoopParams) => Promise<void>;
export type StageTransitionCallback = (loopParams: MatchLoopParams, nextStage: MatchStage) => Promise<void>;

export type MessageHandler = (callback: MessageCallback) => MessageCallback;

export type LogicHandler = (callback: StageLogicCallback) => StageLogicCallback;

export type TransitionHandler = (
  callback: StageTransitionCallback
) => StageTransitionCallback;

export type RpcHandler = (cb: nkruntime.RpcFunction) => nkruntime.RpcFunction;

export type BeforeAuthHookHandler = (
  cb: nkruntime.BeforeHookFunction<nkruntime.AuthenticateCustomRequest>
) => nkruntime.BeforeHookFunction<nkruntime.AuthenticateCustomRequest>;

export type AfterAuthHookHandler = (
  cb: nkruntime.AfterHookFunction<nkruntime.Session, nkruntime.AuthenticateCustomRequest>
) => nkruntime.AfterHookFunction<nkruntime.Session, nkruntime.AuthenticateCustomRequest>;
