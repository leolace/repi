import { Button } from "@components";
import { Link, useSearchParams } from "react-router";
import { getActiveContentTab, tabs } from "./utils";

export function Content() {
  const [searchParams] = useSearchParams();
  const activeTab = getActiveContentTab(searchParams.get("tab"));

  return (
    <div>
      <nav className="flex gap-2">
        {Object.entries(tabs).map(([name, value]) => (
          <Link to={{ search: `tab=${name}` }} className="flex-1" key={name}>
            <Button
              style={activeTab === name ? "primary" : "tertiary"}
              className="w-full"
            >
              {value.label}
            </Button>
          </Link>
        ))}
      </nav>
      {tabs[activeTab].content}
    </div>
  );
}
