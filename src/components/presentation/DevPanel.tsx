import styled from 'styled-components'
import * as Collapsible from '@radix-ui/react-collapsible'
import { Spacer } from '../common/Spacer'
import { Players, PlayerType } from './PresentationsControl'

type Props = {
  players: Players
  onBuzz: (teamId: string) => void
}

export function DevPanel({ players, onBuzz }: Props) {
  return (
    <DevPanelWrapper defaultOpen={true}>
      <Collapsible.Trigger asChild>
        <DevPanelButton>Dev</DevPanelButton>
      </Collapsible.Trigger>
      <PanelContent>
        {Object.values(players).map((x) => (
          <FakePlayer key={x.id} player={x} onBuzz={onBuzz}></FakePlayer>
        ))}
      </PanelContent>
    </DevPanelWrapper>
  )
}
const DevPanelWrapper = styled(Collapsible.Root)`
  position: absolute;
  bottom: 0px;
  left: 4px;
  right: 4px;
`
const DevPanelButton = styled.button`
  all: unset;
  border: 1px solid ${({ theme }) => theme.colors.gray6};
  border-radius: 4px 4px 0 0;
  border-bottom: 0;
  padding: 4px 8px;
  margin-bottom: -1px;
  background-color: white;
`
const PanelContent = styled(Collapsible.Content)`
  border: 1px solid ${({ theme }) => theme.colors.gray6};
  border-radius: 0 4px 0px 0px;
  border-bottom: 0;
  padding: 16px 16px;
  display: flex;
  background-color: white;

  > *:not(:last-child) {
    margin-right: 24px;
  }
`

function FakePlayer({
  player,
  onBuzz,
}: {
  player: PlayerType
  onBuzz: (teamId: string) => void
}) {
  return (
    <Wrapper>
      <span style={{ fontWeight: 'bold' }}>{player.name}</span>
      <Spacer size={8}></Spacer>
      <BuzzButton onClick={() => onBuzz(player.id)}>
        <span className="shadow"></span>
        <span className="edge"></span>
        <span className="front"></span>
      </BuzzButton>
      <Spacer size={8}></Spacer>
      <Options>
        <RedButton></RedButton>
        <BlueButton></BlueButton>
        <GreenButton></GreenButton>
        <YellowButton></YellowButton>
      </Options>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const BuzzButton = styled.button`
  position: relative;
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  outline-offset: 4px;
  transition: filter 250ms;
  width: 50px;
  height: 35px;

  .shadow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: hsl(0deg 0% 0% / 0.25);
    will-change: transform;
    transform: translateY(2px);
    transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
  }

  .edge {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: linear-gradient(
      to left,
      hsl(340deg 100% 16%) 0%,
      hsl(340deg 100% 32%) 8%,
      hsl(340deg 100% 32%) 92%,
      hsl(340deg 100% 16%) 100%
    );
  }

  .front {
    display: block;
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    font-size: 1.25rem;
    color: white;
    background: hsl(340deg 100% 47%);
    will-change: transform;
    transform: translateY(-4px);
    transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
  }

  &:hover {
    filter: brightness(110%);
  }
  &:hover .front {
    transform: translateY(-5px);
    transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
  }
  &:active .front {
    transform: translateY(-2px);
    transition: transform 34ms;
  }
  &:hover .shadow {
    transform: translateY(3px);
    transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
  }
  &:active .shadow {
    transform: translateY(1px);
    transition: transform 34ms;
  }
  &:focus:not(:focus-visible) {
    outline: none;
  }
`

const Options = styled.div`
  display: flex;

  > *:not(:last-child) {
    margin-right: 8px;
  }
`

const OptionButton = styled.button`
  all: unset;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    filter: brightness(110%);
  }
`

const RedButton = styled(OptionButton)`
  background-color: red;
`

const BlueButton = styled(OptionButton)`
  background-color: lightskyblue;
`

const GreenButton = styled(OptionButton)`
  background-color: green;
`

const YellowButton = styled(OptionButton)`
  background-color: orange;
`
