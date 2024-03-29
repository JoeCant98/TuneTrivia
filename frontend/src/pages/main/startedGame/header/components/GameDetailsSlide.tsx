import { useContext, useEffect, useState } from 'react';
import { GameDetailsContainer } from '../Style';
import { GameContext } from '../../../context/GameContext';
// import FirestoreDB from '../../../class/FirestoreDb';
import ArrayOfObjects from '../../../../../global/helpers/dataTypes/arrayOfObjects/arrayOfObjects';
import { FlexRowWrapper } from '../../../../../global/components/lib/positionModifiers/flexRowWrapper/Style';
import ConditionalRender from '../../../../../global/components/lib/renderModifiers/conditionalRender/ConditionalRender';
import { LogoText } from '../../../../../global/components/app/logo/LogoText';
import Color from '../../../../../global/css/colors';
import HTMLEntities from '../../../../../global/helpers/dataTypes/htmlEntities/HTMLEntities';
import Unicode from '../../../../../global/helpers/dataTypes/unicode/Unicode';

interface IGameHeaderDetails {
   label: string;
   value: string;
}

export default function GameDetailsSlide(): JSX.Element {
   const { localDbRoom, localDbUser } = useContext(GameContext);
   // const { data: roomData } = FirestoreDB.Room.getRoomQuery(localDbRoom);
   const [gameHeaderDetails, setGameHeaderDetails] = useState<IGameHeaderDetails[]>([]);

   // useEffect(() => {
   //    const newGameHeaderDetails: IGameHeaderDetails[] = [
   //       {
   //          label: 'Round',
   //          value: `${roomData?.gameState?.currentRound} / ${roomData?.gameState?.numberOfRoundsSet}`,
   //       },
   //       {
   //          label: 'Topic',
   //          value: roomData?.gameState?.activeTopic || 'No Topic',
   //       },
   //       {
   //          label: 'Word',
   //          value:
   //             roomData?.gameState?.currentRat === localDbUser
   //                ? 'YOU ARE THE RAT'
   //                : ArrayOfObjects.getObjWithKeyValuePair(
   //                     activeTopicWords,
   //                     'word',
   //                     roomData?.gameState?.activeWord || '',
   //                  )?.cellId,
   //       },
   //    ];
   //    setGameHeaderDetails(newGameHeaderDetails);
   // }, [
   //    roomData?.gameState?.currentRound,
   //    roomData?.gameState?.numberOfRoundsSet,
   //    roomData?.gameState?.activeTopic,
   //    roomData?.gameState?.currentRat,
   //    roomData?.gameState?.activeWord,
   //    activeTopicWords,
   //    localDbUser,
   // ]);

   return (
      <GameDetailsContainer>
         {gameHeaderDetails.map((detail, index) => (
            <FlexRowWrapper alignItems="center" key={index} padding="0em 0em 0em 0em">
               <ConditionalRender condition={!detail.value?.includes('')}>
                  <LogoText size={'1.25em'} color={Color.darkThm.accent}>
                     {detail.label}
                     {HTMLEntities.space} {Unicode.rightArrow()} {HTMLEntities.space}
                  </LogoText>
               </ConditionalRender>
               <LogoText
                  size={'1.25em'}
                  color={
                     detail.value?.includes('')
                        ? Color.darkThm.error
                        : Color.darkThm.accentAlt
                  }
               >
                  {detail.value}
               </LogoText>
            </FlexRowWrapper>
         ))}
      </GameDetailsContainer>
   );
}
