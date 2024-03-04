import { Help } from '@styled-icons/ionicons-outline/Help';
import { Musicbrainz } from '@styled-icons/simple-icons/Musicbrainz';

export namespace NavItems {
   export type IFooterNames = 'play' | 'guide';
   interface IFooter {
      name: IFooterNames;
      icon: JSX.Element;
   }

   export const footer: IFooter[] = [
      {
         name: 'play',
         icon: <Musicbrainz />,
      },
      {
         name: 'guide',
         icon: <Help />,
      },
   ];

   export const sidebar = [...NavItems.footer];
}

export default NavItems;
