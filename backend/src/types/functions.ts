import { MatchLoopParams, MatchStage, Player } from "./match";

export type MessageCallback = (loopParams: MatchLoopParams, message: nkruntime.MatchMessage, sender: Player) => void;
export type StageLogicCallback = (loopParams: MatchLoopParams) => Promise<void>;
export type StageTransitionCallback = (loopParams: MatchLoopParams, nextStage: MatchStage) => void;

export type MessageHandler = (
  callback: MessageCallback
) => (loopParams: MatchLoopParams, message: nkruntime.MatchMessage, sender: Player) => void;

export type LogicHandler = (callback: StageLogicCallback) => (loopParams: MatchLoopParams) => Promise<void>;

export type TransitionHandler = (callback: StageTransitionCallback) => (loopParams: MatchLoopParams, nextStage: MatchStage) => void;

export type RpcHandler = (cb: nkruntime.RpcFunction) => nkruntime.RpcFunction;

export type BeforeAuthHookHandler = (
  cb: nkruntime.BeforeHookFunction<nkruntime.AuthenticateCustomRequest>
) => nkruntime.BeforeHookFunction<nkruntime.AuthenticateCustomRequest>;

export type AfterAuthHookHandler = (
  cb: nkruntime.AfterHookFunction<nkruntime.Session, nkruntime.AuthenticateCustomRequest>
) => nkruntime.AfterHookFunction<nkruntime.Session, nkruntime.AuthenticateCustomRequest>;
