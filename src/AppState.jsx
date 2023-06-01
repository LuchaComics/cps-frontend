import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';


// Control whether the hamburer menu icon was clicked or not. This state is
// needed by 'TopNavigation' an 'SideNavigation' components.
export const onHamburgerClickedState = atom({
  key: 'onHamburgerClicked', // unique ID (with respect to other atoms/selectors)
  default: true, // default value (aka initial value)
});

// Control what message to display at the top as a banner in the app.
export const topAlertMessageState = atom({
  key: 'topBannerAlertMessage',
  default: "",
});

// Control what type of message to display at the top as a banner in the app.
export const topAlertStatusState = atom({
  key: 'topBannerAlertStatus',
  default: "success",
});
