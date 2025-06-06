import React from "react";
import { Search } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@atoms/card";

interface SearcherProps {
  title: string;
  children: React.ReactNode;
}

const Searcher: React.FC<SearcherProps> = ({ title, children }) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="w-5 h-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  );
};

export default Searcher;
