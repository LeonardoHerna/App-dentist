import React from "react";

const SearchAndFilter = ({ search, setSearch, filter, setFilter, filters }) => (
  <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
    {/* Input de búsqueda */}
    <input
      type="text"
      className="w-full md:w-1/3 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
      placeholder="Buscar..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
    {/* Dropdown de filtros */}
    {filters && (
      <select
        className="w-full md:w-1/4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="">Todos</option>
        {filters.map((filterOption) => (
          <option key={filterOption.value} value={filterOption.value}>
            {filterOption.label}
          </option>
        ))}
      </select>
    )}
  </div>
);

export default SearchAndFilter;
