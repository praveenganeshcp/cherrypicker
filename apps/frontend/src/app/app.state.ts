import { UserProfileState } from "./modules/auth/store/state";
import { CherrypickRequestDashboardState } from "./modules/request-manager/store/state";

export interface AppState {
    userProfile: UserProfileState;
    dashboard: CherrypickRequestDashboardState
}