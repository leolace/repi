import { Button } from "@components";
import { Link, useSearchParams } from "react-router";
import {
  contentTabs,
  getActiveContentTab,
  tabsHeadersMap,
} from "./content.utils";

export function Content() {
  const [searchParams] = useSearchParams();
  const activeTab = getActiveContentTab(searchParams.get("tab"));

  return (
    <div>
      <nav className="flex gap-2">
        {Object.entries(tabsHeadersMap).map(([name, label]) => (
          <Link to={{ search: `tab=${name}` }} className="flex-1" key={name}>
            <Button style={activeTab === name ? "primary" : "tertiary"} className="w-full">
              {label}
            </Button>
          </Link>
        ))}
      </nav>
      {contentTabs[activeTab]}
    </div>
  );
}
