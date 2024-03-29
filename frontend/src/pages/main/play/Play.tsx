/* eslint-disable @typescript-eslint/no-floating-promises */
import { doc, getDoc } from 'firebase/firestore';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoFader from '../../../global/components/app/logo/LogoFader';
import { StaticButton } from '../../../global/components/lib/button/staticButton/Style';
import OfflineFetch from '../../../global/components/lib/fetch/offlineFetch/offlineFetch';
import type { IDropDownOption } from '../../../global/components/lib/form/dropDown/DropDownInput';
import { StyledForm } from '../../../global/components/lib/form/form/Style';
import InputCombination from '../../../global/components/lib/form/inputCombination/InputCombination';
import Loader from '../../../global/components/lib/loader/fullScreen/Loader';
import { FlexColumnWrapper } from '../../../global/components/lib/positionModifiers/flexColumnWrapper/FlexColumnWrapper';
import useThemeContext from '../../../global/context/theme/hooks/useThemeContext';
import useApiErrorContext from '../../../global/context/widget/apiError/hooks/useApiErrorContext';
import { firestore } from '../../../global/firebase/config/config';
import ArrayHelper from '../../../global/helpers/dataTypes/arrayHelper/ArrayHelper';
import MiscHelper from '../../../global/helpers/dataTypes/miscHelper/MiscHelper';
import useForm from '../../../global/hooks/useForm';
// import FirestoreDB from '../class/FirestoreDb';
import PlayFormClass from '../class/PlayForm';
// import RTDB from '../class/firebaseRTDB';
import { GameContext } from '../context/GameContext';

export default function Play(): JSX.Element {
   const { isDarkTheme } = useThemeContext();
   const { apiError } = useApiErrorContext();
   const { setLocalDbRoom, setLocalDbUser } = useContext(GameContext);
   const { form, errors, handleChange, initHandleSubmit } = useForm(
      PlayFormClass.form.initialState,
      PlayFormClass.form.initialErrors,
      PlayFormClass.form.validate,
   );
   // const { data: allRoomIds } = FirestoreDB.Game.getAllRoomIdsQuery();
   const navigation = useNavigate();

   // const setRoomData = FirestoreDB.Room.setRoomMutation({});
   // const addUserToRoom = FirestoreDB.Room.addUserToRoomMutation({});

   async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
      const { isFormValid } = initHandleSubmit(e);
      if (!isFormValid) return;
      if (form.joinOrHost === 'host') {
         // await handleHostGame();
         return;
      }
      // await handleJoinGame();
   }

   // async function handleJoinGame(): Promise<void> {
   //    const docRef = doc(firestore, FirestoreDB.Room.key.collection, `room-${form.roomId}`);
   //    const docSnap = await getDoc(docRef);
   //    if (!docSnap.exists()) {
   //       alert('Room does not exist!');
   //       return;
   //    }
   //    const roomData = docSnap.data() as FirestoreDB.Room.IRoom;
   //    const clientUserExistsInRoom = roomData.users.some((user) => user.userId === form.name);
   //    if (clientUserExistsInRoom) {
   //       alert('Be original, Ben');
   //       return;
   //    }
   //    const roomIsFull = roomData.users.length >= 10;
   //    if (roomIsFull) {
   //       alert('Room is full');
   //       return;
   //    }
   //    const user: FirestoreDB.Room.IUser = {
   //       userStatus: 'connected',
   //       statusUpdatedAt: new Date().toUTCString(),
   //       userId: form.name,
   //    };
   //    const userState: FirestoreDB.Room.IUserStates = {
   //       userId: form.name,
   //       totalScore: 0,
   //       roundScore: 0,
   //       clue: '',
   //       guess: '',
   //       votedFor: '',
   //    };
   //    await addUserToRoom.mutateAsync({
   //       roomId: form.roomId,
   //       userObjForUsers: user,
   //       userObjForUserState: userState,
   //       gameStateObj: roomData.gameState,
   //    });
   //    setLocalDbRoom(form.roomId);
   //    setLocalDbUser(form.name);
   //    RTDB.setUserStatus(form.name, form.roomId);
   //    navigation(roomData.gameStarted ? '/main/startedgame' : '/main/waitingroom');
   // }

   // async function handleHostGame(): Promise<void> {
   //    const generatedRoomId = FirestoreDB.Room.generateUniqueId(allRoomIds ?? ['']);
   //    const room: FirestoreDB.Room.IRoom = {
   //       gameStarted: false,
   //       roomId: generatedRoomId,
   //       users: [
   //          {
   //             userStatus: 'connected',
   //             statusUpdatedAt: new Date().toUTCString(),
   //             userId: form.name,
   //          },
   //       ],
   //       gameState: {
   //          activeTopic: form.topic,
   //          activeWord: '',
   //          currentRat: '',
   //          currentRound: 1,
   //          numberOfRoundsSet: 5,
   //          currentTurn: '',
   //          userStates: [
   //             {
   //                userId: form.name,
   //                totalScore: 0,
   //                roundScore: 0,
   //                clue: '',
   //                guess: '',
   //                votedFor: '',
   //             },
   //          ],
   //       },
   //    };
   //    await setRoomData.mutateAsync(room);
   //    setLocalDbRoom(generatedRoomId);
   //    setLocalDbUser(form.name);
   //    RTDB.setUserStatus(form.name, generatedRoomId);
   //    navigation('/main/waitingroom');
   // }

   // if (isLoading && !isPaused) return <Loader isDisplayed />;
   // if (isPaused) return <OfflineFetch />;
   // if (error) return <FetchError />;

   const showRoomIdField = form.joinOrHost === 'join';
   const showTopicField =  form.joinOrHost === 'host'; // TODO: change to show spotify login

   return (
      <FlexColumnWrapper justifyContent="center" alignItems="center" height="100%">
         <LogoFader />
         <StyledForm onSubmit={handleSubmit} apiError={apiError} padding={1}>
            {PlayFormClass.form.inputs
               .filter((input) => input.name !== 'roomId' || showRoomIdField)
               .filter((input) => input.name !== 'topic' || showTopicField)
               .map((input) => (
                  <InputCombination
                     key={input.id}
                     id={input.id}
                     placeholder={input.placeholder}
                     name={input.name}
                     isRequired={input.isRequired}
                     autoComplete={input.autoComplete}
                     handleChange={handleChange}
                     error={errors[input.name]}
                     type={input.type}
                     value={form[input.name]}
                  />
               ))}

            <StaticButton isDarkTheme={isDarkTheme}>Submit</StaticButton>
         </StyledForm>
      </FlexColumnWrapper>
   );
}
