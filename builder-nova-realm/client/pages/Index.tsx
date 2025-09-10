import AIChat from "@/components/AIChat";
import BookingForm from "@/components/BookingForm";
import ResourceHub from "@/components/ResourceHub";
import PeerSupport from "@/components/PeerSupport";
import AdminAnalytics from "@/components/AdminAnalytics";
import Onboarding from "@/components/Onboarding";
import MoodTracker from "@/components/MoodTracker";
import ScreenTimeTree from "@/components/ScreenTimeTree";
import NudgeSystem from "@/components/NudgeSystem";
import NudgesCard from "@/components/NudgesCard";
import { ShieldCheck } from "lucide-react";

export default function Index() {
  return (
    <div className="space-y-12 md:space-y-16">
      <section className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-primary/10 via-accent/20 to-transparent p-6 md:p-10">
        <div className="max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background/70 px-3 py-1 text-xs text-primary shadow">
            <ShieldCheck className="h-3.5 w-3.5" /> MindSpace - free digital
            psychological support for campuses
          </div>
          <h1 className="bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-3xl font-extrabold leading-tight text-transparent md:text-5xl">
           MindSpace : Digital Psychological Intervention System
          </h1>
          <p className="mt-3 text-base text-muted-foreground md:text-lg">
            Early detection, confidential care, regional language resources,
            peer support, and anonymous analytics — tailored for colleges,
            including rural and semi-urban institutions.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#onboarding"
              className="rounded-full border px-5 py-2.5 text-sm font-medium"
            >
              Get Started
            </a>
            <a
              href="#ai"
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow"
            >
              Try AI First-Aid
            </a>
          </div>
        </div>
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
      </section>

      <Onboarding />
      <AIChat />
      <MoodTracker />
      <ScreenTimeTree />
      <BookingForm />
      <ResourceHub />
      <PeerSupport />
      <AdminAnalytics />
      <NudgesCard />
      <NudgeSystem />
    </div>
  );
}
