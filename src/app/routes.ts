import { createBrowserRouter } from "react-router";
import { LoginPage } from "./pages/LoginPage";
import { SignUpPage } from "./pages/SignUpPage";
import { JobsDashboardPage } from "./pages/JobsDashboardPage";
import { InvitationsOffersPage } from "./pages/InvitationsOffersPage";
import { ProfilePage } from "./pages/ProfilePage";
import { SavedJobsPage } from "./pages/SavedJobsPage";
import { JobDetailPage } from "./pages/JobDetailPage";
import { MessagesPage } from "./pages/MessagesPage";
import { BuyHeartsPage } from "./pages/BuyHeartsPage";
import { MembershipPlansPage } from "./pages/MembershipPlansPage";
import { ActiveContractsPage } from "./pages/ActiveContractsPage";
import { KOLCampaignDetailPage } from "./pages/KOLCampaignDetailPage";
import { ContractHistoryPage } from "./pages/ContractHistoryPage";
import { FinancialOverviewPage } from "./pages/FinancialOverviewPage";
import { EarningsPage } from "./pages/EarningsPage";
import { TransactionsPage } from "./pages/TransactionsPage";
import { BusinessDashboardPage } from "./pages/BusinessDashboardPage";
import { CampaignsListPage } from "./pages/CampaignsListPage";
import { CreateCampaignPage } from "./pages/CreateCampaignPage";
import { CampaignDetailPage } from "./pages/CampaignDetailPage";
import { KOLDiscoveryPage } from "./pages/KOLDiscoveryPage";
import { AnalyticsPage } from "./pages/AnalyticsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: BusinessDashboardPage,
  },
  {
    path: "/dashboard",
    Component: BusinessDashboardPage,
  },
  {
    path: "/campaigns",
    Component: CampaignsListPage,
  },
  {
    path: "/campaigns/new",
    Component: CreateCampaignPage,
  },
  {
    path: "/campaigns/:campaignId",
    Component: CampaignDetailPage,
  },
  {
    path: "/find-talents",
    Component: KOLDiscoveryPage,
  },
  {
    path: "/kols",
    Component: KOLDiscoveryPage,
  },
  {
    path: "/analytics",
    Component: AnalyticsPage,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/signup",
    Component: SignUpPage,
  },
  {
    path: "/jobs",
    Component: JobsDashboardPage,
  },
  {
    path: "/invitations-offers",
    Component: InvitationsOffersPage,
  },
  {
    path: "/jobs/:jobId",
    Component: JobDetailPage,
  },
  {
    path: "/saved-jobs",
    Component: SavedJobsPage,
  },
  {
    path: "/messages",
    Component: MessagesPage,
  },
  {
    path: "/deliver-work/active-contracts",
    Component: ActiveContractsPage,
  },
  {
    path: "/deliver-work/active-contracts/:contractId",
    Component: KOLCampaignDetailPage,
  },
  {
    path: "/deliver-work/contract-history",
    Component: ContractHistoryPage,
  },
  {
    path: "/manage-finances/financial-overview",
    Component: FinancialOverviewPage,
  },
  {
    path: "/manage-finances/earnings",
    Component: EarningsPage,
  },
  {
    path: "/manage-finances/transactions",
    Component: TransactionsPage,
  },
  {
    path: "/buy-hearts",
    Component: BuyHeartsPage,
  },
  {
    path: "/membership-plans",
    Component: MembershipPlansPage,
  },
  {
    path: "/profile",
    Component: ProfilePage,
  },
  {
    path: "/my-profile",
    Component: ProfilePage,
  },
]);
