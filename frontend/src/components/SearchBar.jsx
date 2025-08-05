import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

const SearchBar = ({ handleSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(query);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full items-center focus-within:border-primary
        focus-within:ring-1 focus-within:ring-primary focus-within:rounded-lg"
    >
      <Input
        placeholder="Search Accounts..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full rounded-tr-none rounded-br-none border-primary"
      />
      <Button
        type="submit"
        className="rounded-tl-none rounded-bl-none cursor-pointer"
      >
        <Search />
      </Button>
    </form>
  );
};

export default SearchBar;
