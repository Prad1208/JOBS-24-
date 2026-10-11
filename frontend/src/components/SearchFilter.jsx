function SearchFilter({
    search,
    setSearch,
    status,
    setStatus,
    darkMode
}) {

    return (

        <div className="container mt-4">

            <div className="row g-3">

                <div className="col-md-6">

                    <input
                        type="text"
                        className={`form-control ${
                            darkMode
                                ? "bg-dark text-light border-light"
                                : ""
                        }`}
                        placeholder="🔍 Search Company or Role"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>

                <div className="col-md-6">

                    <select
                        className={`form-select ${
                            darkMode
                                ? "bg-dark text-light border-light"
                                : ""
                        }`}
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >

                        <option value="">
                            All Status
                        </option>

                        <option value="APPLIED">
                            APPLIED
                        </option>

                        <option value="OA">
                            OA
                        </option>

                        <option value="INTERVIEW">
                            INTERVIEW
                        </option>

                        <option value="HR">
                            HR
                        </option>

                        <option value="OFFER">
                            OFFER
                        </option>

                        <option value="REJECTED">
                            REJECTED
                        </option>

                    </select>

                </div>

            </div>

        </div>

    );
}

export default SearchFilter;