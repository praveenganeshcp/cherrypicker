import { AsyncData } from "../../commons/types";
import { CherrypickRequest } from "@cherrypicker/request-manager-fe";

export interface CherrypickRequestDashboardState
  extends AsyncData<CherrypickRequest[]> {}
