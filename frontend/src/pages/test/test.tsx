// TODO: delete this file when done testing

import { FC, useState } from "react";
import {
  CallBoloney,
  CallExact,
  CookieIconSVG,
  DiscordLogo,
  GithubLogo,
  Hand,
  HookHand,
  InfoIconSVG,
  LeftArrowIconSVG,
  LightningIconSVG,
  LobsterHand,
  PlasticHand,
  RightArrowIconSVG,
  SausageHand,
  SettingsIconSVG,
  SkeletonHand,
  text,
} from "../../assets";
import { fakePlayers } from "../../assets/fake-data";
import { InputLegend, MatchPlayersOverview, TopNavigation } from "../../components";
import {
  BaseIcon,
  SecondaryButtonBase,
  TertiaryButtonBase,
  BaseRow,
  BlockBox,
  BadgeBlock,
  MessageBlock,
  InformationBlock,
  CopyBlock,
  ModalBlock,
  Box,
  Sidebar,
  HUDBlock,
  PlayerInformationBlock,
  PlayerBox,
  PlayerMenuBlock,
  PlayerMenuBox,
  BaseInput,
  FluidImage,
  GeneralText,
  CenteredImage,
  avatarHeight,
  Heading3,
  MediaImage,
  HUDPlayerBox,
  BaseSelect,
  BaseOption,
  PercentageInput,
  ChatInput,
  CheckboxBox,
  RadioInput,
  SwitchWrapper,
  SwitchInput,
  Slider,
  Card,
  BodyText,
  Heading1,
  Heading2,
  Heading4,
  Heading5,
  Heading6,
  InfoDisplay,
} from "../../atoms";
import { MainContentContainer } from "../../components/match-layout/styles";
import { PlayerMenu } from "../../components/player-menu";
import { PickAction } from "../../components/player-turns/pick-action";
import { MIN_DRAW_ROUND_OFFSET, MAX_DRAW_ROUND_OFFSET } from "../../constants";
import { color, buttonSize, fonts, fontSizes, fontWeights, images, layoutHeight, lineHeights, spacing } from "../../design";
import {
  PowerUpText,
  TextWithLink,
  TimerHeader,
  TertiaryButton,
  SecondaryButton,
  PrimaryButton,
  ColumnHeading,
  RowHeadingIcon,
  NotificationHeading,
  ParagraphDescription,
  LargeInfoHeading,
  NumberedDescriptionText,
  NumberedSection,
  ToastNotifications,
  TooltipFrame,
  CookieBanner,
} from "../../molecules";
import { getPowerUp, range } from "../../util";
import { AlignColumn, BackgroundRow, BottomHud, HalfColumn, Layout } from "./styles";

export const Test: FC = () => {
  const powerUp1 = getPowerUp("1");
  const powerUp2 = getPowerUp("2");
  const powerUp3 = getPowerUp("3");
  const powerUp4 = getPowerUp("4");
  const powerUp5 = getPowerUp("5");
  const powerUp6 = getPowerUp("6");
  const powerUp7 = getPowerUp("7");
  const powerUp8 = getPowerUp("8");
  const powerUp9 = getPowerUp("9");
  const [isChecked, setChecked] = useState(false);
  if (!powerUp1 || !powerUp2 || !powerUp3 || !powerUp4 || !powerUp5 || !powerUp6 || !powerUp7 || !powerUp8 || !powerUp9) return <></>;

  return (
    <div style={{ padding: "50px", background: "lightBlue" }}>
      <ToastNotifications
        img={CallExact}
        heading="The Sum power-up"
        subheading="It is being used towards you! Wait and see the result of this move!"
        isMultipleNotifications
      />
      <br />
      <ToastNotifications
        img={CallExact}
        heading="The Sum power-up"
        subheading="It is being used towards you! Wait and see the result of this move!"
      />
      <br />
      <br />
      <TooltipFrame
        heading={"Call Exact:"}
        description={
          "If the amount of dice on the table that match the bid’s face value exactly matches the last player’s bid, then the Exact call is correct and the calling player receives a number of power-ups depending on the number of dice in play and the number of rounds played. If it doesn’t exactly match, the calling player loses a die."
        }
      />
      <br />
      <br />
      <br />
      <br />
      <TooltipFrame
        description={
          "If the amount of dice on the table that match the bid’s face value exactly matches the last player’s bid, then the Exact call is correct and the calling player receives a number of power-ups depending on the number of dice in play and the number of rounds played. If it doesn’t exactly match, the calling player loses a die."
        }
      />
      <br />
      <br />
      <br />
      <CookieBanner
        img={CookieIconSVG}
        heading="No boloney was used in the making of these cookies"
        subheading="We use analytics cookies to understand how you use Boloney! and to make improvements."
        secondaryButtonText={text.general.cookieAccept}
        tertiaryButtonText={text.general.cookieReject}
      />
      <br />
      <br />
      <br />
      <BaseRow gap={spacing.s}>
        <Card padding={spacing.s}>
          <AlignColumn justifyContent="center">
            <CenteredImage src={powerUp1.cardImage} />
            <PowerUpText headingColor={color.mediumGrey} heading={powerUp1.name} description={text.param.zeroAmount(powerUp2.id)} />
          </AlignColumn>
        </Card>
        <Card padding={spacing.s}>
          <AlignColumn justifyContent="center">
            <CenteredImage src={powerUp2.cardImage} />
            <PowerUpText headingColor={color.mediumGrey} heading={powerUp2.name} description={text.param.zeroAmount(powerUp2.id)} />
          </AlignColumn>
        </Card>
        <Card padding={spacing.s}>
          <AlignColumn justifyContent="center">
            <CenteredImage src={powerUp3.cardImage} />
            <PowerUpText headingColor={color.mediumGrey} heading={powerUp3.name} description={text.param.zeroAmount(powerUp3.id)} />
          </AlignColumn>
        </Card>
      </BaseRow>
      <br />
      <BaseRow gap={spacing.s}>
        <Card padding={spacing.s}>
          <AlignColumn justifyContent="center">
            <CenteredImage src={powerUp4.cardImage} />
            <PowerUpText headingColor={color.mediumGrey} heading={powerUp4.name} description={text.param.zeroAmount(powerUp4.id)} />
          </AlignColumn>
        </Card>
        <Card padding={spacing.s}>
          <AlignColumn justifyContent="center">
            <CenteredImage src={powerUp5.cardImage} />
            <PowerUpText headingColor={color.mediumGrey} heading={powerUp5.name} description={text.param.zeroAmount(powerUp5.id)} />
          </AlignColumn>
        </Card>
        <Card padding={spacing.s}>
          <AlignColumn justifyContent="center">
            <CenteredImage src={powerUp6.cardImage} />
            <PowerUpText headingColor={color.mediumGrey} heading={powerUp6.name} description={text.param.zeroAmount(powerUp6.id)} />
          </AlignColumn>
        </Card>
      </BaseRow>
      <br />
      <BaseRow gap={spacing.s}>
        <Card padding={spacing.s}>
          <AlignColumn justifyContent="center">
            <CenteredImage src={powerUp7.cardImage} />
            <PowerUpText headingColor={color.mediumGrey} heading={powerUp7.name} description={text.param.zeroAmount(powerUp7.id)} />
          </AlignColumn>
        </Card>
        <Card padding={spacing.s}>
          <AlignColumn justifyContent="center">
            <CenteredImage src={powerUp8.cardImage} />
            <PowerUpText headingColor={color.mediumGrey} heading={powerUp8.name} description={text.param.zeroAmount(powerUp8.id)} />
          </AlignColumn>
        </Card>
        <Card padding={spacing.s}>
          <AlignColumn justifyContent="center">
            <CenteredImage src={powerUp9.cardImage} />
            <PowerUpText headingColor={color.mediumGrey} heading={powerUp9.name} description={text.param.zeroAmount(powerUp9.id)} />
          </AlignColumn>
        </Card>
      </BaseRow>
      <br />
      <br />
      Power up hover text
      <br />
      <br />
      <Card padding={spacing.s}>
        <AlignColumn justifyContent="flex-end">
          <PowerUpText headingColor={color.mediumGrey} heading={powerUp9.name} description={powerUp9.shortDescription} gap={spacing.xs} />
        </AlignColumn>
      </Card>
      <br />
      <br />
      <BaseRow gap={spacing.s}>
        <Card isSmall>
          <AlignColumn justifyContent="center">
            <CenteredImage src={powerUp1.cardImage} />
          </AlignColumn>
        </Card>
        <Card isSmall>
          <AlignColumn justifyContent="center">
            <CenteredImage src={powerUp2.cardImage} />
          </AlignColumn>
        </Card>
        <Card isSmall>
          <AlignColumn justifyContent="center">
            <CenteredImage src={powerUp3.cardImage} />
          </AlignColumn>
        </Card>
        <Card isSmall>
          <AlignColumn justifyContent="center">
            <CenteredImage src={powerUp4.cardImage} />
          </AlignColumn>
        </Card>
        <Card isSmall>
          <AlignColumn justifyContent="center">
            <CenteredImage src={powerUp5.cardImage} />
          </AlignColumn>
        </Card>
        <Card isSmall>
          <AlignColumn justifyContent="center">
            <CenteredImage src={powerUp6.cardImage} />
          </AlignColumn>
        </Card>
        <Card isSmall>
          <AlignColumn justifyContent="center">
            <CenteredImage src={powerUp7.cardImage} />
          </AlignColumn>
        </Card>
        <Card isSmall>
          <AlignColumn justifyContent="center">
            <CenteredImage src={powerUp8.cardImage} />
          </AlignColumn>
        </Card>
        <Card isSmall>
          <AlignColumn justifyContent="center">
            <CenteredImage src={powerUp9.cardImage} />
          </AlignColumn>
        </Card>
      </BaseRow>
      <br />
      <br />
      <Card isSmall isEmpty>
        <BaseRow alignItems="center">
          <GeneralText>{"+4"}</GeneralText>
        </BaseRow>
      </Card>
      <br />
      <br />
      <br />
      <br />
      <br />
      <TextWithLink
        text="reach out to"
        href="/friend"
        linkText="boloney"
        fontSize={fontSizes.heading3}
        lineHeight={lineHeights.heading3}
        fontWeight={fontWeights.regular}
        font={fonts.secondary}
        gap={spacing.xs}
      />
      <br />
      <br />
      <br />
      timer heading
      <br />
      <br />
      <TimerHeader time="0.10" heading="call boloney" gap={spacing.s} />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <RowHeadingIcon heading="Draw Round Offset" icon={<BaseIcon src={<InfoIconSVG />} display="flex" />} gap={spacing.xs} />
      <br />
      <br />
      <br />
      <ColumnHeading
        heading="The total sum of the dice is..."
        subheading="29"
        gap={spacing.xs}
        subheadingFontSize={fontSizes.infoDisplay}
        subheadingLineHeight={lineHeights.infoDisplay}
      />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <NotificationHeading
        heading="grill!"
        subheading="it is being used towards you! Wait and see the result of this bold move..."
        gap={spacing.xs}
        headingFontSize={fontSizes.heading6}
        headingLineHeight={lineHeights.heading6}
        headingTransformation="uppercase"
        subheadingFontSize={fontSizes.body}
        subheadingLineHeight={lineHeights.body}
      />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <ColumnHeading
        heading="time is out!"
        subheading="You run out of time. We skip your turn and you lose a dice!"
        gap={spacing.xs}
        headingFontSize={fontSizes.heading1}
        headingLineHeight={lineHeights.heading1}
        subheadingColor={color.darkGrey}
      />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <ColumnHeading
        heading="i'm back, baby!"
        subheading="choose 5 power-ups to exchange for 1 sweet, sweet die. Get it back!"
        gap={spacing.xs}
        subheadingColor={color.darkGrey}
      />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <ColumnHeading
        heading="match created!"
        subheading="Your match is ready to go! Share it with your friends using the link below."
        gap={spacing.md}
        headingFontSize={fontSizes.heading1}
        headingLineHeight={lineHeights.heading1}
        subheadingFontSize={fontSizes.heading4}
        subheadingLineHeight={lineHeights.heading4}
      />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <RowHeadingIcon
        heading="bird's Eye View"
        icon={<BaseIcon src={<LightningIconSVG />} iconColor={color.transparent} strokeColor={color.black} />}
        iconPosition="row-reverse"
        justifyContent="flex-end"
        gap={spacing.xxs}
      />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <ParagraphDescription
        heading="glory awaits!"
        subheading="master the mindgames to be the last player left with dice and claim the winner’s crown."
        gap={spacing.xs}
      />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <LargeInfoHeading heading="lets" headingColor={color.mediumGrey} />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <LargeInfoHeading heading="rule the" justifyContent="flex-end" headingTransformation="lowercase" headingColor={color.mediumGrey} />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <NumberedSection>
        <NumberedDescriptionText
          numberColor={color.cloudWhite}
          subheadingColor={color.mediumGrey}
          heading="Built on Aleo"
          subheading="Behind Boloney!’s tech lies the zero-knowledge gaming toolkit developed by Kryha on Aleo. This toolkit uses zero-knowledge proofs (ZKPs) to allow players to prove that their statements are valid without revealing the statements themselves, keeping the hidden elements of their game strategy for their eyes only. For private, secure on-chain gaming, without the fun-squashing giveaways!"
        />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <NumberedDescriptionText
          numberColor={color.cloudWhite}
          subheadingColor={color.mediumGrey}
          heading="Built on Aleo"
          subheading="Behind Boloney!’s tech lies the zero-knowledge gaming toolkit developed by Kryha on Aleo. This toolkit uses zero-knowledge proofs (ZKPs) to allow players to prove that their statements are valid without revealing the statements themselves, keeping the hidden elements of their game strategy for their eyes only. For private, secure on-chain gaming, without the fun-squashing giveaways!"
        />
      </NumberedSection>
      <br />
      <br />
      <br />
      <Box>{"checkbox box default"}</Box>
      <br />
      <Box active>{"checkbox box active"}</Box>
      <br />
      <BlockBox />
      <br />
      <BadgeBlock>{"winner"}</BadgeBlock>
      <br />
      <MessageBlock>{"message"}</MessageBlock>
      <br />
      <InformationBlock>{"info"}</InformationBlock>
      <br />
      <CopyBlock>{"copy"}</CopyBlock>
      <br />
      <ModalBlock>{"modal"}</ModalBlock>
      <br />
      <h1>layouts</h1>
      <br />
      <h2>side bar</h2>
      <BaseRow gap={spacing.s}>
        <Sidebar>
          <PlayerBox>
            <AlignColumn justifyContent="center">
              <CenteredImage height={avatarHeight[0]} width={images.auto} src={HookHand} />
            </AlignColumn>
          </PlayerBox>
        </Sidebar>
        <Sidebar>
          <PlayerBox divisors={2}>
            <AlignColumn justifyContent="center">
              <CenteredImage height={avatarHeight[1]} width={images.auto} src={LobsterHand} />
            </AlignColumn>
          </PlayerBox>
          <PlayerBox divisors={2}>
            <AlignColumn justifyContent="center">
              <CenteredImage height={avatarHeight[1]} width={images.auto} src={HookHand} />
            </AlignColumn>
          </PlayerBox>
        </Sidebar>
        <Sidebar>
          <PlayerBox divisors={3}>
            <AlignColumn justifyContent="center">
              <CenteredImage height={avatarHeight[2]} width={images.auto} src={LobsterHand} />
            </AlignColumn>
          </PlayerBox>
          <PlayerBox divisors={3}>
            <AlignColumn justifyContent="center">
              <CenteredImage height={avatarHeight[2]} width={images.auto} src={HookHand} />
            </AlignColumn>
          </PlayerBox>
          <PlayerBox divisors={3}>
            <AlignColumn justifyContent="center">
              <CenteredImage height={avatarHeight[2]} width={images.auto} src={SausageHand} />
            </AlignColumn>
          </PlayerBox>
        </Sidebar>
        <Sidebar>
          <PlayerBox divisors={4}>
            <AlignColumn justifyContent="center">
              <CenteredImage height={avatarHeight[3]} width={images.auto} src={LobsterHand} />
            </AlignColumn>
          </PlayerBox>
          <PlayerBox divisors={4}>
            <AlignColumn justifyContent="center">
              <CenteredImage height={avatarHeight[3]} width={images.auto} src={HookHand} />
            </AlignColumn>
          </PlayerBox>
          <PlayerBox divisors={4}>
            <AlignColumn justifyContent="center">
              <CenteredImage height={avatarHeight[3]} width={images.auto} src={SausageHand} />
            </AlignColumn>
          </PlayerBox>
          <PlayerBox divisors={4}>
            <AlignColumn justifyContent="center">
              <CenteredImage height={avatarHeight[3]} width={images.auto} src={PlasticHand} />
            </AlignColumn>
          </PlayerBox>
        </Sidebar>
        <Sidebar>
          <PlayerBox divisors={5}>
            <AlignColumn justifyContent="center">
              <CenteredImage height={avatarHeight[4]} width={images.auto} src={LobsterHand} />
            </AlignColumn>
          </PlayerBox>
          <PlayerBox divisors={5}>
            <AlignColumn justifyContent="center">
              <CenteredImage height={avatarHeight[4]} width={images.auto} src={HookHand} />
            </AlignColumn>
          </PlayerBox>
          <PlayerBox divisors={5}>
            <AlignColumn justifyContent="center">
              <CenteredImage height={avatarHeight[4]} width={images.auto} src={SausageHand} />
            </AlignColumn>
          </PlayerBox>
          <PlayerBox divisors={5}>
            <AlignColumn justifyContent="center">
              <CenteredImage height={avatarHeight[4]} width={images.auto} src={PlasticHand} />
            </AlignColumn>
          </PlayerBox>
          <PlayerBox divisors={5}>
            <AlignColumn justifyContent="center">
              <CenteredImage height={avatarHeight[4]} width={images.auto} src={SkeletonHand} />
            </AlignColumn>
          </PlayerBox>
        </Sidebar>
        <Sidebar>
          <PlayerBox divisors={6}>
            <AlignColumn justifyContent="center">
              <CenteredImage height={avatarHeight[5]} width={images.auto} src={LobsterHand} />
            </AlignColumn>
          </PlayerBox>
          <PlayerBox divisors={6}>
            <AlignColumn justifyContent="center">
              <CenteredImage height={avatarHeight[5]} width={images.auto} src={HookHand} />
            </AlignColumn>
          </PlayerBox>
          <PlayerBox divisors={6}>
            <AlignColumn justifyContent="center">
              <CenteredImage height={avatarHeight[5]} width={images.auto} src={SausageHand} />
            </AlignColumn>
          </PlayerBox>
          <PlayerBox divisors={6}>
            <AlignColumn justifyContent="center">
              <CenteredImage height={avatarHeight[5]} width={images.auto} src={PlasticHand} />
            </AlignColumn>
          </PlayerBox>
          <PlayerBox divisors={6}>
            <AlignColumn justifyContent="center">
              <CenteredImage height={avatarHeight[5]} width={images.auto} src={SkeletonHand} />
            </AlignColumn>
          </PlayerBox>
          <PlayerBox divisors={6}>
            <AlignColumn justifyContent="center">
              <CenteredImage height={avatarHeight[5]} width={images.auto} src={Hand} />
            </AlignColumn>
          </PlayerBox>
        </Sidebar>
      </BaseRow>
      <br />
      <Sidebar hover enabled>
        {"sidebar hover"}
      </Sidebar>
      <br />
      <Sidebar active>{"sidebar active"}</Sidebar>
      <br />
      <br />
      <h1>hud player</h1>
      <br />
      <HUDPlayerBox>
        <AlignColumn justifyContent="center">
          <CenteredImage height={layoutHeight.md} width={images.auto} src={SausageHand} />
        </AlignColumn>
      </HUDPlayerBox>
      <br />
      <br />
      <HUDBlock>{"hud"}</HUDBlock>
      <br />
      <HUDBlock hover enabled>
        {"hud hover"}
      </HUDBlock>
      <br />
      <HUDBlock active>{"hud active"}</HUDBlock>
      <br />
      <PlayerInformationBlock>{"hud power up and dice container"}</PlayerInformationBlock>
      <br />
      <PlayerInformationBlock hover enabled>
        {"hud power up and dice container hover"}
      </PlayerInformationBlock>
      <br />
      <PlayerInformationBlock active>{"hud power up and dice container active"}</PlayerInformationBlock>
      <br />
      <PlayerBox>{"hud player"}</PlayerBox>
      <br />
      <PlayerBox hover enabled>
        {"hud player hover"}
      </PlayerBox>
      <br />
      <PlayerBox active>{"hud player active"}</PlayerBox>
      <br />
      <h1>chat and history elements</h1>
      <br />
      <PlayerMenuBox>{"chat / history header"}</PlayerMenuBox>
      <br />
      <PlayerMenuBlock>{"chat / history when both are open"}</PlayerMenuBlock>
      <br />
      <PlayerMenuBlock open>{"chat / history when one is open"}</PlayerMenuBlock>
      <br />
      <h1>landing info</h1>
      <br />
      <BackgroundRow>
        <FluidImage width={images.thumbnail} minWidth={images.thumbnail} src={CallBoloney} />
        <HalfColumn alignSelf="center">
          <Heading3>{"Best bluffer wins"}</Heading3>
          <GeneralText>
            {
              "Boloney! is a game of dice and bluffing. To win, bluff the best about the total value of dice on the table to outsmart your opponents."
            }
          </GeneralText>
        </HalfColumn>
      </BackgroundRow>
      <br />
      <br />
      <h1>social images</h1>
      <br />
      <br />
      <BaseRow gap={spacing.md}>
        <MediaImage width={images.auto} mediaSize={lineHeights.heading2} src={DiscordLogo} />
        <MediaImage width={images.auto} mediaSize={lineHeights.heading2} src={GithubLogo} />
      </BaseRow>
      <br />
      <br />
      <h1>match layout image</h1>
      <br />
      <h2>only look at the image in the center, i.e the 3 dice on a balancing beam</h2>
      <br />
      <Layout>
        <TopNavigation location="match" />
        <MatchPlayersOverview playerOrder={fakePlayers} />
        <BottomHud />
        <PlayerMenu />
        <MainContentContainer isInMatch isStageWithHUD>
          <FluidImage src={CallExact} height={images.auto} width={images.picture} />
        </MainContentContainer>
      </Layout>
      <br />
      <br />
      <h1>row</h1>
      <br />
      <BaseRow gap={spacing.md}>
        <div style={{ background: "white", width: images.fluid }}>
          <BaseInput placeholder="hello" />
        </div>
        <div style={{ background: "white", width: images.fluid }}>
          <BaseInput placeholder="goodbye" />
        </div>
      </BaseRow>
      <br />
      <br />
      <br />
      <h1>Tertiary buttons</h1>
      <br />
      <br />
      button with hover
      <br />
      <br />
      <TertiaryButtonBase>tertiary buttons</TertiaryButtonBase>
      <br />
      <br />
      button with icon right
      <br />
      <br />
      <TertiaryButton text="tertiary button" icon={<BaseIcon src={<RightArrowIconSVG />} />} />
      <br />
      <br />
      button with icon left
      <br />
      <br />
      <TertiaryButton text="tertiary button" icon={<BaseIcon src={<LeftArrowIconSVG />} />} iconPosition="row-reverse" />
      <br />
      <br />
      disabled
      <br />
      <br />
      <TertiaryButtonBase disabled>tertiary buttons</TertiaryButtonBase>
      <br />
      <br />
      button with icon left disabled
      <br />
      <br />
      <TertiaryButton text="tertiary button" icon={<BaseIcon src={<LeftArrowIconSVG />} />} iconPosition="row-reverse" disabled />
      <br />
      <br />
      <TertiaryButton text="match settings" icon={<BaseIcon src={<SettingsIconSVG />} />} padding={buttonSize.sm} />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <h1>Secondary buttons</h1>
      <br />
      <br />
      button with hover
      <br />
      <br />
      <SecondaryButtonBase>secondary buttons</SecondaryButtonBase>
      <br />
      <br />
      button with icon right
      <br />
      <br />
      <SecondaryButton text="secondary button" icon={<BaseIcon src={<RightArrowIconSVG />} />} />
      <br />
      <br />
      button with icon left
      <br />
      <br />
      <SecondaryButton text="secondary button" icon={<BaseIcon src={<LeftArrowIconSVG />} />} iconPosition="row-reverse" />
      <br />
      <br />
      disabled
      <br />
      <br />
      <SecondaryButtonBase disabled>secondary buttons</SecondaryButtonBase>
      <br />
      <br />
      button with icon left disabled
      <br />
      <br />
      <SecondaryButton text="secondary button" icon={<BaseIcon src={<LeftArrowIconSVG />} />} iconPosition="row-reverse" disabled />
      <br />
      <br />
      <br />
      <br />
      <br />
      <h1>Primary buttons</h1>
      <br />
      <br />
      button with hover
      <br />
      <br />
      <PrimaryButton primaryText="Primary buttons" secondaryText="hover button" />
      <br />
      <br />
      <br />
      disabled
      <br />
      <br />
      <PrimaryButton primaryText="Primary buttons" secondaryText="hover button" disabled />
      <br />
      <br />
      loading
      <br />
      <br />
      <PrimaryButton primaryText="Primary buttons" secondaryText="hover button" loading />
      <br />
      <br />
      <PickAction />
      <br />
      <br />
      <br />
      <h1>Note the first two inputs have no left and right border that is fine</h1>
      the default state is a medium grey border and focused (typing) black border. On hover there is a white background
      <br />
      <br />
      <br />
      <InputLegend label="default and typing">
        <BaseInput type="text" placeholder="default" />
      </InputLegend>
      <br />
      <br />
      <InputLegend label="error" isError>
        <BaseInput type="text" placeholder="error" />
      </InputLegend>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <InputLegend label="disabled" disabled>
        <BaseInput type="text" placeholder="disabled" disabled />
      </InputLegend>
      <br />
      <br />
      <h1>Note the first two inputs have no left and right border that is fine</h1>
      the default state is a medium grey border and focused black border. On hover there is a white background
      <br />
      <br />
      <br />
      <InputLegend label="default">
        <BaseSelect>
          {range(MIN_DRAW_ROUND_OFFSET, MAX_DRAW_ROUND_OFFSET).map((n) => (
            <BaseOption key={n} value={n}>
              {n}
            </BaseOption>
          ))}
        </BaseSelect>
      </InputLegend>
      <br />
      <br />
      <InputLegend label="error" isError>
        <BaseSelect>
          {range(MIN_DRAW_ROUND_OFFSET, MAX_DRAW_ROUND_OFFSET).map((n) => (
            <BaseOption key={n} value={n}>
              {n}
            </BaseOption>
          ))}
        </BaseSelect>
      </InputLegend>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <InputLegend label="disabled" disabled>
        <BaseSelect disabled>
          {range(MIN_DRAW_ROUND_OFFSET, MAX_DRAW_ROUND_OFFSET).map((n) => (
            <BaseOption key={n} value={n}>
              {n}
            </BaseOption>
          ))}
        </BaseSelect>
      </InputLegend>
      <br />
      <br />
      percerntage input
      <PercentageInput />
      <br />
      <br />
      error
      <PercentageInput error />
      <br />
      <br />
      disabled
      <PercentageInput disabled />
      <br />
      <br />
      chat input
      <ChatInput />
      <br />
      <br />
      error
      <ChatInput error />
      <br />
      <br />
      disabled
      <ChatInput disabled />
      <br />
      <br />
      checkboxes with hover
      <br />
      <br />
      <CheckboxBox type="checkbox" />
      <br />
      <br />
      disabled
      <CheckboxBox disabled type="checkbox" />
      <br />
      <br />
      radio boxes with hover
      <br />
      <br />
      <RadioInput type="radio" />
      <br />
      <br />
      disabled
      <RadioInput disabled type="radio" />
      <br />
      <br />
      toggle
      <br />
      <br />
      <SwitchWrapper onClick={() => setChecked(!isChecked)}>
        <SwitchInput type="checkbox" checked={isChecked} />
        <Slider className="slider" />
      </SwitchWrapper>
      <br />
      <br />
      disabled
      <SwitchWrapper>
        <SwitchInput type="checkbox" />
        <Slider className="slider" disabled />
      </SwitchWrapper>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      Mobile Text
      <br />
      <br />
      <br />
      Info display
      <br />
      <br />
      <InfoDisplay>ho heading 0</InfoDisplay>
      <br />
      <br />
      <br />
      heading 1
      <br />
      <br />
      <Heading1>heading1</Heading1>
      <br />
      <br />
      <br />
      <br />
      heading 2A
      <br />
      <br />
      <Heading2>heading2</Heading2>
      <br />
      <br />
      <br />
      <br />
      heading 2B
      <br />
      <br />
      <Heading2 fontSize={fontSizes.heading2B} lineHeight={lineHeights.heading2B}>
        heading2
      </Heading2>
      <br />
      <br />
      <br />
      <br />
      heading 3
      <br />
      <br />
      <Heading3>heading3</Heading3>
      <br />
      <br />
      <br />
      heading 4
      <br />
      <br />
      <Heading4>heading4</Heading4>
      <br />
      <br />
      <br />
      heading 5
      <br />
      <br />
      <Heading5>heading5</Heading5>
      <br />
      <br />
      <br />
      heading 6
      <br />
      <br />
      <Heading6>heading6</Heading6>
      <br />
      <br />
      <br />
      Intro text
      <br />
      <br />
      <BodyText font={fonts.secondary}>intro text</BodyText>
    </div>
  );
};
