import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import ClaimKit from "./pages/ClaimKit";
import MemberGuide from "./pages/MemberGuide";
import ToolGuides from "./pages/ToolGuides";

function Router() {
  return <Switch><Route path="/" component={Home}/><Route path="/tool-guides" component={ToolGuides}/><Route path="/claim-kit" component={ClaimKit}/><Route path="/member-guide" component={MemberGuide}/><Route path="/404" component={NotFound}/><Route component={NotFound}/></Switch>;
}
function App() { return <ErrorBoundary><ThemeProvider defaultTheme="light"><TooltipProvider><Toaster/><Router/></TooltipProvider></ThemeProvider></ErrorBoundary>; }
export default App;
