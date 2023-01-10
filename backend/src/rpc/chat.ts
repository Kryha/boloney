import { profanityFilter } from "../services";
import { isEnvelopeChannelMessageSend } from "../types/chat";

export const rtBeforeChannelMessageSend: nkruntime.RtBeforeHookFunction<nkruntime.Envelope> = function (
  _ctx: nkruntime.Context,
  _logger: nkruntime.Logger,
  _nk: nkruntime.Nakama,
  envelope: nkruntime.Envelope
): nkruntime.Envelope {
  if (!isEnvelopeChannelMessageSend(envelope)) {
    return envelope;
  }

  if (profanityFilter.isProfane(envelope.channelMessageSend.content)) {
    envelope.channelMessageSend.content = profanityFilter.clean(envelope.channelMessageSend.content);
  }

  return envelope;
};
