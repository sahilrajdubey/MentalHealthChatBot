
import Welcome from "./dashboard/welcome";


export const metadata = {
  title: "MindSpace",
  description: "Your Mental Health Companion",
  icons: {
    icon: "/public/icons/webbg.png",
  },
};

export default function Home() {
  return <Welcome />;
}