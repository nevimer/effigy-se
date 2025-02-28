import { BooleanLike } from 'common/react';
import { Box, Icon, Stack, Button, Section, NoticeBox, LabeledList, Collapsible } from '../components';
import { Window } from '../layouts';
import { useBackend } from '../backend';

enum VoteConfig {
  None = -1,
  Disabled = 0,
  Enabled = 1,
}

type Vote = {
  name: string;
  canBeInitiated: BooleanLike;
  config: VoteConfig;
  message: string;
};

type Option = {
  name: string;
  votes: number;
};

type ActiveVote = {
  vote: Vote;
  question: string | null;
  timeRemaining: number;
  choices: Option[];
  countMethod: number;
};

type UserData = {
  ckey: string;
  isLowerAdmin: BooleanLike;
  isUpperAdmin: BooleanLike;
  singleSelection: string | null;
  multiSelection: string[] | null;
  countMethod: VoteSystem;
};

enum VoteSystem {
  VOTE_SINGLE = 1,
  VOTE_MULTI = 2,
}

type Data = {
  currentVote: ActiveVote;
  possibleVotes: Vote[];
  user: UserData;
  voting: string[];
};

export const VotePanel = (props, context) => {
  const { data } = useBackend<Data>(context);
  const { currentVote, user } = data;

  /**
   * Adds the voting type to title if there is an ongoing vote.
   */
  let windowTitle = 'Vote';
  if (currentVote) {
    windowTitle +=
      ': ' +
      (currentVote.question || currentVote.vote.name).replace(/^\w/, (c) =>
        c.toUpperCase()
      );
  }

  return (
    <Window resizable title={windowTitle} width={400} height={500}>
      <Window.Content>
        <Stack fill vertical>
          <Section title="Create Vote">
            <VoteOptions />
            {!!user.isLowerAdmin && currentVote && <VotersList />}
          </Section>
          <ChoicesPanel />
          <TimePanel />
        </Stack>
      </Window.Content>
    </Window>
  );
};

/**
 * The create vote options menu. Only upper admins can disable voting.
 * @returns A section visible to everyone with vote options.
 */
const VoteOptions = (props, context) => {
  const { act, data } = useBackend<Data>(context);
  const { possibleVotes, user } = data;

  return (
    <Stack.Item>
      <Collapsible title="Start a Vote">
        <Stack vertical justify="space-between">
          {possibleVotes.map((option) => (
            <Stack.Item key={option.name}>
              {!!user.isLowerAdmin && option.config !== VoteConfig.None && (
                <Button.Checkbox
                  mr={option.config === VoteConfig.Disabled ? 1 : 1.6}
                  color="red"
                  checked={option.config === VoteConfig.Enabled}
                  disabled={!user.isUpperAdmin}
                  content={
                    option.config === VoteConfig.Enabled
                      ? 'Enabled'
                      : 'Disabled'
                  }
                  onClick={() =>
                    act('toggleVote', {
                      voteName: option.name,
                    })
                  }
                />
              )}
              <Button
                disabled={!option.canBeInitiated}
                tooltip={option.message}
                content={option.name}
                onClick={() =>
                  act('callVote', {
                    voteName: option.name,
                  })
                }
              />
            </Stack.Item>
          ))}
        </Stack>
      </Collapsible>
    </Stack.Item>
  );
};

/**
 * View Voters by ckey. Admin only.
 * @returns A collapsible list of voters
 */
const VotersList = (props, context) => {
  const { data } = useBackend<Data>(context);

  return (
    <Stack.Item>
      <Collapsible
        title={`View Voters${
          data.voting.length ? `: ${data.voting.length}` : ''
        }`}>
        <Section height={8} fill scrollable>
          {data.voting.map((voter) => {
            return <Box key={voter}>{voter}</Box>;
          })}
        </Section>
      </Collapsible>
    </Stack.Item>
  );
};

/**
 * The choices panel which displays all options in the list.
 * @returns A section visible to all users.
 */
const ChoicesPanel = (props, context) => {
  const { act, data } = useBackend<Data>(context);
  const { currentVote, user } = data;

  return (
    <Stack.Item grow>
      <Section fill scrollable title="Active Vote">
        {currentVote && currentVote.countMethod === VoteSystem.VOTE_SINGLE ? (
          <NoticeBox success>Select one option</NoticeBox>
        ) : null}
        {currentVote &&
        currentVote.choices.length !== 0 &&
        currentVote.countMethod === VoteSystem.VOTE_SINGLE ? (
          <LabeledList>
            {currentVote.choices.map((choice) => (
              <Box key={choice.name}>
                <LabeledList.Item
                  label={choice.name.replace(/^\w/, (c) => c.toUpperCase())}
                  textAlign="right"
                  buttons={
                    <Button
                      disabled={user.singleSelection === choice.name}
                      onClick={() => {
                        act('voteSingle', { voteOption: choice.name });
                      }}>
                      Vote
                    </Button>
                  }>
                  {user.singleSelection &&
                    choice.name === user.singleSelection && (
                      <Icon
                        alignSelf="right"
                        mr={2}
                        color="green"
                        name="vote-yea"
                      />
                    )}
                  {
                    user.isLowerAdmin
                      ? `${choice.votes} Votes`
                      : '' /* EFFIGY EDIT CHANGE */
                  }
                </LabeledList.Item>
                <LabeledList.Divider />
              </Box>
            ))}
          </LabeledList>
        ) : null}
        {currentVote && currentVote.countMethod === VoteSystem.VOTE_MULTI ? (
          <NoticeBox success>Select any number of options</NoticeBox>
        ) : null}
        {currentVote &&
        currentVote.choices.length !== 0 &&
        currentVote.countMethod === VoteSystem.VOTE_MULTI ? (
          <LabeledList>
            {currentVote.choices.map((choice) => (
              <Box key={choice.name}>
                <LabeledList.Item
                  label={choice.name.replace(/^\w/, (c) => c.toUpperCase())}
                  textAlign="right"
                  buttons={
                    <Button
                      onClick={() => {
                        act('voteMulti', { voteOption: choice.name });
                      }}>
                      Vote
                    </Button>
                  }>
                  {user.multiSelection &&
                  user.multiSelection[user.ckey.concat(choice.name)] === 1 ? (
                    <Icon
                      alignSelf="right"
                      mr={2}
                      color="blue"
                      name="vote-yea"
                    />
                  ) : null}
                  {
                    user.isLowerAdmin
                      ? `${choice.votes} Votes`
                      : '' /* EFFIGY EDIT CHANGE */
                  }
                </LabeledList.Item>
                <LabeledList.Divider />
              </Box>
            ))}
          </LabeledList>
        ) : null}
        {currentVote ? null : <NoticeBox>No vote active!</NoticeBox>}
      </Section>
    </Stack.Item>
  );
};

/**
 * Countdown timer at the bottom. Includes a cancel vote option for admins.
 * @returns A section visible to everyone.
 */
const TimePanel = (props, context) => {
  const { act, data } = useBackend<Data>(context);
  const { currentVote, user } = data;

  return (
    <Stack.Item mt={1}>
      <Section>
        <Stack justify="space-between">
          <Box fontSize={1.5}>
            Time Remaining:&nbsp;
            {currentVote?.timeRemaining || 0}s
          </Box>
          {!!user.isLowerAdmin && (
            <Button
              color="red"
              disabled={!user.isLowerAdmin || !currentVote}
              onClick={() => act('cancel')}>
              Cancel Vote
            </Button>
          )}
        </Stack>
      </Section>
    </Stack.Item>
  );
};
