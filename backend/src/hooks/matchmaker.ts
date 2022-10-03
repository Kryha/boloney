export const beforeMatchmakerAdd: nkruntime.RtBeforeHookFunction<nkruntime.EnvelopeMatchmakerAdd> = function (
  _ctx: nkruntime.Context,
  logger: nkruntime.Logger,
  _nk: nkruntime.Nakama,
  envelope: nkruntime.EnvelopeMatchmakerAdd
): nkruntime.EnvelopeMatchmakerAdd | void {
  envelope.matchmakerAdd.minCount = 2;
  envelope.matchmakerAdd.maxCount = 2;
  envelope.matchmakerAdd.query = "*";

  logger.debug(JSON.stringify(envelope.matchmakerAdd));

  return envelope;
};
