export const isEnvelopeChannelMessageSend = (pet: nkruntime.Envelope): pet is nkruntime.EnvelopeChannelMessageSend => {
  return (pet as nkruntime.EnvelopeChannelMessageSend).channelMessageSend !== undefined;
};
