import { useContext, useEffect } from 'react';
import ArrayOfObjects from '../../../global/helpers/dataTypes/arrayOfObjects/arrayOfObjects';
import MiscHelper from '../../../global/helpers/dataTypes/miscHelper/MiscHelper';
// import FirestoreDB from '../class/FirestoreDb';
import { GameContext } from '../context/GameContext';
import GameHeader from './header/GameHeader';
import {
   GameHeaderWrapper,
   GamePageWrapper,
   GameplayWrapper,
   TopicBoardWrapper,
} from './style/Style';
import Gameplay from './gameplay/Gameplay';

export default function StartedGame(): JSX.Element {
   const { allUsers, localDbRoom, localDbUser } = useContext(GameContext);
   // const { data: roomData } = FirestoreDB.Room.getRoomQuery(localDbRoom);
   // const updateGameStateMutation = FirestoreDB.Room.updateGameStateMutation({});

   // useEffect(() => {
   //    if (MiscHelper.isNotFalsyOrEmpty(roomData)) {
   //       const { users } = roomData;
   //       const connectedUsers = ArrayOfObjects.filterOut(users, 'userStatus', 'disconnected');
   //       const connectedUser = connectedUsers[0];
   //       if (connectedUser?.userId !== localDbUser) return;
   //       if (!MiscHelper.isNotFalsyOrEmpty(allUsers)) return;
   //       const { currentRound } = roomData.gameState;
   //       const { randNewTopicKey, getActiveTopicWords } = FirestoreDB.Room;
   //       const isRoundOne = currentRound === 1;
   //       const updatedGameState: FirestoreDB.Room.IGameState = {
   //       };
   //       updateGameStateMutation.mutate({
   //          roomId: localDbRoom,
   //          gameState: updatedGameState,
   //       });
   //    }
   // }, [roomData?.gameState?.currentRound]);

   return (
      <GamePageWrapper>
         <GameHeaderWrapper>
            <GameHeader />
         </GameHeaderWrapper>
         <GameplayWrapper>
            <Gameplay />
         </GameplayWrapper>
      </GamePageWrapper>
   );
}
